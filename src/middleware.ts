import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Only run middleware on /admin routes.
     * Public marketing, service, and appointment routes do not require session auth,
     * ensuring public page routing is instantaneous without external network bottlenecks.
     */
    "/admin/:path*",
  ],
};
