'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

import { communityPrograms } from '@/constants/community'
import { ICommunityProgram } from '@/types/community'

type CategoryFilter = 'all' | ICommunityProgram['category']

const categoryLabels: Record<CategoryFilter, string> = {
  all: 'Semua Program',
  bootcamp: 'Bootcamp',
  workshop: 'Workshop',
  'study-group': 'Study Group',
  event: 'Event',
  competition: 'Kompetisi',
}

const statusLabels: Record<ICommunityProgram['status'], string> = {
  active: 'Sedang Berjalan',
  upcoming: 'Segera Dimulai',
  completed: 'Selesai',
}

const statusColors: Record<ICommunityProgram['status'], 'success' | 'warning' | 'default'> = {
  active: 'success',
  upcoming: 'warning',
  completed: 'default',
}

const ProgramCard = ({ program }: { program: ICommunityProgram }) => {
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        component="a"
        href={`/programs/${program.slug}`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          border: '1px solid',
          borderColor: 'divider',
          textDecoration: 'none',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 12px 40px rgba(152, 15, 90, 0.25)'
              : '0 12px 40px rgba(152, 15, 90, 0.15)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 180,
            backgroundColor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Image
            src={program.image as string}
            alt={program.title}
            width={120}
            height={120}
            style={{ objectFit: 'contain' }}
          />
          <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
            <Chip
              label={statusLabels[program.status]}
              color={statusColors[program.status]}
              size='small'
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Chip
            label={categoryLabels[program.category]}
            size='small'
            sx={{
              mb: 2,
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(152, 15, 90, 0.2)' : 'rgba(152, 15, 90, 0.1)',
              color: 'primary.main',
              fontWeight: 600,
              fontSize: 11,
            }}
          />

          <Typography
            variant='h5'
            component='h3'
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: 18, md: 20 },
              lineHeight: 1.3,
            }}
          >
            {program.title}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 3,
              lineHeight: 1.6,
              minHeight: 60,
            }}
          >
            {program.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='body2' color='text.secondary'>
                👥
              </Typography>
              <Typography variant='body2' color='text.secondary' fontWeight={600}>
                {program.participants || 0} Peserta
              </Typography>
            </Box>

            {program.startDate && (
              <Typography variant='caption' color='text.secondary'>
                📅 {new Date(program.startDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ProgramsPageContent() {
  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')

  const filteredPrograms =
    selectedCategory === 'all'
      ? communityPrograms
      : communityPrograms.filter((p) => p.category === selectedCategory)

  const handleCategoryChange = (_event: React.SyntheticEvent, newValue: CategoryFilter) => {
    setSelectedCategory(newValue)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 10, md: 12 },
        pb: { xs: 8, md: 12 },
        background:
          theme.palette.mode === 'dark'
            ? 'radial-gradient(ellipse at top, rgba(152, 15, 90, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(76, 0, 39, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at top, rgba(152, 15, 90, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(152, 15, 90, 0.05) 0%, transparent 50%)',
      }}
    >
      <Container maxWidth='lg'>
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Chip
              label='PROGRAM KOMUNITAS'
              sx={{
                mb: 3,
                px: 2,
                py: 0.5,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(152, 15, 90, 0.2)' : 'rgba(152, 15, 90, 0.1)',
                color: 'primary.main',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: 1,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: 32, sm: 40, md: 48 },
                fontWeight: 800,
                mb: 2,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)'
                    : 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Program Komunitas
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: 16, md: 18 },
              }}
            >
              Jelajahi berbagai program belajar, workshop, bootcamp, dan event yang
              dirancang untuk mengembangkan skill programming dan membangun portofolio
              profesional Anda.
            </Typography>
          </motion.div>
        </Box>

        {/* Category Filter Tabs */}
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant='scrollable'
            scrollButtons='auto'
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3,
                borderRadius: 1.5,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: 13, md: 15 },
                minHeight: 48,
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <Tab label={categoryLabels.all} value='all' />
            <Tab label={categoryLabels.bootcamp} value='bootcamp' />
            <Tab label={categoryLabels.workshop} value='workshop' />
            <Tab label={categoryLabels['study-group']} value='study-group' />
            <Tab label={categoryLabels.event} value='event' />
            <Tab label={categoryLabels.competition} value='competition' />
          </Tabs>
        </Box>

        {/* Programs Grid */}
        <Grid container spacing={3}>
          {filteredPrograms.map((program) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={program.id}>
              <ProgramCard program={program} />
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredPrograms.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant='h6' color='text.secondary'>
              Belum ada program untuk kategori ini
            </Typography>
          </Box>
        )}

        {/* CTA Section */}
        <Box
          sx={{
            mt: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            textAlign: 'center',
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(152, 15, 90, 0.2) 0%, rgba(76, 0, 39, 0.2) 100%)'
                : 'linear-gradient(135deg, rgba(152, 15, 90, 0.1) 0%, rgba(255, 245, 248, 0.8) 100%)',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(152, 15, 90, 0.3)' : 'rgba(152, 15, 90, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant='h4'
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: 24, md: 32 },
            }}
          >
            Siap Bergabung?
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            sx={{ mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}
          >
            Daftar sekarang dan mulai perjalanan belajar Anda bersama ratusan developer
            lainnya di Dicoding Community Network UNDIPA.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant='contained'
              size='large'
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
                background:
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #980f5a 0%, #c41470 100%)'
                    : 'linear-gradient(135deg, #980f5a 0%, #d01678 100%)',
                '&:hover': {
                  background:
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #7a0c48 0%, #a00f5a 100%)'
                      : 'linear-gradient(135deg, #7a0c48 0%, #b01260 100%)',
                },
              }}
            >
              Gabung Komunitas
            </Button>
            <Button
              variant='outlined'
              size='large'
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(152, 15, 90, 0.05)',
                },
              }}
            >
              Hubungi Kami
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
