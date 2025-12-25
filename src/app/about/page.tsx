import type { Metadata } from 'next'
import { AppConfig } from '@/configs'
import AboutPageContent from './_components/about-page-content'

export const metadata: Metadata = {
  title: 'Tentang Kami - Dicoding Community Network UNDIPA',
  description:
    'Dicoding Community Network UNDIPA adalah komunitas developer dan tech enthusiast di Universitas Pendidikan Indonesia yang berfokus pada pembelajaran, kolaborasi, dan pengembangan skill digital. Bergabunglah dengan 150+ anggota aktif untuk belajar dan berkembang bersama.',
  keywords: [
    'tentang dicoding undipa',
    'komunitas developer undipa',
    'tech community undipa',
    'belajar coding undipa',
    'dicoding community network',
    'komunitas programming undipa',
    'bootcamp coding undipa',
    'tech enthusiast indonesia',
    'developer community indonesia',
    'web development undipa',
    'mobile development undipa',
  ],
  authors: [{ name: 'Dicoding Community Network UNDIPA' }],
  openGraph: {
    title: `Tentang Kami - Dicoding Community Network UNDIPA`,
    description:
      'Komunitas developer dan tech enthusiast di UNDIPA dengan 150+ anggota aktif, 50+ program & event, dan 80+ project selesai. Bergabunglah untuk belajar, berkolaborasi, dan berkembang bersama.',
    url: `${AppConfig.siteUrl}/about`,
    siteName: AppConfig.appName,
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: `${AppConfig.siteUrl}/images/og-about.png`,
        width: 1200,
        height: 630,
        alt: 'Dicoding Community Network UNDIPA - Tentang Kami',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami - Dicoding Community Network UNDIPA',
    description:
      'Komunitas developer dan tech enthusiast di UNDIPA dengan 150+ anggota aktif. Bergabunglah untuk belajar dan berkembang bersama.',
  },
  alternates: {
    canonical: `${AppConfig.siteUrl}/about`,
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
