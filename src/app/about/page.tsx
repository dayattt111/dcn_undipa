import type { Metadata } from 'next'
import { AppConfig } from '@/configs'
import AboutPageContent from './_components/about-page-content'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Dicoding Community Network UNDIPA adalah komunitas developer dan tech enthusiast yang berfokus pada pembelajaran, kolaborasi, dan pengembangan skill digital.',
  keywords: [
    'tentang dicoding undipa',
    'komunitas developer undipa',
    'tech community undipa',
    'belajar coding undipa',
    'dicoding community network',
  ],
  openGraph: {
    title: `Tentang Kami | ${AppConfig.appName}`,
    description:
      'Dicoding Community Network UNDIPA adalah komunitas developer dan tech enthusiast yang berfokus pada pembelajaran, kolaborasi, dan pengembangan skill digital.',
    url: `${AppConfig.siteUrl}/about`,
    siteName: AppConfig.appName,
    locale: 'id_ID',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
