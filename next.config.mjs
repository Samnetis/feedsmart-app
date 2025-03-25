/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add other configurations as needed
    images: {
      domains: ['localhost'],
    },
    
    // Disable ESLint during build
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    
    // Disable TypeScript type checking during build
    typescript: {
      // Warning: This allows production builds to successfully complete even if
      // your project has TypeScript errors.
      ignoreBuildErrors: true,
    },
  }
  
  export default nextConfig
  
  