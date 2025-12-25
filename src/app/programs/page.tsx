import type { Metadata } from 'next'
import { AppConfig } from '@/configs'
import ProgramsPageContent from './_components/programs-page-content'

export const metadata: Metadata = {
  title: 'Program Komunitas',
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
    title: `Program Komunitas - ${AppConfig.appName}`,
    description:
      'Jelajahi berbagai program belajar, workshop, bootcamp, dan event yang disediakan oleh DCN UNDIPA untuk mengembangkan skill programming Anda.',
    url: `${AppConfig.siteUrl}/programs`,
    siteName: AppConfig.appName,
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Program Komunitas - ${AppConfig.appName}`,
    description:
      'Jelajahi berbagai program belajar, workshop, bootcamp, dan event yang disediakan oleh DCN UNDIPA.',
  },
}

export default function ProgramsPage() {
  return <ProgramsPageContent />
}
