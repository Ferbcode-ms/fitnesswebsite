import { NextResponse } from "next/server";
import { getServices } from "@/lib/cms/queries";

export async function GET() {
  try {
    const services = await getServices(false);
    return NextResponse.json({ services });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch services";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
