const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "cdn.dummyjson.com"
            },
            {
                hostname: "images.unsplash.com"
            },
            {
                hostname: "source.unsplash.com"
            },
            {
                hostname: "cdn.sanity.io"
            },
            {
                hostname: "logos-world.net"
            },
            {
                hostname: "upload.wikimedia.org"
            },
        ]
    }
}

module.exports = nextConfig
