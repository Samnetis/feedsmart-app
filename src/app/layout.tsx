import { Inter } from 'next/font/google'
import './globals.css'

// Use Inter font instead of Geist to avoid the error
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'FeedSmart',
  description: 'Premium Insights for Optimal Livestock Nutrition towards Methane Reduction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}