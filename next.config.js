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
            }
        ]
    }
}

module.exports = nextConfig
