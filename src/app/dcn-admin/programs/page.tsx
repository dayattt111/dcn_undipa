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
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Skeleton from '@mui/material/Skeleton'
// Emoji icons
const AddIcon = () => <span>➕</span>
const EditIcon = () => <span>✏️</span>
const DeleteIcon = () => <span>🗑️</span>
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { ICommunityProgram } from '@/types/community'

type ProgramWithDocId = ICommunityProgram & { docId: string }

const statusColors: Record<string, 'success' | 'warning' | 'default'> = {
  active: 'success',
  upcoming: 'warning',
  completed: 'default',
}

const categoryLabels: Record<string, string> = {
  bootcamp: 'Bootcamp',
  'study-group': 'Study Group',
  workshop: 'Workshop',
  event: 'Event',
  competition: 'Competition',
}

const initialFormData: Omit<ICommunityProgram, 'id'> = {
  title: '',
  slug: '',
  description: '',
  image: '',
  status: 'upcoming',
  participants: 0,
  category: 'bootcamp',
  startDate: '',
  endDate: '',
  registrationDeadline: '',
}

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<ProgramWithDocId[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<ProgramWithDocId | null>(null)
  const [deletingProgram, setDeletingProgram] = useState<ProgramWithDocId | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [saving, setSaving] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  const fetchPrograms = async () => {
    try {
      const q = query(collection(db, 'programs'), orderBy('id', 'asc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      })) as ProgramWithDocId[]
      setPrograms(data)
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  const handleOpenDialog = (program?: ProgramWithDocId) => {
    if (program) {
      setEditingProgram(program)
      setFormData({
        title: program.title,
        slug: program.slug,
        description: program.description,
        image: program.image || '',
        status: program.status,
        participants: program.participants || 0,
        category: program.category,
        startDate: program.startDate || '',
        endDate: program.endDate || '',
        registrationDeadline: program.registrationDeadline || '',
      })
    } else {
      setEditingProgram(null)
      setFormData(initialFormData)
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingProgram(null)
    setFormData(initialFormData)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.description) {
      setSnackbar({ open: true, message: 'Mohon lengkapi semua field yang wajib', severity: 'error' })
      return
    }

    setSaving(true)
    try {
      if (editingProgram) {
        // Update existing
        await updateDoc(doc(db, 'programs', editingProgram.docId), {
          ...formData,
          updatedAt: Timestamp.now(),
        })
        setSnackbar({ open: true, message: 'Program berhasil diupdate', severity: 'success' })
      } else {
        // Add new
        const snapshot = await getDocs(collection(db, 'programs'))
        const nextId = snapshot.size + 1
        await addDoc(collection(db, 'programs'), {
          ...formData,
          id: nextId,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        })
        setSnackbar({ open: true, message: 'Program berhasil ditambahkan', severity: 'success' })
      }
      handleCloseDialog()
      fetchPrograms()
    } catch (error) {
      console.error('Error saving program:', error)
      setSnackbar({ open: true, message: 'Gagal menyimpan program', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingProgram) return

    setSaving(true)
    try {
      await deleteDoc(doc(db, 'programs', deletingProgram.docId))
      setSnackbar({ open: true, message: 'Program berhasil dihapus', severity: 'success' })
      setDeleteDialogOpen(false)
      setDeletingProgram(null)
      fetchPrograms()
    } catch (error) {
      console.error('Error deleting program:', error)
      setSnackbar({ open: true, message: 'Gagal menghapus program', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" fontWeight={800}>
            Programs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelola program komunitas
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ background: 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)' }}
        >
          Tambah Program
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Participants</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              ) : programs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Belum ada program. Klik &quot;Tambah Program&quot; untuk menambahkan.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                programs.map((program) => (
                  <TableRow key={program.docId} hover>
                    <TableCell>{program.id}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{program.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        /{program.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={categoryLabels[program.category] || program.category}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={program.status}
                        size="small"
                        color={statusColors[program.status] || 'default'}
                      />
                    </TableCell>
                    <TableCell>{program.participants || 0}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleOpenDialog(program)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setDeletingProgram(program)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle fontWeight={700}>
          {editingProgram ? 'Edit Program' : 'Tambah Program Baru'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField
              label="Title *"
              value={formData.title}
              onChange={handleTitleChange}
              fullWidth
            />
            <TextField
              label="Slug *"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              fullWidth
              helperText="URL-friendly identifier (auto-generated from title)"
            />
            <TextField
              label="Description *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              fullWidth
              placeholder="/icons/mobile-app.png"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                select
                label="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as ICommunityProgram['category'],
                  })
                }
                fullWidth
              >
                <MenuItem value="bootcamp">Bootcamp</MenuItem>
                <MenuItem value="study-group">Study Group</MenuItem>
                <MenuItem value="workshop">Workshop</MenuItem>
                <MenuItem value="event">Event</MenuItem>
                <MenuItem value="competition">Competition</MenuItem>
              </TextField>
              <TextField
                select
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as ICommunityProgram['status'],
                  })
                }
                fullWidth
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Participants"
                type="number"
                value={formData.participants}
                onChange={(e) =>
                  setFormData({ ...formData, participants: parseInt(e.target.value) || 0 })
                }
                fullWidth
              />
              <TextField
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Registration Deadline"
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus program &quot;{deletingProgram?.title}&quot;?
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

      {/* Snackbar */}
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
