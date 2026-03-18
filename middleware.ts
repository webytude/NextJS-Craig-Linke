import { NextRequest, NextResponse } from 'next/server'

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

  const host = request.headers.get('host') || ''
  let pathname = url.pathname

  // 1. Remove trailing slash
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
  }

  // 2. Apply redirects
  let finalPath = pathname

  if (redirects[pathname]) {
    finalPath = redirects[pathname]
  } else if (pathname.startsWith('/location/')) {
    finalPath = '/projects'
  } else if (pathname.startsWith('/project-type/')) {
    finalPath = '/projects'
  } else if (pathname.startsWith('/project-award/')) {
    finalPath = '/about'
  }

  // 3. Normalize host (www → non-www)
  let finalHost = host
  if (host.startsWith('www.')) {
    finalHost = host.replace('www.', '')
  }

  // 4. Apply changes to URL
  url.pathname = finalPath
  url.host = finalHost

  // 5. Only ONE redirect
  if (
    finalPath !== request.nextUrl.pathname ||
    finalHost !== host
  ) {
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}