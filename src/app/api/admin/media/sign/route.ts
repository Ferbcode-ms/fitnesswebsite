import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { generateUploadSignature, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { error: "Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured in environment variables." },
        { status: 503 }
      );
    }

    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = await request.json();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = body.folder || "fitness-cms";

    const paramsToSign = {
      timestamp,
      folder,
      ...(body.public_id ? { public_id: body.public_id } : {}),
    };

    const signatureData = generateUploadSignature(paramsToSign);

    return NextResponse.json({
      success: true,
      folder,
      ...signatureData,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to generate signature";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
