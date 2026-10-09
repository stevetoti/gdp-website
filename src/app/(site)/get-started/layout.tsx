import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/get-started',
  title: 'Start a Project | Global Digital Prime',
  description: 'Tell us about your AI assistant, website, app or software project and get a reply from Global Digital Prime.',
})

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children
}
