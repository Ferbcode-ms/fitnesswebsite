import { NextResponse } from "next/server";
import { getMediaAssets } from "@/lib/cms/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const assets = await getMediaAssets(search);
    return NextResponse.json({ assets });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch media assets";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
