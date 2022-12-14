const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const linguiConfig = require('./lingui.config.js')

const { locales, sourceLocale } = linguiConfig

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  webpack: (config) => {
    config.module.rules = [
      ...config.module.rules,
      {
        resourceQuery: /raw-lingui/,
        type: 'javascript/auto',
      },
    ]

    return config
  },
  experimental: { esmExternals: true },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: ['assets.sushi.com', 'res.cloudinary.com', 'raw.githubusercontent.com', 'logos.covalenthq.com'],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swap',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/gamefi',
        destination: '/gamefi',
      },
      {
        source: '/diceroll',
        destination: '/gamefi/diceroll',
      },
      {
        source: '/cointoss',
        destination: '/gamefi/cointoss',
      },
      {
        source: '/farmv1',
        destination: '/farmv1',
      },
      {
        source: '/farmv2',
        destination: '/farmv2',
      },
      {
        source: '/stake',
        destination: '/stake',
      },
      {
        source: '/boost',
        destination: '/boost',
      },
      {
        source: '/boostv2',
        destination: '/boostv2',
      },
      {
        source: '/zap',
        destination: '/exchange/zap',
      },
      {
        source: '/add/:token*',
        destination: '/exchange/add/:token*',
      },
      {
        source: '/remove/:token*',
        destination: '/exchange/remove/:token*',
      },
      {
        source: '/create/:token*',
        destination: '/exchange/add/:token*',
      },
      {
        source: '/swap',
        destination: '/exchange/swap',
      },
      {
        source: '/swap/:token*',
        destination: '/exchange/swap/:token*',
      },
      {
        source: '/migrate',
        destination: '/exchange/migrate',
      },
      {
        source: '/pool',
        destination: '/exchange/pool',
      },
      {
        source: '/find',
        destination: '/exchange/find',
      },
      {
        source: '/simulator',
        destination: '/yieldsimulator',
      },
      {
        source: '/prisale',
        destination: '/prisale',
      },
      {
        source: '/lottery',
        destination: '/lottery',
      },
    ]
  },
  i18n: {
    localeDetection: true,
    locales,
    defaultLocale: sourceLocale,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

module.exports = withBundleAnalyzer(withPWA(nextConfig))

// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
