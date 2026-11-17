import { NextResponse } from "next/server";
import { getClasses } from "@/lib/cms/queries";

export async function GET() {
  try {
    const classes = await getClasses(false);
    return NextResponse.json({ classes });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch classes";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
