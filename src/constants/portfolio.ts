/**
 * Portfolio Constants
 * Static data for community portfolio/projects
 * TODO: Replace with API/database in the future
 */

import { IPortfolioProject } from '@/types/portfolio'

// ========================================
// PORTFOLIO PROJECTS
// ========================================
export const portfolioProjects: IPortfolioProject[] = [
  {
    id: 1,
    title: 'E-Commerce Platform "BukaBarang"',
    slug: 'e-commerce-bukabarang',
    description:
      'Platform e-commerce modern dengan fitur keranjang belanja, payment gateway, dan admin dashboard. Dibangun sebagai final project bootcamp full-stack.',
    image: '/images/portfolio/project-1.jpg',
    category: 'web',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    creator: {
      name: 'Ahmad Rizki',
      role: 'Full-Stack Developer',
      avatar: '/avatars/contributor-1.jpg',
      github: 'https://github.com/ahmadrizki',
      linkedin: 'https://linkedin.com/in/ahmadrizki',
    },
    links: {
      github: 'https://github.com/ahmadrizki/bukabarang',
      demo: 'https://bukabarang.vercel.app',
    },
    tags: ['E-Commerce', 'Full-Stack', 'Payment Integration'],
    completedDate: '2024-12-10',
    programSource: 'Bootcamp Full-Stack Web Development',
  },
  {
    id: 2,
    title: 'FitTracker - Fitness & Nutrition App',
    slug: 'fittracker-app',
    description:
      'Aplikasi mobile untuk tracking olahraga dan nutrisi harian. Menggunakan ML Kit untuk deteksi pose exercise dan calorie tracking.',
    image: '/images/portfolio/project-2.jpg',
    category: 'mobile',
    techStack: ['Kotlin', 'Jetpack Compose', 'Room', 'Retrofit', 'ML Kit'],
    creator: {
      name: 'Eko Prasetyo',
      role: 'Android Developer',
      avatar: '/avatars/contributor-5.jpg',
      github: 'https://github.com/ekoprasetyo',
      instagram: 'https://instagram.com/eko.dev',
    },
    links: {
      github: 'https://github.com/ekoprasetyo/fittracker',
      youtube: 'https://youtube.com/watch?v=demo',
    },
    tags: ['Health', 'Fitness', 'Machine Learning'],
    completedDate: '2024-11-28',
    programSource: 'Study Group Android Development',
  },
  {
    id: 3,
    title: 'SentimentAI - Twitter Sentiment Analysis',
    slug: 'sentimentai',
    description:
      'Machine learning model untuk analisis sentiment tweet Indonesia. Menggunakan BERT model dengan accuracy 89%. Dashboard visualisasi dengan Streamlit.',
    image: '/images/portfolio/project-3.jpg',
    category: 'ml',
    techStack: ['Python', 'TensorFlow', 'BERT', 'Streamlit', 'Pandas'],
    creator: {
      name: 'Siti Nurhaliza',
      role: 'Data Scientist',
      avatar: '/avatars/contributor-2.jpg',
      github: 'https://github.com/sitinur',
      linkedin: 'https://linkedin.com/in/sitinurhaliza',
    },
    links: {
      github: 'https://github.com/sitinur/sentimentai',
      demo: 'https://sentimentai.streamlit.app',
    },
    tags: ['NLP', 'Sentiment Analysis', 'Deep Learning'],
    completedDate: '2024-12-05',
    programSource: 'Workshop Machine Learning',
  },
  {
    id: 4,
    title: 'CloudStorage - Serverless File Manager',
    slug: 'cloudstorage',
    description:
      'Aplikasi manajemen file berbasis cloud dengan fitur sharing, versioning, dan real-time collaboration. Deploy di AWS dengan serverless architecture.',
    image: '/images/portfolio/project-4.jpg',
    category: 'cloud',
    techStack: ['AWS Lambda', 'S3', 'DynamoDB', 'API Gateway', 'React'],
    creator: {
      name: 'Budi Santoso',
      role: 'Cloud Engineer',
      avatar: '/avatars/contributor-3.jpg',
      github: 'https://github.com/budisantoso',
      linkedin: 'https://linkedin.com/in/budisantoso',
    },
    links: {
      github: 'https://github.com/budisantoso/cloudstorage',
      demo: 'https://cloudstorage-demo.netlify.app',
    },
    tags: ['Serverless', 'AWS', 'Real-time'],
    completedDate: '2024-11-15',
    programSource: 'Study Group Cloud Computing',
  },
  {
    id: 5,
    title: 'EduQuiz - Interactive Learning Platform',
    slug: 'eduquiz',
    description:
      'Platform quiz interaktif untuk pembelajaran dengan gamification. Fitur leaderboard, achievement badges, dan real-time multiplayer quiz.',
    image: '/images/portfolio/project-5.jpg',
    category: 'web',
    techStack: ['Vue.js', 'Express.js', 'Socket.io', 'MongoDB', 'Redis'],
    creator: {
      name: 'Dewi Lestari',
      role: 'Frontend Developer',
      avatar: '/avatars/contributor-4.jpg',
      github: 'https://github.com/dewilestari',
      instagram: 'https://instagram.com/dewi.codes',
    },
    links: {
      github: 'https://github.com/dewilestari/eduquiz',
      demo: 'https://eduquiz.herokuapp.com',
      youtube: 'https://youtube.com/watch?v=eduquiz-demo',
    },
    tags: ['Education', 'Gamification', 'Real-time'],
    completedDate: '2024-12-01',
    programSource: 'Bootcamp Full-Stack Web Development',
  },
  {
    id: 6,
    title: 'RecipeAI - Smart Recipe Recommender',
    slug: 'recipeai',
    description:
      'Aplikasi rekomendasi resep masakan menggunakan computer vision untuk deteksi bahan makanan dan collaborative filtering untuk personalisasi.',
    image: '/images/portfolio/project-6.jpg',
    category: 'ml',
    techStack: ['Python', 'FastAPI', 'TensorFlow', 'OpenCV', 'Flutter'],
    creator: {
      name: 'Fajar Ramadhan',
      role: 'ML Engineer',
      avatar: '/avatars/contributor-6.jpg',
      github: 'https://github.com/fajarram',
    },
    links: {
      github: 'https://github.com/fajarram/recipeai',
    },
    tags: ['Computer Vision', 'Recommendation System', 'Mobile'],
    completedDate: '2024-11-20',
    programSource: 'Workshop Machine Learning',
  },
]

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Get projects by category
 */
export const getProjectsByCategory = (
  category: IPortfolioProject['category']
): IPortfolioProject[] => {
  return portfolioProjects.filter((project) => project.category === category)
}

/**
 * Get projects by tech stack
 */
export const getProjectsByTech = (tech: string): IPortfolioProject[] => {
  return portfolioProjects.filter((project) =>
    project.techStack.some((t) => t.toLowerCase().includes(tech.toLowerCase()))
  )
}

/**
 * Get featured projects (latest 3)
 */
export const getFeaturedProjects = (): IPortfolioProject[] => {
  return portfolioProjects
    .sort((a, b) => {
      const dateA = a.completedDate ? new Date(a.completedDate).getTime() : 0
      const dateB = b.completedDate ? new Date(b.completedDate).getTime() : 0
      return dateB - dateA
    })
    .slice(0, 3)
}
