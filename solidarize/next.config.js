// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['solidarizestorageacount.blob.core.windows.net'], // Domínio de onde suas imagens são servidas
    minimumCacheTTL: 240, // Tempo de vida do cache em segundos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'solidarizestorageacount.blob.core.windows.net',
        pathname: '/companyimages/**', // Caminho para suas imagens
      },
    ],
  },
  // ... outras configurações do Next.js
}

module.exports = nextConfig;
