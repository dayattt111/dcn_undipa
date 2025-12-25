'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { motion } from 'framer-motion'

export default function AboutPageContent() {
  const stats = [
    { label: 'Anggota Aktif', value: '150+', gradient: 'linear-gradient(135deg, #980f5a 0%, #c2185b 100%)' },
    { label: 'Program & Event', value: '50+', gradient: 'linear-gradient(135deg, #4c0027 0%, #6b0a3f 100%)' },
    { label: 'Project Selesai', value: '80+', gradient: 'linear-gradient(135deg, #ec407a 0%, #f06292 100%)' },
    { label: 'Partner', value: '20+', gradient: 'linear-gradient(135deg, #6b0a3f 0%, #980f5a 100%)' },
  ]

  const values = [
    {
      title: 'Fokus pada Pembelajaran',
      description: 'Kami percaya bahwa belajar adalah proses berkelanjutan. Melalui berbagai program dan kegiatan, kami memfasilitasi pembelajaran yang efektif dan menyenangkan.',
      color: '#980f5a',
    },
    {
      title: 'Kolaborasi & Networking',
      description: 'Membangun komunitas yang solid dengan saling mendukung, berbagi ilmu, dan berkolaborasi dalam berbagai project teknologi.',
      color: '#4c0027',
    },
    {
      title: 'Inovasi & Kreativitas',
      description: 'Mendorong setiap anggota untuk berpikir kreatif dan inovatif dalam menyelesaikan masalah serta mengembangkan solusi teknologi.',
      color: '#ec407a',
    },
    {
      title: 'Pengembangan Karir',
      description: 'Membantu anggota mengembangkan skill yang dibutuhkan industri dan membuka peluang karir di bidang teknologi.',
      color: '#6b0a3f',
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
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
            <Box
              sx={{
                display: 'inline-block',
                px: 3,
                py: 1,
                mb: 3,
                borderRadius: 50,
                border: '1px solid',
                borderColor: 'primary.main',
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(152, 15, 90, 0.1)'
                    : 'rgba(152, 15, 90, 0.05)',
              }}
            >
              <Typography variant="body2" color="primary" fontWeight={600}>
                Dicoding Community Network
              </Typography>
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                mb: 3,
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              Tentang Kami
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 900,
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: { xs: '1.1rem', md: '1.35rem' },
                fontWeight: 400,
                px: { xs: 2, md: 0 },
              }}
            >
              Komunitas developer dan tech enthusiast yang berfokus pada pembelajaran, kolaborasi, dan pengembangan skill digital di Universitas Pendidikan Indonesia.
            </Typography>
          </Box>
        </motion.div>

        {/* Stats Section */}
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 8, md: 12 } }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 4 },
                    textAlign: 'center',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    background: stat.gradient,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(152, 15, 90, 0.3)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: 'white',
                        mb: 1,
                        fontSize: { xs: '2rem', md: '3rem' },
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Mission & Vision */}
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  height: '100%',
                  borderRadius: 4,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  position: 'relative',
                  overflow: 'hidden',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.02)'
                      : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(152, 15, 90, 0.15)',
                    borderColor: 'secondary.main',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    height: '6px',
                    background: (theme) =>
                      `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 3,
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(152, 15, 90, 0.2)'
                        : 'rgba(152, 15, 90, 0.1)',
                  }}
                >
                  <Typography variant="overline" color="primary" fontWeight={700} sx={{ letterSpacing: 1 }}>
                    Visi Kami
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    lineHeight: 1.8,
                    fontSize: { xs: '1.1rem', md: '1.35rem' },
                    fontWeight: 500,
                    color: 'text.primary',
                  }}
                >
                  Menjadi komunitas teknologi terdepan yang melahirkan developer berkualitas dan profesional,
                  serta memberikan dampak positif bagi ekosistem teknologi di Indonesia.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  height: '100%',
                  borderRadius: 4,
                  border: '2px solid',
                  borderColor: 'secondary.main',
                  position: 'relative',
                  overflow: 'hidden',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.02)'
                      : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(76, 0, 39, 0.15)',
                    borderColor: 'primary.main',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    height: '6px',
                    background: (theme) =>
                      `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 3,
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(76, 0, 39, 0.2)'
                        : 'rgba(76, 0, 39, 0.1)',
                  }}
                >
                  <Typography variant="overline" color="secondary" fontWeight={700} sx={{ letterSpacing: 1 }}>
                    Misi Kami
                  </Typography>
                </Box>
                <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                  {[
                    'Menyelenggarakan program pembelajaran berkualitas',
                    'Memfasilitasi kolaborasi dan networking',
                    'Membuka akses ke peluang karir di industri teknologi',
                    'Mendorong inovasi dan pengembangan project'
                  ].map((mission, idx) => (
                    <Box
                      key={idx}
                      component="li"
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        '&:last-child': { mb: 0 },
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          mt: 0.5,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.8,
                          fontSize: { xs: '0.95rem', md: '1.1rem' },
                          color: 'text.primary',
                        }}
                      >
                        {mission}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Values */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 2,
                }}
              >
                Nilai-Nilai Kami
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Prinsip-prinsip yang menjadi fondasi dalam setiap kegiatan komunitas kami
              </Typography>
            </Box>
          </motion.div>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'divider',
                      position: 'relative',
                      overflow: 'hidden',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.02)'
                          : 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 24px ${value.color}30`,
                        borderColor: value.color,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '4px',
                        height: '100%',
                        background: value.color,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: `${value.color}20`,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: value.color,
                        }}
                      />
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {value.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Timeline */}
        <Box>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 2,
                }}
              >
                Perjalanan Kami
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Menelusuri jejak pertumbuhan dan perkembangan komunitas dari waktu ke waktu
              </Typography>
            </Box>
          </motion.div>
          <Box sx={{ position: 'relative', maxWidth: 900, mx: 'auto' }}>
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    pb: 5,
                    pl: { xs: 5, md: index % 2 === 0 ? 0 : '52%' },
                    pr: { xs: 0, md: index % 2 === 0 ? '52%' : 0 },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: { xs: '16px', md: '50%' },
                      top: 0,
                      bottom: index === timeline.length - 1 ? 'auto' : 0,
                      width: '3px',
                      height: index === timeline.length - 1 ? '60px' : '100%',
                      background: (theme) =>
                        `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      transform: 'translateX(-50%)',
                    },
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: 4,
                      border: '2px solid',
                      borderColor: 'divider',
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.02)'
                          : 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(152, 15, 90, 0.15)',
                        borderColor: 'primary.main',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: { xs: '-41px', md: index % 2 === 0 ? 'auto' : '-28px' },
                        right: { xs: 'auto', md: index % 2 === 0 ? '-28px' : 'auto' },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        border: '4px solid',
                        borderColor: 'background.paper',
                        boxShadow: '0 0 0 4px rgba(152, 15, 90, 0.1)',
                        zIndex: 2,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        mb: 2,
                        borderRadius: 2,
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
                        border: '1px solid',
                        borderColor: 'primary.main',
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={900}
                        color="primary"
                        sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                      >
                        {item.year}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      gutterBottom
                      sx={{ mb: 1.5, fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1.05rem' } }}
                    >
                      {item.description}
                    </Typography>
                  </Paper>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
