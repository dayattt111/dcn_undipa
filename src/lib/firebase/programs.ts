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
import { ICommunityProgram } from '@/types/community'

const COLLECTION_NAME = 'programs'

// Convert Firestore document to ICommunityProgram
const convertDoc = (doc: DocumentData): ICommunityProgram => {
  const data = doc.data()
  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    icon: data.icon,
    image: data.image,
    status: data.status,
    participants: data.participants,
    startDate: data.startDate,
    endDate: data.endDate,
    registrationDeadline: data.registrationDeadline,
    category: data.category,
  }
}

// Get all programs
export const getPrograms = async (): Promise<ICommunityProgram[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('id', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDoc)
  } catch (error) {
    console.error('Error getting programs:', error)
    return []
  }
}

// Get program by slug
export const getProgramBySlug = async (slug: string): Promise<ICommunityProgram | null> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    return convertDoc(snapshot.docs[0])
  } catch (error) {
    console.error('Error getting program:', error)
    return null
  }
}

// Get active programs
export const getActivePrograms = async (): Promise<ICommunityProgram[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'active'),
      orderBy('id', 'asc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDoc)
  } catch (error) {
    console.error('Error getting active programs:', error)
    return []
  }
}

// Add new program
export const addProgram = async (
  program: Omit<ICommunityProgram, 'id'>
): Promise<string | null> => {
  try {
    // Get next ID
    const snapshot = await getDocs(collection(db, COLLECTION_NAME))
    const nextId = snapshot.size + 1

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...program,
      id: nextId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding program:', error)
    return null
  }
}

// Update program
export const updateProgram = async (
  docId: string,
  data: Partial<ICommunityProgram>
): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error('Error updating program:', error)
    return false
  }
}

// Delete program
export const deleteProgram = async (docId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, docId))
    return true
  } catch (error) {
    console.error('Error deleting program:', error)
    return false
  }
}

// Get program by document ID
export const getProgramById = async (docId: string): Promise<ICommunityProgram | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, docId)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) return null
    return convertDoc(snapshot)
  } catch (error) {
    console.error('Error getting program by ID:', error)
    return null
  }
}
