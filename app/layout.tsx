import './globals.css'
import localFont from 'next/font/local'
import { AuthProvider } from '@/lib/authContext'

const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
})

export const metadata = {
  title: 'SemanticMap',
  description: 'Analyze and visualize your focus group interviews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}