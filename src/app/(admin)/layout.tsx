import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Admin | Global Digital Prime',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
