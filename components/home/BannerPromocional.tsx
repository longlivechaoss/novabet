"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { bannerPromocional } from "@/data/jogos";

export default function BannerPromocional() {
  return (
    <motion.div
      className="my-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={bannerPromocional.link} className="block">
        <div
          className="relative w-full cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.01]"
          style={{ height: "160px" }}
        >
          <img
            src={bannerPromocional.imagem}
            alt={bannerPromocional.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-nova-blue/0 transition-colors duration-300 hover:bg-nova-blue/10" />
        </div>
      </Link>
    </motion.div>
  );
}
