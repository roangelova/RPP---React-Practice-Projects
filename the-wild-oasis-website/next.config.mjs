/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [new URL('https://zudlswpsdtjmtawbnnrr.supabase.co/storage/v1/object/public/cabin-images/**')],
      },
      //output: "export" --> as static assets we can export anywhere; wouldnt work with IMAGE
};

export default nextConfig;
