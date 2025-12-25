import type { Metadata } from 'next'
import { AppConfig } from '@/configs'
import ServicesPageContent from './_components/services-page-content'

export const metadata: Metadata = {
  title: 'Program & Layanan',
  description:
    'Jelajahi berbagai program belajar, workshop, bootcamp, dan event yang disediakan oleh Dicoding Community Network UNDIPA untuk mengembangkan skill programming Anda.',
  keywords: [
    'program dicoding',
    'bootcamp undipa',
    'workshop programming',
    'study group developer',
    'event teknologi',
    'belajar coding',
  ],
  openGraph: {
    title: `Program & Layanan - ${AppConfig.appName}`,
    description:
      'Jelajahi berbagai program belajar, workshop, bootcamp, dan event yang disediakan oleh DCN UNDIPA untuk mengembangkan skill programming Anda.',
    url: `${AppConfig.baseUrl}/services`,
    siteName: AppConfig.appName,
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Program & Layanan - ${AppConfig.appName}`,
    description:
      'Jelajahi berbagai program belajar, workshop, bootcamp, dan event yang disediakan oleh DCN UNDIPA.',
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
