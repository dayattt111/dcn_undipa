/**
 * Community Constants
 * Static data for DCN UNDIPA community
 * TODO: Replace with API/database in the future
 */

import {
  ICommunityStats,
  IContributor,
  ICommunityProgram,
  ICommunityActivity,
  IMilestoneBadge,
} from '@/types/community'

// ========================================
// COMMUNITY STATS
// ========================================
export const communityStats: ICommunityStats = {
  totalMembers: 150,
  totalClassesCompleted: 520,
  totalEvents: 24,
  activeLearners: 85,
}

// ========================================
// MILESTONE BADGES
// ========================================
export const milestoneBadges: IMilestoneBadge[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    icon: '🌱',
    color: '#4CAF50',
    description: 'Menyelesaikan 1-5 kelas',
    requiredClasses: 1,
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    icon: '🚀',
    color: '#2196F3',
    description: 'Menyelesaikan 6-15 kelas',
    requiredClasses: 6,
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: '⭐',
    color: '#FF9800',
    description: 'Menyelesaikan 16-25 kelas',
    requiredClasses: 16,
  },
  {
    id: 'expert',
    name: 'Expert',
    icon: '👑',
    color: '#9C27B0',
    description: 'Menyelesaikan 25+ kelas',
    requiredClasses: 26,
  },
]

// ========================================
// FEATURED CONTRIBUTORS (TOP 5)
// ========================================
export const featuredContributors: IContributor[] = [
  {
    id: 1,
    name: 'Ahmad Rizki',
    role: 'Core Team',
    avatar: '/avatars/contributor-1.jpg',
    completedClasses: 28,
    badges: ['android', 'web', 'ml', 'cloud'],
    githubUrl: 'https://github.com/ahmadrizki',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    role: 'Mentor',
    avatar: '/avatars/contributor-2.jpg',
    completedClasses: 22,
    badges: ['web', 'react', 'frontend'],
    githubUrl: 'https://github.com/sitinur',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    role: 'Core Team',
    avatar: '/avatars/contributor-3.jpg',
    completedClasses: 20,
    badges: ['backend', 'cloud', 'devops'],
    githubUrl: 'https://github.com/budisantoso',
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    role: 'Mentor',
    avatar: '/avatars/contributor-4.jpg',
    completedClasses: 18,
    badges: ['ui-ux', 'frontend', 'web'],
    githubUrl: 'https://github.com/dewilestari',
  },
  {
    id: 5,
    name: 'Eko Prasetyo',
    role: 'Member',
    avatar: '/avatars/contributor-5.jpg',
    completedClasses: 15,
    badges: ['android', 'kotlin', 'mobile'],
    githubUrl: 'https://github.com/ekoprasetyo',
  },
]

