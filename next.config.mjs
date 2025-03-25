/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable Google Fonts optimization to prevent font loading errors
    optimizeFonts: false,
  
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
  }
  
  export default nextConfig
  
  