import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    experimental: {
        inlineCss: true,
        useTypeScriptCli: true,
        viewTransition: true,
    }
}

export default nextConfig