// ========================================
// COMMUNITY PROGRAMS
// ========================================
export const communityPrograms: ICommunityProgram[] = [
  {
    id: 1,
    title: 'Bootcamp Full-Stack Web Development',
    slug: 'bootcamp-fullstack-web',
    description:
      'Program intensive belajar full-stack development dari fundamental hingga deployment dengan mentor berpengalaman.',
    image: '/icons/content-strategy.png',
    status: 'active',
    participants: 35,
    category: 'bootcamp',
    startDate: '2025-01-15',
    registrationDeadline: '2025-01-08', // 7 hari sebelum mulai
  },
  {
    id: 2,
    title: 'Study Group Android Development',
    slug: 'study-group-android',
    description:
      'Belajar bersama membuat aplikasi Android dengan Kotlin. Diskusi mingguan dan project kolaboratif.',
    image: '/icons/mobile-app.png',
    status: 'active',
    participants: 28,
    category: 'study-group',
    registrationDeadline: '2026-01-01', // Masih buka
  },
  {
    id: 3,
    title: 'Workshop Machine Learning',
    slug: 'workshop-machine-learning',
    description:
      'Workshop praktis machine learning dari data preprocessing hingga model deployment menggunakan TensorFlow.',
    image: '/icons/ai.png',
    status: 'upcoming',
    participants: 20,
    category: 'workshop',
    startDate: '2025-02-01',
    registrationDeadline: '2025-01-25', // 7 hari sebelum mulai
  },
  {
    id: 4,
    title: 'Event Dicoding DevFest 2025',
    slug: 'event-devfest-2025',
    description:
      'Acara tahunan developer festival dengan tech talk, workshop, dan networking session bersama expert.',
    image: '/icons/pantone.png',
    status: 'upcoming',
    category: 'event',
    startDate: '2025-03-20',
    registrationDeadline: '2025-03-13', // 7 hari sebelum mulai
  },
  {
    id: 5,
    title: 'Study Group Cloud Computing',
    slug: 'study-group-cloud',
    description:
      'Eksplorasi cloud computing dengan AWS, GCP, dan Azure. Hands-on labs dan certification preparation.',
    image: '/icons/conversation.png',
    status: 'active',
    participants: 22,
    category: 'study-group',
    registrationDeadline: '2026-02-01', // Masih buka
  },
  {
    id: 6,
    title: 'Hackathon Build For Good',
    slug: 'hackathon-build-for-good',
    description:
      'Kompetisi membangun solusi teknologi untuk masalah sosial. Berhadiah dan kesempatan inkubasi.',
    image: '/icons/shopping.png',
    status: 'upcoming',
    category: 'competition',
    startDate: '2025-04-10',
    registrationDeadline: '2025-04-03', // 7 hari sebelum mulai
  },
]

// ========================================
// RECENT ACTIVITIES (Latest 6)
// ========================================
export const recentActivities: ICommunityActivity[] = [
  {
    id: 1,
    title: 'Bootcamp Graduation Ceremony',
    description: 'Wisuda angkatan pertama bootcamp web development',
    image: '/images/activities/activity-1.jpg',
    date: '2024-12-15',
    category: 'bootcamp',
    participants: 30,
  },
  {
    id: 2,
    title: 'Study Group: Building REST API',
    description: 'Sesi belajar bersama membuat REST API dengan Node.js',
    image: '/images/activities/activity-2.jpg',
    date: '2024-12-10',
    category: 'study-group',
    participants: 25,
  },
  {
    id: 3,
    title: 'Workshop Git & GitHub',
    description: 'Workshop version control untuk pemula',
    image: '/images/activities/activity-3.jpg',
    date: '2024-12-05',
    category: 'workshop',
    participants: 40,
  },
  {
    id: 4,
    title: 'Tech Talk: AI in 2025',
    description: 'Sharing session tentang tren AI dan machine learning',
    image: '/images/activities/activity-4.jpg',
    date: '2024-11-28',
    category: 'event',
    participants: 60,
  },
  {
    id: 5,
    title: 'Community Meetup',
    description: 'Gathering rutin bulanan komunitas DCN UNDIPA',
    image: '/images/activities/activity-5.jpg',
    date: '2024-11-20',
    category: 'meetup',
    participants: 45,
  },
  {
    id: 6,
    title: 'Coding Challenge Session',
    description: 'Latihan problem solving dan algoritma bersama',
    image: '/images/activities/activity-6.jpg',
    date: '2024-11-15',
    category: 'study-group',
    participants: 20,
  },
]

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get badge for contributor based on completed classes
 */
export const getContributorBadge = (
  completedClasses: number
): IMilestoneBadge => {
  if (completedClasses >= 26) return milestoneBadges[3] // Expert
  if (completedClasses >= 16) return milestoneBadges[2] // Advanced
  if (completedClasses >= 6) return milestoneBadges[1] // Intermediate
  return milestoneBadges[0] // Beginner
}

/**
 * Get active programs only
 */
export const getActivePrograms = (): ICommunityProgram[] => {
  return communityPrograms.filter((program) => program.status === 'active')
}

/**
 * Get programs by category
 */
export const getProgramsByCategory = (
  category: ICommunityProgram['category']
): ICommunityProgram[] => {
  return communityPrograms.filter((program) => program.category === category)
}
