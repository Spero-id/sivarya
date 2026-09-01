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
  const isLogoutOrAuthApi =
    pathname.startsWith("/api/auth") ||
    pathname === "/admin/logout" ||
    pathname === "/admin/logout/";

  if (isAdminRoute && !isLoginPage && !isRegisterPage && !isLogoutOrAuthApi && !context.locals.session) {
    return context.redirect("/admin/login");
  }

  if ((isLoginPage || isRegisterPage) && context.locals.session) {
    return context.redirect("/admin/dashboard");
  }

  return next();
});
