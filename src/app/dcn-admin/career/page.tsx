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
import { IJobPosting } from '@/types/career'

// Emoji icons
const AddIcon = () => <span>➕</span>
const EditIcon = () => <span>✏️</span>
const DeleteIcon = () => <span>🗑️</span>

type JobWithDocId = IJobPosting & { docId: string }

const workTypeColors: Record<string, string> = {
  remote: '#10b981',
  onsite: '#3b82f6',
  hybrid: '#8b5cf6',
}

const statusColors: Record<string, 'success' | 'default'> = {
  active: 'success',
  closed: 'default',
}

const initialFormData: Omit<IJobPosting, 'id'> = {
  title: '',
  slug: '',
  company: '',
  companyLogo: '',
  location: '',
  workType: 'remote',
  employmentType: 'full-time',
  description: '',
  requirements: [],
  responsibilities: [],
  salaryRange: '',
  benefits: [],
  skills: [],
  experience: '',
  postedDate: new Date().toISOString().split('T')[0],
  deadlineDate: '',
  applyUrl: '',
  contactEmail: '',
  status: 'active',
  featured: false,
}

export default function AdminCareerPage() {
  const [jobs, setJobs] = useState<JobWithDocId[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<JobWithDocId | null>(null)
  const [deletingJob, setDeletingJob] = useState<JobWithDocId | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [requirementsInput, setRequirementsInput] = useState('')
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('')
  const [benefitsInput, setBenefitsInput] = useState('')
  const [skillsInput, setSkillsInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  const fetchJobs = async () => {
    try {
      const q = query(collection(db, 'career'), orderBy('id', 'desc'))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      })) as JobWithDocId[]
      setJobs(data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleOpenDialog = (job?: JobWithDocId) => {
    if (job) {
      setEditingJob(job)
      setFormData({
        title: job.title,
        slug: job.slug,
        company: job.company,
        companyLogo: job.companyLogo || '',
        location: job.location,
        workType: job.workType,
        employmentType: job.employmentType,
        description: job.description,
        requirements: job.requirements || [],
        responsibilities: job.responsibilities || [],
        salaryRange: job.salaryRange || '',
        benefits: job.benefits || [],
        skills: job.skills || [],
        experience: job.experience || '',
        postedDate: job.postedDate,
        deadlineDate: job.deadlineDate || '',
        applyUrl: job.applyUrl || '',
        contactEmail: job.contactEmail || '',
        status: job.status,
        featured: job.featured || false,
      })
      setRequirementsInput((job.requirements || []).join('\n'))
      setResponsibilitiesInput((job.responsibilities || []).join('\n'))
      setBenefitsInput((job.benefits || []).join('\n'))
      setSkillsInput((job.skills || []).join(', '))
    } else {
      setEditingJob(null)
      setFormData(initialFormData)
      setRequirementsInput('')
      setResponsibilitiesInput('')
      setBenefitsInput('')
      setSkillsInput('')
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingJob(null)
    setFormData(initialFormData)
  }

  const generateSlug = (title: string, company: string) => {
    return `${title}-${company}`
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleSave = async () => {
    if (!formData.title || !formData.company || !formData.description) {
      setSnackbar({ open: true, message: 'Mohon lengkapi semua field yang wajib', severity: 'error' })
      return
    }

    const requirements = requirementsInput.split('\n').map((s) => s.trim()).filter(Boolean)
    const responsibilities = responsibilitiesInput.split('\n').map((s) => s.trim()).filter(Boolean)
    const benefits = benefitsInput.split('\n').map((s) => s.trim()).filter(Boolean)
    const skills = skillsInput.split(',').map((s) => s.trim()).filter(Boolean)

    setSaving(true)
    try {
      const dataToSave = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title, formData.company),
        requirements,
        responsibilities,
        benefits,
        skills,
      }

      if (editingJob) {
        await updateDoc(doc(db, 'career', editingJob.docId), {
          ...dataToSave,
          updatedAt: Timestamp.now(),
        })
        setSnackbar({ open: true, message: 'Job berhasil diupdate', severity: 'success' })
      } else {
        const snapshot = await getDocs(collection(db, 'career'))
        const nextId = snapshot.size + 1
        await addDoc(collection(db, 'career'), {
          ...dataToSave,
          id: nextId,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        })
        setSnackbar({ open: true, message: 'Job berhasil ditambahkan', severity: 'success' })
      }
      handleCloseDialog()
      fetchJobs()
    } catch (error) {
      console.error('Error saving job:', error)
      setSnackbar({ open: true, message: 'Gagal menyimpan job', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingJob) return

    setSaving(true)
    try {
      await deleteDoc(doc(db, 'career', deletingJob.docId))
      setSnackbar({ open: true, message: 'Job berhasil dihapus', severity: 'success' })
      setDeleteDialogOpen(false)
      setDeletingJob(null)
      fetchJobs()
    } catch (error) {
      console.error('Error deleting job:', error)
      setSnackbar({ open: true, message: 'Gagal menghapus job', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <div>
          <Typography variant="h4" fontWeight={800}>
            Career
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelola lowongan pekerjaan
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ background: 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)' }}
        >
          Tambah Lowongan
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Position</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
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
              ) : jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      Belum ada lowongan. Klik &quot;Tambah Lowongan&quot; untuk menambahkan.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                jobs.map((job) => (
                  <TableRow key={job.docId} hover>
                    <TableCell>{job.id}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>{job.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {job.location}
                      </Typography>
                    </TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.workType}
                        size="small"
                        sx={{
                          bgcolor: `${workTypeColors[job.workType]}20`,
                          color: workTypeColors[job.workType],
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        size="small"
                        color={statusColors[job.status]}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleOpenDialog(job)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setDeletingJob(job)
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
          {editingJob ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Job Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="Company *"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                fullWidth
                placeholder="e.g., Jakarta, Indonesia"
              />
              <TextField
                label="Salary Range"
                value={formData.salaryRange}
                onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                fullWidth
                placeholder="e.g., Rp 8.000.000 - 15.000.000"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                select
                label="Work Type"
                value={formData.workType}
                onChange={(e) =>
                  setFormData({ ...formData, workType: e.target.value as IJobPosting['workType'] })
                }
                fullWidth
              >
                <MenuItem value="remote">Remote</MenuItem>
                <MenuItem value="onsite">Onsite</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </TextField>
              <TextField
                select
                label="Employment Type"
                value={formData.employmentType}
                onChange={(e) =>
                  setFormData({ ...formData, employmentType: e.target.value as IJobPosting['employmentType'] })
                }
                fullWidth
              >
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="internship">Internship</MenuItem>
              </TextField>
              <TextField
                select
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as IJobPosting['status'] })
                }
                fullWidth
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </TextField>
            </Box>
            <TextField
              label="Description *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Requirements (satu per baris)"
              value={requirementsInput}
              onChange={(e) => setRequirementsInput(e.target.value)}
              fullWidth
              multiline
              rows={4}
              placeholder="Minimal 2 tahun pengalaman&#10;Menguasai React.js&#10;Familiar dengan Git"
            />
            <TextField
              label="Responsibilities (satu per baris)"
              value={responsibilitiesInput}
              onChange={(e) => setResponsibilitiesInput(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              label="Benefits (satu per baris)"
              value={benefitsInput}
              onChange={(e) => setBenefitsInput(e.target.value)}
              fullWidth
              multiline
              rows={3}
              placeholder="Asuransi kesehatan&#10;WFH flexible&#10;Learning budget"
            />
            <TextField
              label="Skills (comma separated)"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              fullWidth
              placeholder="React, Node.js, TypeScript"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                fullWidth
                placeholder="e.g., 2-4 tahun"
              />
              <TextField
                label="Company Logo URL"
                value={formData.companyLogo}
                onChange={(e) => setFormData({ ...formData, companyLogo: e.target.value })}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Apply URL"
                value={formData.applyUrl}
                onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
                fullWidth
              />
              <TextField
                label="Contact Email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                fullWidth
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Posted Date"
                type="date"
                value={formData.postedDate}
                onChange={(e) => setFormData({ ...formData, postedDate: e.target.value })}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="Deadline Date"
                type="date"
                value={formData.deadlineDate}
                onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
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
            Apakah Anda yakin ingin menghapus lowongan &quot;{deletingJob?.title}&quot;?
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
