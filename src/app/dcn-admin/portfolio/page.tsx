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
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
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
import { IPortfolioProject } from '@/types/portfolio'

type ProjectWithDocId = IPortfolioProject & { docId: string }

const categoryLabels: Record<string, string> = {
  web: 'Web',
  mobile: 'Mobile',
  ml: 'Machine Learning',
  cloud: 'Cloud',
  game: 'Game',
  other: 'Other',
}

const initialFormData: Omit<IPortfolioProject, 'id'> = {
  title: '',
  slug: '',
  description: '',
  image: '',
  category: 'web',
  techStack: [],
  creator: { name: '', role: '', avatar: '', github: '', linkedin: '' },
  links: { github: '', demo: '', youtube: '' },
  tags: [],
  completedDate: '',
  programSource: '',
  featured: false,
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<ProjectWithDocId[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectWithDocId | null>(null)
  const [deletingProject, setDeletingProject] = useState<ProjectWithDocId | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [techStackInput, setTechStackInput] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'portfolio'), orderBy('id', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      })) as ProjectWithDocId[]
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleOpenDialog = (project?: ProjectWithDocId) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        image: project.image || '',
        category: project.category,
        techStack: project.techStack || [],
        creator: project.creator || { name: '' },
        links: project.links || {},
        tags: project.tags || [],
        completedDate: project.completedDate || '',
        programSource: project.programSource || '',
        featured: project.featured || false,
      })
      setTechStackInput((project.techStack || []).join(', '))
      setTagsInput((project.tags || []).join(', '))
    } else {
      setEditingProject(null)
      setFormData(initialFormData)
      setTechStackInput('')
      setTagsInput('')
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingProject(null)
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

  const handleSave = async () => {
    if (!formData.title || !formData.slug || !formData.description) {
      setSnackbar({ open: true, message: 'Mohon lengkapi semua field yang wajib', severity: 'error' })
      return
    }

    const techStack = techStackInput.split(',').map((s) => s.trim()).filter(Boolean)
    const tags = tagsInput.split(',').map((s) => s.trim()).filter(Boolean)

    setSaving(true)
    try {
      const dataToSave = {
        ...formData,
        techStack,
        tags,
      }

      if (editingProject) {
        await updateDoc(doc(db, 'portfolio', editingProject.docId), {
          ...dataToSave,
          updatedAt: Timestamp.now(),
        })
        setSnackbar({ open: true, message: 'Project berhasil diupdate', severity: 'success' })
      } else {
        const snapshot = await getDocs(collection(db, 'portfolio'))
        const nextId = snapshot.size + 1
        await addDoc(collection(db, 'portfolio'), {
          ...dataToSave,
          id: nextId,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        })
        setSnackbar({ open: true, message: 'Project berhasil ditambahkan', severity: 'success' })
      }
      handleCloseDialog()
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      setSnackbar({ open: true, message: 'Gagal menyimpan project', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingProject) return

    setSaving(true)
    try {
      await deleteDoc(doc(db, 'portfolio', deletingProject.docId))
      setSnackbar({ open: true, message: 'Project berhasil dihapus', severity: 'success' })
      setDeleteDialogOpen(false)
      setDeletingProject(null)
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      setSnackbar({ open: true, message: 'Gagal menghapus project', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" fontWeight={800}>
            Portfolio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelola showcase project komunitas
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ background: 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)' }}
        >
          Tambah Project
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Creator</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Featured</TableCell>
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
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Belum ada project. Klik &quot;Tambah Project&quot; untuk menambahkan.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.docId} hover>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{project.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        /{project.slug}
                      </Typography>
                    </TableCell>
                    <TableCell>{project.creator?.name || '-'}</TableCell>
                    <TableCell>
                      <Chip
                        label={categoryLabels[project.category] || project.category}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={project.featured ? 'Yes' : 'No'}
                        size="small"
                        color={project.featured ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleOpenDialog(project)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setDeletingProject(project)
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
          {editingProject ? 'Edit Project' : 'Tambah Project Baru'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <TextField
              label="Title *"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })
              }
              fullWidth
            />
            <TextField
              label="Slug *"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                select
                label="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as IPortfolioProject['category'] })
                }
                fullWidth
              >
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Program Source"
                value={formData.programSource}
                onChange={(e) => setFormData({ ...formData, programSource: e.target.value })}
                fullWidth
                placeholder="e.g., Bootcamp Full-Stack Web"
              />
            </Box>
            <TextField
              label="Tech Stack (comma separated)"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              fullWidth
              placeholder="React, Node.js, MongoDB"
            />
            <TextField
              label="Tags (comma separated)"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              fullWidth
              placeholder="E-Commerce, Full-Stack"
            />
            <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 1 }}>
              Creator Info
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Creator Name"
                value={formData.creator.name}
                onChange={(e) =>
                  setFormData({ ...formData, creator: { ...formData.creator, name: e.target.value } })
                }
                fullWidth
              />
              <TextField
                label="Creator Role"
                value={formData.creator.role || ''}
                onChange={(e) =>
                  setFormData({ ...formData, creator: { ...formData.creator, role: e.target.value } })
                }
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Creator GitHub"
                value={formData.creator.github || ''}
                onChange={(e) =>
                  setFormData({ ...formData, creator: { ...formData.creator, github: e.target.value } })
                }
                fullWidth
              />
              <TextField
                label="Creator LinkedIn"
                value={formData.creator.linkedin || ''}
                onChange={(e) =>
                  setFormData({ ...formData, creator: { ...formData.creator, linkedin: e.target.value } })
                }
                fullWidth
              />
            </Box>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 1 }}>
              Project Links
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="GitHub URL"
                value={formData.links.github || ''}
                onChange={(e) =>
                  setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })
                }
                fullWidth
              />
              <TextField
                label="Demo URL"
                value={formData.links.demo || ''}
                onChange={(e) =>
                  setFormData({ ...formData, links: { ...formData.links, demo: e.target.value } })
                }
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                fullWidth
              />
              <TextField
                label="Completed Date"
                type="date"
                value={formData.completedDate}
                onChange={(e) => setFormData({ ...formData, completedDate: e.target.value })}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
              }
              label="Featured (tampilkan di homepage)"
            />
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
            Apakah Anda yakin ingin menghapus project &quot;{deletingProject?.title}&quot;?
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
