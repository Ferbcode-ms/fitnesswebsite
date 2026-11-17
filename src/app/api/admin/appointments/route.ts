import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ appointments: [] });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const db = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : supabase;
    let query = db.from("appointments").select("*").order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ appointments: data || [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch appointments";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
