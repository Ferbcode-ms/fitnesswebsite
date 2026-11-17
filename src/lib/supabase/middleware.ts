
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // Fast exit: Public pages don't require session verification
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isConfigured = Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("placeholder-project") &&
    !supabaseUrl.includes("your-project-id")
  );

  if (!isConfigured) {
    return response;
  }

  // Fast path: if unauthenticated user has no auth cookie and is accessing admin, redirect immediately
  const cookiesList = request.cookies.getAll();
  const hasAuthToken = cookiesList.some(
    (c) => c.name.startsWith("sb-") && c.name.includes("-auth-token")
  );

  if (!hasAuthToken) {
    if (isAdminRoute && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(url);
    }
    if (isLoginPage) {
      return response;
    }
  }

  const supabase = createServerClient(supabaseUrl!, supabaseAnonKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
    global: {
      fetch: (url, options = {}) => {
        return fetch(url, {
          ...options,
          signal: options?.signal || AbortSignal.timeout(3000),
        });
      },
    },
  });

  // IMPORTANT: Avoid using getSession() which isn't safe server-side. Use getUser() instead.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Route protection logic
  if (isAdminRoute) {
    if (!user && !isLoginPage) {
      // User is not authenticated; redirect to /admin/login
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(url);
    }

    if (user && isLoginPage) {
      // User is already authenticated; redirect to /admin dashboard
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
