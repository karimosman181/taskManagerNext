/** @type {import('next').NextConfig} */
const nextConfig = { 
    experimental: {
        serverComponentsExternalPackages: ['sequelize','@sequelize/core'],
    },
};

export default nextConfig;
