"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type BannerDB = {
  id: string;
  label: string;
  url: string;
  tipo: "principal" | "lateral" | "mobile";
  ordem: number;
};

type BannersData = {
  principal: BannerDB[];
  lateral: BannerDB[];
  mobile: BannerDB[];
  loading: boolean;
};

export function useBanners(): BannersData {
  const [principal, setPrincipal] = useState<BannerDB[]>([]);
  const [lateral, setLateral] = useState<BannerDB[]>([]);
  const [mobile, setMobile] = useState<BannerDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      const { data, error } = await supabase.from("banners").select("*").order("ordem");

      if (!error && data) {
        setPrincipal(data.filter((b) => b.tipo === "principal"));
        setLateral(data.filter((b) => b.tipo === "lateral"));
        setMobile(data.filter((b) => b.tipo === "mobile"));
      }
      setLoading(false);
    }

    fetchBanners();

    const channel = supabase
      .channel("banners-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "banners" },
        () => {
          fetchBanners();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { principal, lateral, mobile, loading };
}
