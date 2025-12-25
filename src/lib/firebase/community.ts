import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  DocumentData,
  Timestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from './config'
import { ICommunityStats, IContributor } from '@/types/community'

// ===== STATS =====
const STATS_DOC_ID = 'community_stats'

export const getStats = async (): Promise<ICommunityStats | null> => {
  try {
    const snapshot = await getDocs(collection(db, 'settings'))
    const statsDoc = snapshot.docs.find((d) => d.id === STATS_DOC_ID)
    if (!statsDoc) return null
    return statsDoc.data() as ICommunityStats
  } catch (error) {
    console.error('Error getting stats:', error)
    return null
  }
}

export const updateStats = async (stats: ICommunityStats): Promise<boolean> => {
  try {
    const docRef = doc(db, 'settings', STATS_DOC_ID)
    await setDoc(docRef, {
      ...stats,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error('Error updating stats:', error)
    return false
  }
}

// ===== LEADERBOARD =====
const LEADERBOARD_COLLECTION = 'leaderboard'

export interface ILeaderboardUser {
  id?: number
  docId?: string
  rank: number
  name: string
  avatar?: string
  points: number
  badges: number
  completedCourses: number
}

const convertLeaderboardDoc = (doc: DocumentData): ILeaderboardUser => {
  const data = doc.data()
  return {
    docId: doc.id,
    id: data.id,
    rank: data.rank,
    name: data.name,
    avatar: data.avatar,
    points: data.points,
    badges: data.badges,
    completedCourses: data.completedCourses,
  }
}

export const getLeaderboard = async (): Promise<ILeaderboardUser[]> => {
  try {
    const q = query(collection(db, LEADERBOARD_COLLECTION), orderBy('rank', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertLeaderboardDoc)
  } catch (error) {
    console.error('Error getting leaderboard:', error)
    return []
  }
}

export const updateLeaderboardUser = async (
  docId: string,
  data: Partial<ILeaderboardUser>
): Promise<boolean> => {
  try {
    const docRef = doc(db, LEADERBOARD_COLLECTION, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error('Error updating leaderboard user:', error)
    return false
  }
}

export const addLeaderboardUser = async (
  user: Omit<ILeaderboardUser, 'docId'>
): Promise<string | null> => {
  try {
    const snapshot = await getDocs(collection(db, LEADERBOARD_COLLECTION))
    const nextId = snapshot.size + 1

    const docRef = doc(db, LEADERBOARD_COLLECTION, `user_${nextId}`)
    await setDoc(docRef, {
      ...user,
      id: nextId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding leaderboard user:', error)
    return null
  }
}

// ===== CONTRIBUTORS =====
const CONTRIBUTORS_COLLECTION = 'contributors'

const convertContributorDoc = (doc: DocumentData): IContributor & { docId: string } => {
  const data = doc.data()
  return {
    docId: doc.id,
    id: data.id,
    name: data.name,
    role: data.role,
    avatar: data.avatar,
    completedClasses: data.completedClasses,
    badges: data.badges || [],
    githubUrl: data.githubUrl,
    linkedinUrl: data.linkedinUrl,
  }
}

export const getContributors = async (): Promise<(IContributor & { docId: string })[]> => {
  try {
    const q = query(collection(db, CONTRIBUTORS_COLLECTION), orderBy('id', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertContributorDoc)
  } catch (error) {
    console.error('Error getting contributors:', error)
    return []
  }
}
