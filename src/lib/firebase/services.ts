import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from './config'

export interface IService {
  id: number
  title: string
  slug: string
  description: string
  image: string
  isActive?: boolean
}

export const getServices = async (): Promise<IService[]> => {
  try {
    const q = query(
      collection(db, 'services'),
      where('isActive', '==', true),
      orderBy('id', 'asc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => doc.data() as IService)
  } catch (error) {
    console.error('Error getting services:', error)
    return []
  }
}

export const getAllServices = async (): Promise<IService[]> => {
  try {
    const q = query(collection(db, 'services'), orderBy('id', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => doc.data() as IService)
  } catch (error) {
    console.error('Error getting all services:', error)
    return []
  }
}
