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
import { IPortfolioProject } from '@/types/portfolio'

const COLLECTION_NAME = 'portfolio'

// Convert Firestore document to IPortfolioProject
const convertDoc = (doc: DocumentData): IPortfolioProject & { docId: string } => {
  const data = doc.data()
  return {
    docId: doc.id,
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    image: data.image,
    category: data.category,
    techStack: data.techStack || [],
    creator: data.creator || {},
    links: data.links || {},
    tags: data.tags || [],
    completedDate: data.completedDate,
    programSource: data.programSource,
    featured: data.featured,
  }
}

// Get all portfolio projects
export const getPortfolioProjects = async (): Promise<(IPortfolioProject & { docId: string })[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('id', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDoc)
  } catch (error) {
    console.error('Error getting portfolio:', error)
    return []
  }
}

// Get featured projects
export const getFeaturedProjects = async (): Promise<(IPortfolioProject & { docId: string })[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('featured', '==', true),
      orderBy('id', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(convertDoc)
  } catch (error) {
    console.error('Error getting featured projects:', error)
    return []
  }
}

// Get project by slug
export const getProjectBySlug = async (
  slug: string
): Promise<(IPortfolioProject & { docId: string }) | null> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    return convertDoc(snapshot.docs[0])
  } catch (error) {
    console.error('Error getting project:', error)
    return null
  }
}

// Add new project
export const addProject = async (
  project: Omit<IPortfolioProject, 'id'>
): Promise<string | null> => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME))
    const nextId = snapshot.size + 1

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...project,
      id: nextId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding project:', error)
    return null
  }
}

// Update project
export const updateProject = async (
  docId: string,
  data: Partial<IPortfolioProject>
): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    })
    return true
  } catch (error) {
    console.error('Error updating project:', error)
    return false
  }
}

// Delete project
export const deleteProject = async (docId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, docId))
    return true
  } catch (error) {
    console.error('Error deleting project:', error)
    return false
  }
}
