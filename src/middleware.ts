import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log('token: ', req.nextauth.token);

    if (!req.nextauth.token?.user.role) {
      return NextResponse.redirect(
        new URL("/api/auth/error?error=AccessDenied", req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/", "/commandes", "/plats", "/menu", "/tables", "/utilisateurs"],
};
