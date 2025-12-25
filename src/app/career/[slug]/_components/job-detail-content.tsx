'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IJobPosting } from '@/types/career'
import CountdownTimer from '@/components/core/countdown-timer'

interface JobDetailContentProps {
  job: IJobPosting
}

const getWorkTypeColor = (type: string) => {
  switch (type) {
    case 'remote':
      return '#10b981'
    case 'onsite':
      return '#3b82f6'
    case 'hybrid':
      return '#8b5cf6'
    default:
      return '#6b7280'
  }
}

const getWorkTypeLabel = (type: string) => {
  switch (type) {
    case 'remote':
      return 'Remote'
    case 'onsite':
      return 'On-site'
    case 'hybrid':
      return 'Hybrid'
    default:
      return type
  }
}

const getEmploymentTypeLabel = (type: string) => {
  switch (type) {
    case 'full-time':
      return 'Full-time'
    case 'part-time':
      return 'Part-time'
    case 'contract':
      return 'Contract'
    case 'internship':
      return 'Internship'
    default:
      return type
  }
}

export default function JobDetailContent({ job }: JobDetailContentProps) {
  const [isExpired, setIsExpired] = useState(false)

  const isDeadlinePassed = job.deadlineDate ? new Date(job.deadlineDate) < new Date() : false
  const isJobClosed = job.status === 'closed' || isDeadlinePassed || isExpired

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 10, md: 12 },
        pb: 8,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at top right, rgba(152, 15, 90, 0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(76, 0, 39, 0.15), transparent 50%)'
            : 'radial-gradient(circle at top right, rgba(152, 15, 90, 0.05), transparent 50%), radial-gradient(circle at bottom left, rgba(76, 0, 39, 0.05), transparent 50%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Button
            component={Link}
            href="/career"
            sx={{
              mb: 3,
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            ← Kembali ke Daftar Lowongan
          </Button>
        </motion.div>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                  {/* Company Logo & Name */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    {job.companyLogo && (
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: '1px solid',
                          borderColor: 'divider',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'background.paper',
                          fontSize: '32px',
                        }}
                      >
                        {job.companyLogo}
                      </Box>
                    )}
                    <Box>
                      <Typography variant="h5" fontWeight={700} gutterBottom>
                        {job.title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" fontWeight={500}>
                        {job.company}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip
                      label={getWorkTypeLabel(job.workType)}
                      size="small"
                      sx={{
                        bgcolor: getWorkTypeColor(job.workType),
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                    <Chip label={getEmploymentTypeLabel(job.employmentType)} size="small" variant="outlined" />
                    <Chip label={`📍 ${job.location}`} size="small" variant="outlined" />
                    <Chip label={`💼 ${job.experience}`} size="small" variant="outlined" />
                    {job.featured && (
                      <Chip
                        label="⭐ Featured"
                        size="small"
                        sx={{
                          bgcolor: 'warning.main',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  {/* Salary */}
                  {job.salaryRange && (
                    <Typography variant="h6" color="primary" fontWeight={700} gutterBottom>
                      💰 {job.salaryRange}
                    </Typography>
                  )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Job Description */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Deskripsi Pekerjaan
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {job.description}
                  </Typography>
                </Box>

                {/* Requirements */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Persyaratan
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {job.requirements.map((req, index) => (
                      <Typography key={index} component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        {req}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Responsibilities */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Tanggung Jawab
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {job.responsibilities.map((resp, index) => (
                      <Typography key={index} component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        {resp}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Benefit & Fasilitas
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                      {job.benefits.map((benefit, index) => (
                        <Typography key={index} component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                          {benefit}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Skills Required */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                    Keahlian yang Dibutuhkan
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {job.skills.map((skill, index) => (
                      <Chip key={index} label={skill} variant="outlined" color="primary" />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Dates */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    📅 Dipublikasikan: {formatDate(job.postedDate)}
                  </Typography>
                  {job.deadlineDate && (
                    <Typography variant="body2" color="text.secondary">
                      ⏰ Batas Lamaran: {formatDate(job.deadlineDate)}
                    </Typography>
                  )}
                </Box>

                {/* Apply Button */}
                {isJobClosed ? (
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      border: '2px dashed',
                      borderColor: 'divider',
                      textAlign: 'center',
                      bgcolor: 'action.hover',
                    }}
                  >
                    <Typography variant="h6" color="error" fontWeight={600}>
                      Lowongan Ditutup
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Maaf, lowongan ini sudah tidak menerima lamaran
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      component="a"
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        py: 1.5,
                        fontSize: '16px',
                        fontWeight: 700,
                        borderRadius: 2,
                        textTransform: 'none',
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 6,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Lamar Sekarang
                    </Button>
                    {job.contactEmail && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2, textAlign: 'center' }}
                      >
                        atau kirim CV ke:{' '}
                        <Typography
                          component="a"
                          href={`mailto:${job.contactEmail}`}
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {job.contactEmail}
                        </Typography>
                      </Typography>
                    )}
                  </Box>
                )}
              </Paper>
            </motion.div>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              {/* Countdown Timer */}
              {job.deadlineDate && !isJobClosed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mb: 3,
                      borderRadius: 3,
                      border: '2px dashed',
                      borderColor: 'primary.main',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(152, 15, 90, 0.1)'
                          : 'rgba(152, 15, 90, 0.05)',
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} gutterBottom textAlign="center">
                      ⏰ Batas Waktu Lamaran
                    </Typography>
                    <CountdownTimer
                      deadline={job.deadlineDate}
                      size="large"
                      onExpired={() => setIsExpired(true)}
                    />
                  </Paper>
                </motion.div>
              )}

              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Informasi Singkat
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        🏢 Perusahaan
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {job.company}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        📍 Lokasi
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {job.location}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        💼 Tipe Pekerjaan
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {getWorkTypeLabel(job.workType)} • {getEmploymentTypeLabel(job.employmentType)}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        🎓 Pengalaman
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {job.experience}
                      </Typography>
                    </Box>
                    {job.salaryRange && (
                      <>
                        <Divider />
                        <Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            💰 Gaji
                          </Typography>
                          <Typography variant="body1" fontWeight={600} color="primary">
                            {job.salaryRange}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                </Paper>
              </motion.div>

              {/* Share or Report */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    mt: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    📢 Bagikan Lowongan
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Bantu temanmu menemukan peluang karir yang tepat!
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        const url = `${window.location.origin}/career/${job.slug}`
                        const text = `Cek lowongan ${job.title} di ${job.company}!`
                        window.open(
                          `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
                          '_blank'
                        )
                      }}
                      sx={{ textTransform: 'none' }}
                    >
                      WhatsApp
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/career/${job.slug}`)
                        alert('Link berhasil disalin!')
                      }}
                      sx={{ textTransform: 'none' }}
                    >
                      Salin Link
                    </Button>
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
