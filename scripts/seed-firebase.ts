/**
 * Firebase Firestore Seeder
 * 
 * Jalankan dengan: bun run scripts/seed-firebase.ts
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, Timestamp } from 'firebase/firestore'

// Firebase config - ganti dengan config Anda
const firebaseConfig = {
  apiKey: "AIzaSyAfzYbDHtPTZF1F05tkpDxNn1ul0kScbg4",
  authDomain: "dcn-undipa.firebaseapp.com",
  projectId: "dcn-undipa",
  storageBucket: "dcn-undipa.firebasestorage.app",
  messagingSenderId: "528340041054",
  appId: "1:528340041054:web:1a3f094561060ac80123cf",
  measurementId: "G-6VDR9D0BHV"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// ===== DATA SEEDER =====

// 1. Community Stats
const communityStats = {
  totalMembers: 350,
  totalClassesCompleted: 1250,
  totalEvents: 45,
  activeLearners: 180,
  updatedAt: Timestamp.now(),
}

// 2. Services
const services = [
  {
    id: 1,
    title: 'Web Development',
    slug: 'web-development',
    description: 'Pembelajaran pengembangan web modern menggunakan framework terkini seperti React, Next.js, dan teknologi web terbaru.',
    image: '/icons/mobile-app.png',
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: 2,
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Strategi pemasaran digital untuk meningkatkan brand awareness dan engagement di platform media sosial.',
    image: '/icons/content-strategy.png',
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: 3,
    title: 'E-commerce Solutions',
    slug: 'e-commerce',
    description: 'Membangun platform e-commerce yang modern, aman, dan user-friendly untuk bisnis online.',
    image: '/icons/shopping.png',
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: 4,
    title: 'Branding & Graphic Design',
    slug: 'branding',
    description: 'Desain visual yang menarik dan profesional untuk membangun identitas brand yang kuat.',
    image: '/icons/pantone.png',
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: 5,
    title: 'Consulting & Strategy',
    slug: 'consulting',
    description: 'Konsultasi teknologi dan strategi digital untuk mengoptimalkan proses bisnis.',
    image: '/icons/conversation.png',
    isActive: true,
    createdAt: Timestamp.now(),
  },
  {
    id: 6,
    title: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    description: 'Implementasi AI dan Machine Learning untuk solusi cerdas dalam berbagai bidang.',
    image: '/icons/ai.png',
    isActive: true,
    createdAt: Timestamp.now(),
  },
]

// 3. Programs
const programs = [
  {
    id: 1,
    title: 'Bootcamp Web Development',
    slug: 'bootcamp-web-development',
    description: 'Program intensif 12 minggu untuk menguasai web development dari dasar hingga advanced.',
    image: '/images/programs/bootcamp.jpg',
    startDate: Timestamp.fromDate(new Date('2025-02-01')),
    endDate: Timestamp.fromDate(new Date('2025-04-30')),
    registrationDeadline: Timestamp.fromDate(new Date('2025-01-25')),
    status: 'upcoming',
    capacity: 30,
    enrolled: 0,
    level: 'beginner',
    duration: '12 minggu',
    createdAt: Timestamp.now(),
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    slug: 'machine-learning-fundamentals',
    description: 'Pelajari dasar-dasar machine learning dengan praktik langsung menggunakan Python dan TensorFlow.',
    image: '/images/programs/ml.jpg',
    startDate: Timestamp.fromDate(new Date('2025-03-01')),
    endDate: Timestamp.fromDate(new Date('2025-05-30')),
    registrationDeadline: Timestamp.fromDate(new Date('2025-02-20')),
    status: 'upcoming',
    capacity: 25,
    enrolled: 0,
    level: 'intermediate',
    duration: '10 minggu',
    createdAt: Timestamp.now(),
  },
  {
    id: 3,
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    description: 'Belajar membuat aplikasi mobile native dan cross-platform dengan React Native.',
    image: '/images/programs/mobile.jpg',
    startDate: Timestamp.fromDate(new Date('2025-01-15')),
    endDate: Timestamp.fromDate(new Date('2025-03-15')),
    registrationDeadline: Timestamp.fromDate(new Date('2025-01-10')),
    status: 'active',
    capacity: 20,
    enrolled: 15,
    level: 'intermediate',
    duration: '8 minggu',
    createdAt: Timestamp.now(),
  },
]

// 4. Portfolio Projects
const portfolioProjects = [
  {
    id: 1,
    title: 'E-Learning Platform',
    slug: 'e-learning-platform',
    description: 'Platform pembelajaran online dengan fitur video streaming, quiz interaktif, dan tracking progress.',
    image: '/images/portfolio/elearning.jpg',
    category: 'web',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    demoUrl: 'https://demo-elearning.vercel.app',
    githubUrl: 'https://github.com/dcn-undipa/elearning',
    featured: true,
    creator: {
      name: 'Tim DCN UNDIPA',
      role: 'Full Stack Development',
    },
    tags: ['Education', 'SaaS', 'Web App'],
    createdAt: Timestamp.now(),
  },
  {
    id: 2,
    title: 'Smart Agriculture IoT',
    slug: 'smart-agriculture-iot',
    description: 'Sistem monitoring pertanian berbasis IoT dengan machine learning untuk prediksi hasil panen.',
    image: '/images/portfolio/agriculture.jpg',
    category: 'ml',
    techStack: ['Python', 'TensorFlow', 'IoT', 'Firebase', 'React'],
    demoUrl: 'https://smart-agri.vercel.app',
    githubUrl: 'https://github.com/dcn-undipa/smart-agri',
    featured: true,
    creator: {
      name: 'Ahmad Rizki',
      role: 'IoT & ML Engineer',
    },
    tags: ['IoT', 'Machine Learning', 'Agriculture'],
    createdAt: Timestamp.now(),
  },
  {
    id: 3,
    title: 'Mobile Fintech App',
    slug: 'mobile-fintech-app',
    description: 'Aplikasi mobile untuk manajemen keuangan pribadi dengan AI budgeting assistant.',
    image: '/images/portfolio/fintech.jpg',
    category: 'mobile',
    techStack: ['React Native', 'TypeScript', 'Firebase', 'Stripe'],
    demoUrl: null,
    githubUrl: 'https://github.com/dcn-undipa/fintech-app',
    featured: false,
    creator: {
      name: 'Siti Nurhaliza',
      role: 'Mobile Developer',
    },
    tags: ['Fintech', 'Mobile', 'AI'],
    createdAt: Timestamp.now(),
  },
]

// 5. Career/Jobs
const jobPostings = [
  {
    id: 1,
    title: 'Frontend Developer',
    slug: 'frontend-developer',
    company: 'Tech Startup Indonesia',
    location: 'Jakarta',
    workType: 'hybrid',
    employmentType: 'full-time',
    experience: '1-3 tahun',
    salary: 'Rp 8.000.000 - Rp 12.000.000',
    description: 'Kami mencari Frontend Developer yang passionate untuk bergabung dengan tim kami dalam mengembangkan produk digital.',
    requirements: [
      'Minimal 1 tahun pengalaman dengan React.js',
      'Menguasai HTML, CSS, JavaScript/TypeScript',
      'Familiar dengan state management (Redux/Zustand)',
      'Pengalaman dengan Next.js adalah nilai plus',
    ],
    responsibilities: [
      'Develop dan maintain frontend aplikasi web',
      'Kolaborasi dengan tim design dan backend',
      'Optimize aplikasi untuk performa maksimal',
      'Code review dan mentoring junior developer',
    ],
    postedDate: Timestamp.now(),
    deadline: Timestamp.fromDate(new Date('2025-02-28')),
    status: 'active',
    featured: true,
    applyUrl: 'https://example.com/apply/frontend',
    createdAt: Timestamp.now(),
  },
  {
    id: 2,
    title: 'Machine Learning Engineer',
    slug: 'machine-learning-engineer',
    company: 'AI Innovation Labs',
    location: 'Bandung',
    workType: 'remote',
    employmentType: 'full-time',
    experience: '2-4 tahun',
    salary: 'Rp 12.000.000 - Rp 18.000.000',
    description: 'Join our AI team to build cutting-edge machine learning solutions.',
    requirements: [
      'Strong background in ML/DL algorithms',
      'Proficient in Python, TensorFlow/PyTorch',
      'Experience with MLOps practices',
      'Good understanding of statistics',
    ],
    responsibilities: [
      'Design and implement ML models',
      'Deploy models to production',
      'Optimize model performance',
      'Research new ML techniques',
    ],
    postedDate: Timestamp.now(),
    deadline: Timestamp.fromDate(new Date('2025-03-15')),
    status: 'active',
    featured: true,
    applyUrl: 'https://example.com/apply/ml-engineer',
    createdAt: Timestamp.now(),
  },
]

// 6. Leaderboard
const leaderboardUsers = [
  {
    id: 1,
    rank: 1,
    name: 'Ahmad Rizki',
    avatar: '/avatars/user-1.jpg',
    points: 2850,
    badges: 15,
    completedCourses: 12,
    createdAt: Timestamp.now(),
  },
  {
    id: 2,
    rank: 2,
    name: 'Siti Nurhaliza',
    avatar: '/avatars/user-2.jpg',
    points: 2640,
    badges: 13,
    completedCourses: 10,
    createdAt: Timestamp.now(),
  },
  {
    id: 3,
    rank: 3,
    name: 'Budi Santoso',
    avatar: '/avatars/user-3.jpg',
    points: 2480,
    badges: 12,
    completedCourses: 9,
    createdAt: Timestamp.now(),
  },
  {
    id: 4,
    rank: 4,
    name: 'Dewi Lestari',
    avatar: '/avatars/user-4.jpg',
    points: 2320,
    badges: 11,
    completedCourses: 8,
    createdAt: Timestamp.now(),
  },
  {
    id: 5,
    rank: 5,
    name: 'Eko Prasetyo',
    avatar: '/avatars/user-5.jpg',
    points: 2150,
    badges: 10,
    completedCourses: 8,
    createdAt: Timestamp.now(),
  },
]

// ===== SEEDING FUNCTION =====

async function seedFirestore() {
  console.log('🌱 Starting Firestore seeding...\n')

  try {
    // 1. Seed Community Stats
    console.log('📊 Seeding community stats...')
    await setDoc(doc(db, 'settings', 'community_stats'), communityStats)
    console.log('✅ Community stats seeded\n')

    // 2. Seed Services
    console.log('🛠️  Seeding services...')
    for (const service of services) {
      await setDoc(doc(db, 'services', `service_${service.id}`), service)
      console.log(`  ✓ ${service.title}`)
    }
    console.log('✅ Services seeded\n')

    // 3. Seed Programs
    console.log('📚 Seeding programs...')
    for (const program of programs) {
      await setDoc(doc(db, 'programs', `program_${program.id}`), program)
      console.log(`  ✓ ${program.title}`)
    }
    console.log('✅ Programs seeded\n')

    // 4. Seed Portfolio
    console.log('💼 Seeding portfolio...')
    for (const project of portfolioProjects) {
      await setDoc(doc(db, 'portfolio', `project_${project.id}`), project)
      console.log(`  ✓ ${project.title}`)
    }
    console.log('✅ Portfolio seeded\n')

    // 5. Seed Career
    console.log('👔 Seeding job postings...')
    for (const job of jobPostings) {
      await setDoc(doc(db, 'career', `job_${job.id}`), job)
      console.log(`  ✓ ${job.title}`)
    }
    console.log('✅ Job postings seeded\n')

    // 6. Seed Leaderboard
    console.log('🏆 Seeding leaderboard...')
    for (const user of leaderboardUsers) {
      await setDoc(doc(db, 'leaderboard', `user_${user.id}`), user)
      console.log(`  ✓ Rank ${user.rank}: ${user.name}`)
    }
    console.log('✅ Leaderboard seeded\n')

    console.log('🎉 Firestore seeding completed successfully!\n')
    console.log('📝 Summary:')
    console.log(`  - Community Stats: 1 document`)
    console.log(`  - Services: ${services.length} documents`)
    console.log(`  - Programs: ${programs.length} documents`)
    console.log(`  - Portfolio: ${portfolioProjects.length} documents`)
    console.log(`  - Career: ${jobPostings.length} documents`)
    console.log(`  - Leaderboard: ${leaderboardUsers.length} documents`)
    console.log(`\n✨ Total: ${1 + services.length + programs.length + portfolioProjects.length + jobPostings.length + leaderboardUsers.length} documents created`)
    
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error)
    throw error
  }
}

// Run seeder
seedFirestore()
  .then(() => {
    console.log('\n✅ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error)
    process.exit(1)
  })
