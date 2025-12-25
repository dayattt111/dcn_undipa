/**
 * Community Types
 * Type definitions for DCN UNDIPA community data
 */

// Community Stats
export interface ICommunityStats {
  totalMembers: number
  totalClassesCompleted: number
  totalEvents: number
  activeLearners: number
}

// Contributor
export interface IContributor {
  id: number
  name: string
  role: 'Member' | 'Mentor' | 'Core Team' | 'Organizer'
  avatar?: string
  completedClasses: number
  badges: string[]
  githubUrl?: string
  linkedinUrl?: string
}

// Community Program
export interface ICommunityProgram {
  id: number
  title: string
  slug: string
  description: string
  icon?: string
  image?: string
  status: 'active' | 'upcoming' | 'completed'
  participants?: number
  startDate?: string
  endDate?: string
  category: 'bootcamp' | 'study-group' | 'event' | 'workshop' | 'competition'
}

// Activity/Documentation
export interface ICommunityActivity {
  id: number
  title: string
  description?: string
  image: string
  date: string
  category: 'bootcamp' | 'study-group' | 'event' | 'workshop' | 'meetup'
  participants?: number
}

// Milestone Badge
export interface IMilestoneBadge {
  id: string
  name: string
  icon: string
  color: string
  description: string
  requiredClasses?: number
}

// Leaderboard Entry
export interface ILeaderboardEntry {
  rank: number
  contributor: IContributor
  totalClasses: number
  badges: IMilestoneBadge[]
  lastUpdate: string
}
