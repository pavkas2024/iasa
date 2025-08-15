// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const supportedLocales = ["uk", "en"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Якщо корінь без локалі — редирект на preferredLocale або uk за замовчуванням
  if (pathname === "/") {
    const preferredLocale = req.cookies.get("preferredLocale")?.value ?? "uk";
    if (supportedLocales.includes(preferredLocale)) {
      return NextResponse.redirect(new URL(`/${preferredLocale}`, req.url));
    } else {
      return NextResponse.redirect(new URL(`/uk`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
