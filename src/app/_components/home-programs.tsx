'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { getPrograms } from '@/lib/firebase/programs'
import { ICommunityProgram } from '@/types/community'
import { AppConfig } from '@/configs'

type ProgramItemProps = {
  item: ICommunityProgram
  index: number
}
const HomeProgramItem = ({ item, index }: ProgramItemProps) => {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Box
          component={Link}
          href={`/programs/${item.slug}`}
          sx={{
            display: 'block',
            textDecoration: 'none',
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            height: '100%',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(152, 15, 90, 0.2)',
              borderColor: 'primary.main',
            },
          }}
        >
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            px: 1.5,
            py: 0.5,
            borderRadius: 1.5,
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            backgroundColor: item.status === 'active' ? '#10b981' : '#f59e0b',
            color: '#fff',
          }}
        >
          {item.status === 'active' ? 'Aktif' : 'Segera'}
        </Box>

        <Box
          sx={{
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 80,
          }}
        >
          <Image
            src={item.image as string}
            alt={item.title}
            width={80}
            height={80}
            style={{ width: 'auto', height: '100%', maxHeight: 80 }}
          />
        </Box>
        <Typography
          component='h3'
          variant='h6'
          sx={{
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            mb: 1.5,
            pr: { xs: 8, sm: 10 },
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          {item.title}
        </Typography>

        <Typography
          component='p'
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', md: '0.95rem' },
            lineHeight: 1.7,
            mb: 2.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            minHeight: { xs: 60, md: 75 },
          }}
        >
          {item.description}
        </Typography>

        {item.participants && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.5,
              py: 0.75,
              borderRadius: 1.5,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(152, 15, 90, 0.15)'
                  : 'rgba(152, 15, 90, 0.08)',
              width: 'fit-content',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'primary.main',
              }}
            >
              {item.participants}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              peserta
            </Typography>
          </Box>
        )}
      </Box>
      </motion.div>
    </Grid>
  )
}

const HomePrograms = () => {
  const { palette } = useTheme()
  const [programs, setPrograms] = useState<ICommunityProgram[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms()
        setPrograms(data.slice(0, 3)) // Top 3 programs for homepage
      } catch (error) {
        console.error('Error fetching programs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPrograms()
  }, [])

  return (
    <Box
      id='home-programs'
      component='section'
      sx={{
        width: '100%',
        py: { xs: 8, md: 14 },
        position: 'relative',
        background:
          palette.mode === 'dark'
            ? 'linear-gradient(180deg, #2d0017 0%, #1a0010 100%)'
            : 'linear-gradient(180deg, #fafafa 0%, #fff5f8 100%)',
      }}
    >
      <Container maxWidth='lg'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant='overline'
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 2,
                mb: 2,
                display: 'block',
              }}
            >
              Program
            </Typography>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 2,
              }}
            >
              Program Belajar & Pengembangan
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ maxWidth: 700, mx: 'auto', fontSize: { xs: '1rem', md: '1.1rem' } }}
            >
              Ikuti berbagai program yang dirancang untuk mengembangkan skill programming dan membangun portofolio profesional
            </Typography>
          </Box>
        </motion.div>
        <Grid container spacing={3}>
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Skeleton variant="rectangular" width={80} height={80} sx={{ mb: 2.5, borderRadius: 2 }} />
                  <Skeleton variant="text" width="80%" height={32} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Grid>
            ))
          ) : programs.length > 0 ? (
            programs.map((item, index) => (
              <HomeProgramItem item={item} index={index} key={item.id} />
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Typography textAlign="center" color="text.secondary" py={4}>
                Belum ada program tersedia
              </Typography>
            </Grid>
          )}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              href='/programs'
              variant='outlined'
              size='large'
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Lihat Semua Program
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default HomePrograms
