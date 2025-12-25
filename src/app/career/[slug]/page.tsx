import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AppConfig } from '@/configs'
import { jobPostings } from '@/constants/career'
import JobDetailContent from './_components/job-detail-content'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = jobPostings.find((j) => j.slug === slug)

  if (!job) {
    return {
      title: 'Lowongan Tidak Ditemukan',
    }
  }

  return {
    title: `${job.title} - ${job.company}`,
    description: job.description,
    keywords: [job.title, job.company, job.location, ...job.skills],
    openGraph: {
      title: `${job.title} - ${job.company} | ${AppConfig.appName}`,
      description: job.description,
      url: `${AppConfig.siteUrl}/career/${job.slug}`,
      siteName: AppConfig.appName,
      locale: 'id_ID',
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  return jobPostings.map((job) => ({
    slug: job.slug,
  }))
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params
  const job = jobPostings.find((j) => j.slug === slug)

  if (!job) {
    notFound()
  }

  return <JobDetailContent job={job} />
}
