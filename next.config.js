const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // {
            //     hostname: "fakestoreapi.com"
            // },
            {
                hostname: "cdn.dummyjson.com"
            },
            {
                hostname: "cdn.sanity.io"
            }
        ]
    }
}

module.exports = nextConfig
