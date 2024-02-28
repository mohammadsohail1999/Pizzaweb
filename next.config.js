/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     port: '',
    //     pathname: '/',
    //   },
    // ],
    domains: [
      'images.unsplash.com',
      'img.freepik.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
