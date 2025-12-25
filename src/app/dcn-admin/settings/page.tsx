'use client'

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Skeleton from '@mui/material/Skeleton'
import Grid from '@mui/material/Grid'
// Emoji icons
const SaveIcon = () => <span>💾</span>
const PeopleIcon = () => <span style={{ fontSize: '1.5rem' }}>👥</span>
const SchoolIcon = () => <span style={{ fontSize: '1.5rem' }}>📚</span>
const EventIcon = () => <span style={{ fontSize: '1.5rem' }}>📅</span>
const TrendingUpIcon = () => <span style={{ fontSize: '1.5rem' }}>📈</span>
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { ICommunityStats } from '@/types/community'

const STATS_DOC_ID = 'community_stats'

const statFields = [
  { key: 'totalMembers', label: 'Total Members', icon: <PeopleIcon />, color: '#980f5a' },
  { key: 'totalClassesCompleted', label: 'Total Classes Completed', icon: <SchoolIcon />, color: '#2196f3' },
  { key: 'totalEvents', label: 'Total Events', icon: <EventIcon />, color: '#4caf50' },
  { key: 'activeLearners', label: 'Active Learners', icon: <TrendingUpIcon />, color: '#ff9800' },
]

export default function AdminSettingsPage() {
  const [stats, setStats] = useState<ICommunityStats>({
    totalMembers: 0,
    totalClassesCompleted: 0,
    totalEvents: 0,
    activeLearners: 0,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const docRef = doc(db, 'settings', STATS_DOC_ID)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data() as ICommunityStats
          setStats({
            totalMembers: data.totalMembers || 0,
            totalClassesCompleted: data.totalClassesCompleted || 0,
            totalEvents: data.totalEvents || 0,
            activeLearners: data.activeLearners || 0,
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const docRef = doc(db, 'settings', STATS_DOC_ID)
      await setDoc(docRef, {
        ...stats,
        updatedAt: Timestamp.now(),
      })
      setSnackbar({ open: true, message: 'Statistik berhasil disimpan', severity: 'success' })
    } catch (error) {
      console.error('Error saving stats:', error)
      setSnackbar({ open: true, message: 'Gagal menyimpan statistik', severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key: keyof ICommunityStats, value: string) => {
    setStats({ ...stats, [key]: parseInt(value) || 0 })
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Kelola statistik dan pengaturan komunitas
      </Typography>

      {/* Stats Section */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Statistik Komunitas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Data ini akan ditampilkan di bagian statistik pada homepage
          </Typography>

          {loading ? (
            <Grid container spacing={3}>
              {statFields.map((field) => (
                <Grid size={{ xs: 12, sm: 6 }} key={field.key}>
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {statFields.map((field) => (
                <Grid size={{ xs: 12, sm: 6 }} key={field.key}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: `${field.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: field.color,
                      }}
                    >
                      {field.icon}
                    </Box>
                    <TextField
                      label={field.label}
                      type="number"
                      value={stats[field.key as keyof ICommunityStats]}
                      onChange={(e) => handleChange(field.key as keyof ICommunityStats, e.target.value)}
                      size="small"
                      fullWidth
                      slotProps={{ htmlInput: { min: 0 } }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={saving || loading}
              sx={{ background: 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)' }}
            >
              {saving ? 'Menyimpan...' : 'Simpan Statistik'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Informasi
          </Typography>
          <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 2, color: 'info.contrastText' }}>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              💡 Tips Penggunaan Admin Panel
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <li>
                <Typography variant="body2">
                  Data dari Firebase akan digunakan sebagai sumber data utama
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Jika Firebase kosong, website akan menggunakan data fallback dari file constants
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Pastikan mengisi semua field yang diperlukan untuk menghindari error
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Perubahan akan langsung terlihat setelah refresh halaman website
                </Typography>
              </li>
            </Box>
          </Box>
        </CardContent>
      </Card>

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
