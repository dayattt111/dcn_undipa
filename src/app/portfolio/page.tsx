import type { Metadata } from 'next'
import { AppConfig } from '@/configs'
import PortfolioPageContent from './_components/portfolio-page-content'

export const metadata: Metadata = {
  title: 'Portfolio Projects',
  description:
    'Showcase project dan karya terbaik dari anggota Dicoding Community Network UNDIPA. Jelajahi berbagai aplikasi web, mobile, machine learning, dan cloud computing yang telah dikembangkan.',
  keywords: [
    'portfolio',
    'project showcase',
    'student projects',
    'bootcamp projects',
    'web development',
    'mobile apps',
    'machine learning',
    'cloud computing',
  ],
  openGraph: {
    title: `Portfolio Projects - ${AppConfig.appName}`,
    description:
      'Showcase project dan karya terbaik dari anggota DCN UNDIPA. Web, Mobile, ML, Cloud, dan lebih banyak lagi.',
    url: `${AppConfig.siteUrl}/portfolio`,
    siteName: AppConfig.appName,
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Portfolio Projects - ${AppConfig.appName}`,
    description:
      'Showcase project dan karya terbaik dari anggota DCN UNDIPA.',
  },
}

export default function PortfolioPage() {
  return <PortfolioPageContent />
}
