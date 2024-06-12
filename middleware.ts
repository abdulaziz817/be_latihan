import { NextResponse, type NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
 

export default withAuth (
  function middleware(request: any) {
    const url: string = request?.nextUrl?.pathname;
    let role = request?.nextauth?.token?.role;
    
    if(!role) {
      role = '11'
    }

    if(url.startsWith('/guru')) {
      if(role != 'guru') {
        return NextResponse.redirect(new URL('/guru', request.url));
      } else {
        return NextResponse.next();
      }
    }
  
    if(url.startsWith('/siswa')) {
      if(role != 'siswa') {
        return NextResponse.redirect(new URL('/siswa', request.url));
      } else {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log(token);
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: "/login",
      error: '/api/auth/error',
    },
  }
)

export const config = {
  matcher: ['/guru', '/guru/:path*', '/siswa', '/siswa/:path*']
}