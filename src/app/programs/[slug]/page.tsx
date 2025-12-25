import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AppConfig } from '@/configs'
import { communityPrograms } from '@/constants/community'
import ProgramDetailContent from './_components/program-detail-content'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = communityPrograms.find((p) => p.slug === slug)

  if (!program) {
    return {
      title: 'Program Tidak Ditemukan',
    }
  }

  return {
    title: program.title,
    description: program.description,
    keywords: [
      program.title,
      program.category,
      'dicoding',
      'undipa',
      'program komunitas',
    ],
    openGraph: {
      title: `${program.title} - ${AppConfig.appName}`,
      description: program.description,
      url: `${AppConfig.siteUrl}/programs/${program.slug}`,
      siteName: AppConfig.appName,
      locale: 'id_ID',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return communityPrograms.map((program) => ({
    slug: program.slug,
  }))
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params
  const program = communityPrograms.find((p) => p.slug === slug)

  if (!program) {
    notFound()
  }

  return <ProgramDetailContent program={program} />
}
