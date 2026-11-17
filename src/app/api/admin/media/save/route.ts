import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const body = await request.json();
      const { public_id, secure_url, format, width, height, bytes, alt_text, folder } = body;

      const { data, error } = await supabase.from("media_assets").insert({
        public_id,
        secure_url,
        format,
        width,
        height,
        bytes,
        alt_text: alt_text || null,
        folder: folder || "fitness-cms",
      }).select().single();

      if (error) throw error;
      return NextResponse.json({ success: true, asset: data });
    }

    return NextResponse.json({ success: true, message: "Demo mode: asset logged" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save media metadata";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
