/**
 * Career/Job Postings Constants
 * Data lowongan pekerjaan untuk anggota komunitas
 * TODO: Replace with API/database in the future
 */

import { IJobPosting } from '@/types/career'

export const jobPostings: IJobPosting[] = [
  {
    id: 1,
    title: 'Full-Stack Developer',
    slug: 'full-stack-developer-startup-xyz',
    company: 'Startup XYZ',
    companyLogo: '/icons/content-strategy.png',
    location: 'Jakarta',
    workType: 'hybrid',
    employmentType: 'full-time',
    description:
      'Kami mencari Full-Stack Developer yang passionate untuk bergabung dengan tim kami dalam membangun aplikasi web modern. Kandidat ideal memiliki pengalaman dengan React, Node.js, dan PostgreSQL.',
    requirements: [
      'Minimal 2 tahun pengalaman sebagai Full-Stack Developer',
      'Menguasai React.js dan Next.js',
      'Menguasai Node.js dan Express.js',
      'Familiar dengan PostgreSQL atau MySQL',
      'Memahami RESTful API dan GraphQL',
      'Pengalaman dengan Git dan CI/CD',
    ],
    responsibilities: [
      'Mengembangkan fitur baru untuk aplikasi web',
      'Maintenance dan debugging aplikasi existing',
      'Kolaborasi dengan tim UI/UX dan Product',
      'Code review dan mentoring junior developer',
      'Dokumentasi teknis dan API',
    ],
    salaryRange: 'Rp 8.000.000 - Rp 15.000.000',
    benefits: [
      'Asuransi kesehatan',
      'Flexible working hours',
      'WFH 2 hari/minggu',
      'Learning budget',
      'Tunjangan makan',
    ],
    skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Git'],
    experience: '2-4 tahun',
    postedDate: '2025-12-20',
    deadlineDate: '2026-01-20',
    applyUrl: 'https://example.com/apply',
    contactEmail: 'hr@startupxyz.com',
    status: 'active',
    featured: true,
  },
  {
    id: 2,
    title: 'Frontend Developer (React)',
    slug: 'frontend-developer-react-tech-corp',
    company: 'Tech Corp Indonesia',
    companyLogo: '/icons/mobile-app.png',
    location: 'Bandung',
    workType: 'remote',
    employmentType: 'full-time',
    description:
      'Bergabunglah dengan tim frontend kami untuk membangun aplikasi web yang user-friendly dan responsive. Kami mencari developer yang passionate tentang UI/UX dan performance.',
    requirements: [
      'Minimal 1 tahun pengalaman React.js',
      'Menguasai HTML5, CSS3, JavaScript ES6+',
      'Familiar dengan state management (Redux/Zustand)',
      'Memahami responsive design dan mobile-first',
      'Portfolio aplikasi web yang sudah dibuat',
    ],
    responsibilities: [
      'Develop komponen React yang reusable',
      'Implementasi design dari UI/UX team',
      'Optimasi performance aplikasi',
      'Testing dan debugging',
      'Kolaborasi dengan backend team',
    ],
    salaryRange: 'Rp 6.000.000 - Rp 10.000.000',
    benefits: ['Remote work', 'Flexible hours', 'Health insurance', 'Annual bonus'],
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Tailwind', 'Git'],
    experience: '1-3 tahun',
    postedDate: '2025-12-18',
    deadlineDate: '2026-01-15',
    applyUrl: 'https://example.com/apply',
    contactEmail: 'recruitment@techcorp.id',
    status: 'active',
    featured: true,
  },
  {
    id: 3,
    title: 'Backend Developer (Node.js)',
    slug: 'backend-developer-nodejs-fintech',
    company: 'Fintech Solutions',
    companyLogo: '/icons/ai.png',
    location: 'Surabaya',
    workType: 'onsite',
    employmentType: 'full-time',
    description:
      'Kami sedang mengembangkan platform fintech dan membutuhkan Backend Developer yang handal dalam Node.js untuk membangun API yang scalable dan secure.',
    requirements: [
      'Minimal 2 tahun pengalaman Node.js',
      'Menguasai Express.js atau Fastify',
      'Database: PostgreSQL, MongoDB, Redis',
      'Memahami microservices architecture',
      'Pengalaman dengan message queue (RabbitMQ/Kafka)',
      'Familiar dengan Docker dan Kubernetes',
    ],
    responsibilities: [
      'Design dan develop RESTful API',
      'Database design dan optimization',
      'Implement authentication dan authorization',
      'Integration dengan third-party services',
      'Performance monitoring dan improvement',
    ],
    salaryRange: 'Rp 10.000.000 - Rp 18.000.000',
    benefits: [
      'Health insurance for family',
      'Annual bonus',
      'Performance bonus',
      'Career development program',
    ],
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker'],
    experience: '2-5 tahun',
    postedDate: '2025-12-15',
    deadlineDate: '2026-01-10',
    contactEmail: 'jobs@fintechsolutions.id',
    status: 'active',
  },
  {
    id: 4,
    title: 'Mobile Developer (React Native)',
    slug: 'mobile-developer-react-native-ecommerce',
    company: 'E-Commerce Nusantara',
    companyLogo: '/icons/mobile-app.png',
    location: 'Jakarta',
    workType: 'hybrid',
    employmentType: 'full-time',
    description:
      'Bantu kami mengembangkan aplikasi mobile e-commerce dengan jutaan pengguna. Kami mencari React Native Developer yang berpengalaman.',
    requirements: [
      'Minimal 2 tahun pengalaman React Native',
      'Pernah publish app di Play Store/App Store',
      'Menguasai JavaScript/TypeScript',
      'Familiar dengan native modules (iOS/Android)',
      'Pengalaman dengan Firebase atau backend integration',
    ],
    responsibilities: [
      'Develop dan maintain mobile app',
      'Implement new features',
      'Bug fixing dan optimization',
      'Code review',
      'Collaborate dengan product dan design team',
    ],
    salaryRange: 'Rp 9.000.000 - Rp 16.000.000',
    benefits: ['BPJS', 'Meal allowance', 'Transport allowance', 'Annual leave 12 days'],
    skills: ['React Native', 'JavaScript', 'TypeScript', 'Firebase', 'Redux'],
    experience: '2-4 tahun',
    postedDate: '2025-12-10',
    deadlineDate: '2026-01-05',
    applyUrl: 'https://example.com/apply',
    contactEmail: 'career@ecommerce.id',
    status: 'active',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    slug: 'devops-engineer-cloud-company',
    company: 'Cloud Solutions ID',
    companyLogo: '/icons/conversation.png',
    location: 'Remote',
    workType: 'remote',
    employmentType: 'full-time',
    description:
      'Join our DevOps team to build and maintain cloud infrastructure. We are looking for someone passionate about automation and CI/CD.',
    requirements: [
      'Minimal 2 tahun pengalaman DevOps',
      'Menguasai AWS atau GCP',
      'Familiar dengan Docker, Kubernetes',
      'Pengalaman dengan Terraform atau Ansible',
      'CI/CD: Jenkins, GitLab CI, atau GitHub Actions',
      'Scripting: Bash, Python',
    ],
    responsibilities: [
      'Manage cloud infrastructure (AWS/GCP)',
      'Build dan maintain CI/CD pipelines',
      'Monitoring dan logging',
      'Security dan compliance',
      'Automation dan scripting',
    ],
    salaryRange: 'Rp 12.000.000 - Rp 20.000.000',
    benefits: ['100% Remote', 'Flexible hours', 'Health insurance', 'Learning budget'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Python'],
    experience: '2-5 tahun',
    postedDate: '2025-12-08',
    deadlineDate: '2026-01-08',
    contactEmail: 'talent@cloudsolutions.id',
    status: 'active',
  },
  {
    id: 6,
    title: 'UI/UX Designer',
    slug: 'ui-ux-designer-creative-agency',
    company: 'Creative Digital Agency',
    companyLogo: '/icons/pantone.png',
    location: 'Yogyakarta',
    workType: 'hybrid',
    employmentType: 'full-time',
    description:
      'Kami mencari UI/UX Designer kreatif untuk membantu klien kami menciptakan digital experience yang amazing.',
    requirements: [
      'Minimal 1 tahun pengalaman UI/UX Design',
      'Menguasai Figma dan Adobe XD',
      'Memahami design thinking dan user research',
      'Portfolio design yang strong',
      'Familiar dengan prototyping',
    ],
    responsibilities: [
      'User research dan competitive analysis',
      'Create wireframes dan prototypes',
      'Design UI yang modern dan user-friendly',
      'Usability testing',
      'Kolaborasi dengan developer',
    ],
    salaryRange: 'Rp 5.000.000 - Rp 9.000.000',
    benefits: ['Health insurance', 'Creative workspace', 'Flexible hours'],
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping'],
    experience: '1-3 tahun',
    postedDate: '2025-12-05',
    deadlineDate: '2025-12-30',
    contactEmail: 'jobs@creativeagency.id',
    status: 'active',
  },
]

// Helper functions
export const getFeaturedJobs = (): IJobPosting[] => {
  return jobPostings.filter((job) => job.featured && job.status === 'active')
}

export const getActiveJobs = (): IJobPosting[] => {
  return jobPostings.filter((job) => job.status === 'active')
}

export const getJobsByWorkType = (workType: IJobPosting['workType']): IJobPosting[] => {
  return jobPostings.filter((job) => job.workType === workType && job.status === 'active')
}

export const getJobsByEmploymentType = (
  employmentType: IJobPosting['employmentType']
): IJobPosting[] => {
  return jobPostings.filter(
    (job) => job.employmentType === employmentType && job.status === 'active'
  )
}
