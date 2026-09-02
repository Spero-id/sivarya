import { auth } from "./lib/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isAuthed = await auth.api
    .getSession({
      headers: context.request.headers,
    })
    .catch(() => null);

  context.locals.user = isAuthed?.user ?? null;
  context.locals.session = isAuthed?.session ?? null;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";
  const isRegisterPage = pathname === "/admin/register" || pathname === "/admin/register/";
  const isForbiddenPage = pathname === "/admin/forbidden" || pathname === "/admin/forbidden/";
  const isLogoutOrAuthApi =
    pathname.startsWith("/api/auth") ||
    pathname === "/admin/logout" ||
    pathname === "/admin/logout/";

  const isAdminApi =
    pathname.startsWith("/api/portfolio") ||
    pathname.startsWith("/api/categories") ||
    pathname.startsWith("/api/users") ||
    pathname === "/api/upload" ||
    pathname === "/api/upload/";

  const isAdmin = context.locals.session && context.locals.user?.role === "admin";

  if (isLoginPage || isRegisterPage) {
    if (context.locals.session) {
      return context.redirect(isAdmin ? "/admin/dashboard" : "/admin/forbidden");
    }
    return next();
  }

  if (isAdminRoute && !isForbiddenPage && !isLogoutOrAuthApi && !isAdmin) {
    return context.redirect("/admin/forbidden");
  }

  if (isAdminApi && !isAdmin) {
    return json({ error: "Forbidden. Admin only." }, 403);
  }

  return next();
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
