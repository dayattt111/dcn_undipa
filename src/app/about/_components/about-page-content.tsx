'use client'

import { Box, Container, Typography, Paper, Grid2 as Grid } from '@mui/material'
import { motion } from 'framer-motion'

export default function AboutPageContent() {
  const stats = [
    { label: 'Anggota Aktif', value: '150+', icon: '👥' },
    { label: 'Program & Event', value: '50+', icon: '📚' },
    { label: 'Project Selesai', value: '80+', icon: '🚀' },
    { label: 'Partner', value: '20+', icon: '🤝' },
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Fokus pada Pembelajaran',
      description: 'Kami percaya bahwa belajar adalah proses berkelanjutan. Melalui berbagai program dan kegiatan, kami memfasilitasi pembelajaran yang efektif dan menyenangkan.',
    },
    {
      icon: '🤝',
      title: 'Kolaborasi & Networking',
      description: 'Membangun komunitas yang solid dengan saling mendukung, berbagi ilmu, dan berkolaborasi dalam berbagai project teknologi.',
    },
    {
      icon: '💡',
      title: 'Inovasi & Kreativitas',
      description: 'Mendorong setiap anggota untuk berpikir kreatif dan inovatif dalam menyelesaikan masalah serta mengembangkan solusi teknologi.',
    },
    {
      icon: '🌟',
      title: 'Pengembangan Karir',
      description: 'Membantu anggota mengembangkan skill yang dibutuhkan industri dan membuka peluang karir di bidang teknologi.',
    },
  ]

  const timeline = [
    {
      year: '2023',
      title: 'Awal Mula',
      description: 'Dicoding Community Network UNDIPA didirikan oleh sekelompok mahasiswa yang passionate di bidang teknologi.',
    },
    {
      year: '2024',
      title: 'Ekspansi Program',
      description: 'Meluncurkan berbagai program bootcamp, study group, dan workshop untuk meningkatkan skill anggota.',
    },
    {
      year: '2025',
      title: 'Kolaborasi Industri',
      description: 'Menjalin kerjasama dengan berbagai perusahaan teknologi untuk membuka peluang karir bagi anggota.',
    },
  ]

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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Tentang Kami
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Dicoding Community Network UNDIPA adalah komunitas developer dan tech enthusiast yang berfokus pada
              pembelajaran, kolaborasi, dan pengembangan skill digital.
            </Typography>
          </Box>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, sm: 3 }} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>{stat.icon}</Typography>
                  <Typography variant="h4" fontWeight={800} color="primary" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight={600}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(152, 15, 90, 0.1)'
                      : 'rgba(152, 15, 90, 0.05)',
                }}
              >
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                  🎯 Visi Kami
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                  Menjadi komunitas teknologi terdepan yang melahirkan developer berkualitas dan profesional,
                  serta memberikan dampak positif bagi ekosistem teknologi di Indonesia.
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(76, 0, 39, 0.1)'
                      : 'rgba(76, 0, 39, 0.05)',
                }}
              >
                <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                  🚀 Misi Kami
                </Typography>
                <Box component="ul" sx={{ pl: 3, m: 0 }}>
                  <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.8 }}>
                    Menyelenggarakan program pembelajaran berkualitas
                  </Typography>
                  <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.8 }}>
                    Memfasilitasi kolaborasi dan networking
                  </Typography>
                  <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.8 }}>
                    Membuka akses ke peluang karir di industri teknologi
                  </Typography>
                  <Typography component="li" variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Mendorong inovasi dan pengembangan project
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Nilai-Nilai Kami
            </Typography>
            <Grid container spacing={3}>
              {values.map((value, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '2.5rem', mb: 2 }}>{value.icon}</Typography>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {value.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              textAlign="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Perjalanan Kami
            </Typography>
            <Box sx={{ position: 'relative' }}>
              {timeline.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    pb: 4,
                    pl: { xs: 0, md: index % 2 === 0 ? 0 : '50%' },
                    pr: { xs: 0, md: index % 2 === 0 ? '50%' : 0 },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: { xs: '20px', md: '50%' },
                      top: 0,
                      bottom: index === timeline.length - 1 ? 'auto' : 0,
                      width: '2px',
                      height: index === timeline.length - 1 ? '40px' : '100%',
                      background: (theme) =>
                        `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      transform: 'translateX(-50%)',
                    },
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      ml: { xs: 6, md: index % 2 === 0 ? 0 : 4 },
                      mr: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: { xs: '-38px', md: index % 2 === 0 ? 'auto' : '-20px' },
                        right: { xs: 'auto', md: index % 2 === 0 ? '-20px' : 'auto' },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        border: '3px solid',
                        borderColor: 'background.paper',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight={800}
                      color="primary"
                      gutterBottom
                    >
                      {item.year}
                    </Typography>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {item.description}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}
