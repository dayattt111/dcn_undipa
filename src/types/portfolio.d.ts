/**
 * Portfolio Types
 * Type definitions for community portfolio/projects
 */

export interface IPortfolioProject {
  id: number
  title: string
  slug: string
  description: string
  image: string
  category: 'web' | 'mobile' | 'ml' | 'cloud' | 'game' | 'other'
  techStack: string[] // ['React', 'Node.js', 'MongoDB']
  creator: {
    name: string
    role?: string
    avatar?: string
    github?: string
    linkedin?: string
    instagram?: string
  }
  links: {
    github?: string
    demo?: string
    youtube?: string
  }
  tags: string[]
  completedDate?: string
  programSource?: string // e.g., 'Bootcamp Full-Stack', 'Study Group Android'
}
