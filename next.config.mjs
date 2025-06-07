/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'akcdn.detik.net.id',
      'cdn.cnbcindonesia.com',
      'static.republika.co.id',
      'blue.kumparan.com',
      'gdb.voanews.com',
      'www.voaindonesia.com',
      'asset.kompas.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
