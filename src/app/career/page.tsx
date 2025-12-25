import type { Metadata } from 'next'
import { AppConfig } from '@/configs'
import CareerPageContent from './_components/career-page-content'

export const metadata: Metadata = {
  title: 'Lowongan Kerja',
  description:
    'Temukan lowongan pekerjaan terbaru di bidang teknologi untuk alumni dan anggota Dicoding Community Network UNDIPA. Full-time, part-time, remote, dan internship opportunities.',
  keywords: [
    'lowongan kerja',
    'job vacancy',
    'developer jobs',
    'programmer jobs',
    'tech jobs',
    'alumni undipa',
    'fresh graduate',
  ],
  openGraph: {
    title: `Lowongan Kerja - ${AppConfig.appName}`,
    description:
      'Temukan lowongan pekerjaan terbaru di bidang teknologi untuk alumni dan anggota DCN UNDIPA.',
    url: `${AppConfig.siteUrl}/career`,
    siteName: AppConfig.appName,
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Lowongan Kerja - ${AppConfig.appName}`,
    description:
      'Temukan lowongan pekerjaan terbaru di bidang teknologi untuk alumni dan anggota DCN UNDIPA.',
  },
}

export default function CareerPage() {
  return <CareerPageContent />
}
