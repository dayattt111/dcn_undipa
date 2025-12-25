/**
 * Career/Job Posting Types
 */

export interface IJobPosting {
  id: number
  title: string
  slug: string
  company: string
  companyLogo?: string
  location: string
  workType: 'remote' | 'onsite' | 'hybrid'
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship'
  description: string
  requirements: string[]
  responsibilities: string[]
  salaryRange?: string
  benefits?: string[]
  skills: string[]
  experience?: string
  postedDate: string
  deadlineDate?: string
  applyUrl?: string
  contactEmail?: string
  status: 'active' | 'closed'
  featured?: boolean
}

export type WorkTypeFilter = 'all' | IJobPosting['workType']
export type EmploymentTypeFilter = 'all' | IJobPosting['employmentType']
