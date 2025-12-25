'use client'

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
// Emoji icons
const SchoolIcon = () => <span style={{ fontSize: '1.5rem' }}>📚</span>
const WorkIcon = () => <span style={{ fontSize: '1.5rem' }}>💼</span>
const FolderIcon = () => <span style={{ fontSize: '1.5rem' }}>📁</span>
const PeopleIcon = () => <span style={{ fontSize: '1.5rem' }}>👥</span>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

interface StatCardProps {
  title: string
  count: number
  icon: React.ReactNode
  color: string
  loading?: boolean
}

const StatCard = ({ title, count, icon, color, loading }: StatCardProps) => (
  <Card
    sx={{
      height: '100%',
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-4px)' },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={600} gutterBottom>
            {title}
          </Typography>
          {loading ? (
            <Skeleton variant="text" width={60} height={48} />
          ) : (
            <Typography variant="h3" fontWeight={800} sx={{ color }}>
              {count}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            background: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    programs: 0,
    portfolio: 0,
    career: 0,
    leaderboard: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [programsSnap, portfolioSnap, careerSnap, leaderboardSnap] = await Promise.all([
          getDocs(collection(db, 'programs')),
          getDocs(collection(db, 'portfolio')),
          getDocs(collection(db, 'career')),
          getDocs(collection(db, 'leaderboard')),
        ])

        setStats({
          programs: programsSnap.size,
          portfolio: portfolioSnap.size,
          career: careerSnap.size,
          leaderboard: leaderboardSnap.size,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    { title: 'Total Programs', count: stats.programs, icon: <SchoolIcon fontSize="large" />, color: '#980f5a' },
    { title: 'Total Portfolio', count: stats.portfolio, icon: <FolderIcon fontSize="large" />, color: '#2196f3' },
    { title: 'Total Career', count: stats.career, icon: <WorkIcon fontSize="large" />, color: '#4caf50' },
    { title: 'Leaderboard Users', count: stats.leaderboard, icon: <PeopleIcon fontSize="large" />, color: '#ff9800' },
  ]

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Selamat datang di Admin Panel DCN UNDIPA
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.title}>
            <StatCard {...card} loading={loading} />
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 4, p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Panduan Penggunaan
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Panel admin ini digunakan untuk mengelola konten website DCN UNDIPA:
        </Typography>
        <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
          <li>
            <Typography variant="body2">
              <strong>Programs</strong> - Kelola program komunitas (bootcamp, study group, workshop)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Portfolio</strong> - Kelola showcase project anggota komunitas
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Career</strong> - Kelola lowongan pekerjaan
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Leaderboard</strong> - Kelola data leaderboard top contributors
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              <strong>Settings</strong> - Kelola statistik komunitas dan pengaturan lainnya
            </Typography>
          </li>
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'warning.light', borderRadius: 2, color: 'warning.contrastText' }}>
          <Typography variant="body2" fontWeight={600}>
            ⚠️ Catatan Penting:
          </Typography>
          <Typography variant="body2">
            Jika data kosong (0), berarti Anda perlu menambahkan data awal ke Firebase Firestore.
            Data dari file constants akan dijadikan fallback jika Firebase kosong.
          </Typography>
        </Box>
      </Card>
    </Box>
  )
}
