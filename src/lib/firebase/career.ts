import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  DocumentData,
  Timestamp,
} from 'firebase/firestore'
import { db } from './config'
import { IJobPosting } from '@/types/career'

const COLLECTION_NAME = 'career'

// Convert Firestore document to IJobPosting
const convertDoc = (doc: DocumentData): IJobPosting & { docId: string } => {
  const data = doc.data()
  return {
    docId: doc.id,
    id: data.id,
    title: data.title,
    slug: data.slug,
    company: data.company,
    companyLogo: data.companyLogo,
    location: data.location,
    workType: data.workType,
    employmentType: data.employmentType,
    description: data.description,
    requirements: data.requirements || [],
    responsibilities: data.responsibilities || [],
    salaryRange: data.salaryRange,
    benefits: data.benefits || [],
    skills: data.skills || [],
    experience: data.experience,
    postedDate: data.postedDate,
    deadlineDate: data.deadlineDate,
    applyUrl: data.applyUrl,
    contactEmail: data.contactEmail,
    status: data.status,
    featured: data.featured,
  }
}

// Get all job postings
export const getJobPostings = async (): Promise<(IJobPosting & { docId: string })[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('id', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDoc)
  } catch (error) {
    console.error('Error getting jobs:', error)
    return []
  }
}

// Get active jobs
export const getActiveJobs = async (): Promise<(IJobPosting & { docId: string })[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'active'),
      orderBy('id', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDoc)
  } catch (error) {
    console.error('Error getting active jobs:', error)
    return []
  }
}

// Get featured jobs
export const getFeaturedJobs = async (): Promise<(IJobPosting & { docId: string })[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('featured', '==', true),
      where('status', '==', 'active')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDoc)
  } catch (error) {
    console.error('Error getting featured jobs:', error)
    return []
  }
}

// Get job by slug
export const getJobBySlug = async (
  slug: string
): Promise<(IJobPosting & { docId: string }) | null> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    return convertDoc(snapshot.docs[0])
  } catch (error) {
    console.error('Error getting job:', error)
    return null
  }
}

// Add new job
export const addJob = async (job: Omit<IJobPosting, 'id'>): Promise<string | null> => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME))
    const nextId = snapshot.size + 1

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...job,
      id: nextId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding job:', error)
    return null
  }
}

// Update job
export const updateJob = async (
  docId: string,
  data: Partial<IJobPosting>
): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error('Error updating job:', error)
    return false
  }
}

// Delete job
export const deleteJob = async (docId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, docId))
    return true
  } catch (error) {
    console.error('Error deleting job:', error)
    return false
  }
}
