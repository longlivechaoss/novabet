import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bannerId = formData.get("bannerId") as string | null;

    if (!file || !bannerId) {
      return NextResponse.json({ error: "Arquivo ou ID inválido" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() ?? "webp";
    const fileName = `${bannerId}-${Date.now()}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("banners")
      .upload(fileName, buffer, { upsert: true, contentType: file.type || "image/webp" });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from("banners").getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    const { error: dbError } = await supabase
      .from("banners")
      .update({ url: publicUrl, updated_at: new Date().toISOString() })
      .eq("id", bannerId);

    if (dbError) throw dbError;

    return NextResponse.json({ url: publicUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao fazer upload" }, { status: 500 });
  }
}
