'use client'

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Skeleton from '@mui/material/Skeleton'
// Emoji icons
const AddIcon = () => <span>➕</span>
const EditIcon = () => <span>✏️</span>
const DeleteIcon = () => <span>🗑️</span>
const EmojiEventsIcon = () => <span style={{ fontSize: '3rem' }}>🏆</span>
import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

interface LeaderboardUser {
  docId?: string
  id: number
  rank: number
  name: string
  avatar?: string
  points: number
  badges: number
  completedCourses: number
}

const getRankMedal = (rank: number) => {
  switch (rank) {
    case 1:
      return { emoji: '🥇', color: '#FFD700' }
    case 2:
      return { emoji: '🥈', color: '#C0C0C0' }
    case 3:
      return { emoji: '🥉', color: '#CD7F32' }
    default:
      return { emoji: `#${rank}`, color: '#666' }
  }
}

const initialFormData: Omit<LeaderboardUser, 'id' | 'docId'> = {
  rank: 1,
  name: '',
  avatar: '',
  points: 0,
  badges: 0,
  completedCourses: 0,
}

export default function AdminLeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<LeaderboardUser | null>(null)
  const [deletingUser, setDeletingUser] = useState<LeaderboardUser | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [saving, setSaving] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  const fetchUsers = async () => {
    try {
      const q = query(collection(db, 'leaderboard'), orderBy('rank', 'asc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      })) as LeaderboardUser[]
      setUsers(data)
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleOpenDialog = (user?: LeaderboardUser) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        rank: user.rank,
        name: user.name,
        avatar: user.avatar || '',
        points: user.points,
        badges: user.badges,
        completedCourses: user.completedCourses,
      })
    } else {
      setEditingUser(null)
      const nextRank = users.length > 0 ? Math.max(...users.map((u) => u.rank)) + 1 : 1
      setFormData({ ...initialFormData, rank: nextRank })
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingUser(null)
    setFormData(initialFormData)
  }

  const handleSave = async () => {
    if (!formData.name || formData.rank <= 0) {
      setSnackbar({ open: true, message: 'Mohon lengkapi semua field yang wajib', severity: 'error' })
      return
    }

    setSaving(true)
    try {
      if (editingUser && editingUser.docId) {
        await updateDoc(doc(db, 'leaderboard', editingUser.docId), {
          ...formData,
          updatedAt: Timestamp.now(),
        })
        setSnackbar({ open: true, message: 'User berhasil diupdate', severity: 'success' })
      } else {
        const snapshot = await getDocs(collection(db, 'leaderboard'))
        const nextId = snapshot.size + 1
        const docId = `user_${nextId}`
        await setDoc(doc(db, 'leaderboard', docId), {
          ...formData,
          id: nextId,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        })
        setSnackbar({ open: true, message: 'User berhasil ditambahkan', severity: 'success' })
      }
      handleCloseDialog()
      fetchUsers()
    } catch (error) {
      console.error('Error saving user:', error)
      setSnackbar({ open: true, message: 'Gagal menyimpan user', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingUser || !deletingUser.docId) return

    setSaving(true)
    try {
      await deleteDoc(doc(db, 'leaderboard', deletingUser.docId))
      setSnackbar({ open: true, message: 'User berhasil dihapus', severity: 'success' })
      setDeleteDialogOpen(false)
      setDeletingUser(null)
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
      setSnackbar({ open: true, message: 'Gagal menghapus user', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" fontWeight={800}>
            Leaderboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelola top contributors Dicoding
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ background: 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)' }}
        >
          Tambah User
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Rank</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Points</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Badges</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Courses</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}><Skeleton /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Box sx={{ mb: 1, opacity: 0.5 }}><EmojiEventsIcon /></Box>
                    <Typography color="text.secondary">
                      Belum ada user di leaderboard. Klik &quot;Tambah User&quot; untuk menambahkan.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => {
                  const medal = getRankMedal(user.rank)
                  return (
                    <TableRow key={user.docId} hover>
                      <TableCell>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            bgcolor: user.rank <= 3 ? `${medal.color}20` : 'grey.100',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: user.rank <= 3 ? '1.25rem' : '0.875rem',
                          }}
                        >
                          {medal.emoji}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40 }}>
                            {user.name.charAt(0)}
                          </Avatar>
                          <Typography fontWeight={600}>{user.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight={700} color="primary.main">
                          {user.points.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{user.badges}</TableCell>
                      <TableCell align="center">{user.completedCourses}</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenDialog(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setDeletingUser(user)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>
          {editingUser ? 'Edit User' : 'Tambah User Baru'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Rank *"
                type="number"
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: parseInt(e.target.value) || 1 })}
                fullWidth
                slotProps={{ htmlInput: { min: 1 } }}
              />
              <TextField
                label="Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
              />
            </Box>
            <TextField
              label="Avatar URL"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              fullWidth
              placeholder="/avatars/user-1.jpg"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Points *"
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 0 })}
                fullWidth
              />
              <TextField
                label="Badges"
                type="number"
                value={formData.badges}
                onChange={(e) => setFormData({ ...formData, badges: parseInt(e.target.value) || 0 })}
                fullWidth
              />
              <TextField
                label="Courses"
                type="number"
                value={formData.completedCourses}
                onChange={(e) =>
                  setFormData({ ...formData, completedCourses: parseInt(e.target.value) || 0 })
                }
                fullWidth
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={handleCloseDialog} disabled={saving}>
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{ background: 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)' }}
          >
            {saving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus user &quot;{deletingUser?.name}&quot; dari leaderboard?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={saving}>
            Batal
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete} disabled={saving}>
            {saving ? 'Menghapus...' : 'Hapus'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
