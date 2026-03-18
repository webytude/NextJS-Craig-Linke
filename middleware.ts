import { NextRequest, NextResponse } from 'next/server'

// Static redirect map
const redirects: Record<string, string> = {
  '/projects/toorak-gardens/fergusson': '/projects',
  '/projects/norwood/theresa': '/projects',
  '/projects/norwood/osmond-terrace': '/projects',
  '/projects/clarence-park/churchill': '/projects',
  '/projects/burnside/craig-donnas': '/projects',
  '/projects/adelaide-city/the-kiln': '/projects',
  '/projects/unley-park/weybridge-house': '/projects',
  '/projects/parkside/the-garden-pavilion': '/projects',
  '/projects/norwood/osmond-terrace-part-2': '/projects',
  '/projects/norwood/the-cottage': '/projects',
  '/projects/burnside/the-heritage-verandah': '/projects',
  '/projects/st-peters/st-peters': '/projects',
  '/projects/burnside/the-pool-pavilion': '/projects',
  '/projects/norwood/george': '/projects',
  '/projects/hyde-park/villa-kolam': '/projects',
  '/projects/forestville/teppanyaki-pavilion': '/projects',
  '/projects/magill/the-mccabes': '/projects',

  // keep slug pages
  '/projects/burnside/number-33': '/projects/number-33',
  '/projects/toorak-gardens/belltunga': '/projects/belltunga',
  '/projects/stonyfell/omh': '/projects/omh',
  '/projects/kent-town/home-base': '/projects/home-base',
  '/projects/north-adelaide/hill-house': '/projects/hill-house',
  '/projects/fleurieu-peninsula/beach-house': '/projects/beach-house',
  '/projects/medindie/le-jardin': '/projects/le-jardin',
  '/projects/kensington-gardens/kensington': '/projects/kensington',
  '/projects/unley/villa-1890': '/projects/villa-1890',

  '/about/meet-the-team': '/about',

  '/services/architecturally-designed-homes': '/services',
  '/services/custom-renovations-additions': '/services',
  '/services/outdoor-living': '/services',
  '/services/boutique-commercial': '/services',

  '/projects/our-process': '/our-process',
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  let pathname = url.pathname

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
  }

  // =============================
  // ✅ SINGLE STEP REDIRECT
  // =============================

  // 1. Exact redirects
  if (redirects[pathname]) {
    url.pathname = redirects[pathname]
    return NextResponse.redirect(url, 301)
  }

  // 2. Dynamic rules
  if (pathname.startsWith('/location/')) {
    url.pathname = '/projects'
    return NextResponse.redirect(url, 301)
  }

  if (pathname.startsWith('/project-type/')) {
    url.pathname = '/projects'
    return NextResponse.redirect(url, 301)
  }

  if (pathname.startsWith('/project-award/')) {
    url.pathname = '/about'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}