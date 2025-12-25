'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

import { ICommunityProgram } from '@/types/community'

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

const categoryLabels: Record<ICommunityProgram['category'], string> = {
  bootcamp: 'Bootcamp',
  workshop: 'Workshop',
  'study-group': 'Study Group',
  event: 'Event',
  competition: 'Kompetisi',
}

type Props = {
  program: ICommunityProgram
}

export default function ProgramDetailContent({ program }: Props) {
  const theme = useTheme()

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
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            component={Link}
            href='/programs'
            sx={{
              mb: 4,
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            ← Kembali ke Program
          </Button>
        </motion.div>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {/* Header Image */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 300,
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
                    width={200}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                  <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                    <Chip
                      label={statusLabels[program.status]}
                      color={statusColors[program.status]}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Box>

                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Category */}
                  <Chip
                    label={categoryLabels[program.category]}
                    size='small'
                    sx={{
                      mb: 2,
                      backgroundColor:
                        theme.palette.mode === 'dark'
                          ? 'rgba(152, 15, 90, 0.2)'
                          : 'rgba(152, 15, 90, 0.1)',
                      color: 'primary.main',
                      fontWeight: 600,
                    }}
                  />

                  {/* Title */}
                  <Typography
                    variant='h3'
                    component='h1'
                    sx={{
                      mb: 3,
                      fontWeight: 700,
                      fontSize: { xs: 24, md: 32 },
                      lineHeight: 1.3,
                    }}
                  >
                    {program.title}
                  </Typography>

                  <Divider sx={{ mb: 3 }} />

                  {/* Description */}
                  <Typography
                    variant='h6'
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Tentang Program
                  </Typography>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{
                      mb: 4,
                      lineHeight: 1.8,
                      fontSize: 16,
                    }}
                  >
                    {program.description}
                  </Typography>

                  {/* Additional Details Section */}
                  <Typography
                    variant='h6'
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Yang Akan Dipelajari
                  </Typography>
                  <Box component='ul' sx={{ pl: 2, mb: 4 }}>
                    <Typography component='li' sx={{ mb: 1, color: 'text.secondary' }}>
                      Materi fundamental hingga advanced
                    </Typography>
                    <Typography component='li' sx={{ mb: 1, color: 'text.secondary' }}>
                      Praktik langsung dengan project nyata
                    </Typography>
                    <Typography component='li' sx={{ mb: 1, color: 'text.secondary' }}>
                      Mentoring dari praktisi berpengalaman
                    </Typography>
                    <Typography component='li' sx={{ mb: 1, color: 'text.secondary' }}>
                      Sertifikat penyelesaian program
                    </Typography>
                  </Box>

                  <Typography
                    variant='h6'
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    Persyaratan
                  </Typography>
                  <Box component='ul' sx={{ pl: 2, mb: 0 }}>
                    <Typography component='li' sx={{ mb: 1, color: 'text.secondary' }}>
                      Mahasiswa aktif UNDIPA atau alumni
                    </Typography>
                    <Typography component='li' sx={{ mb: 1, color: 'text.secondary' }}>
                      Memiliki laptop dengan spesifikasi minimal
                    </Typography>
                    <Typography component='li' sx={{ mb: 1, color: 'text.secondary' }}>
                      Komitmen untuk mengikuti program hingga selesai
                    </Typography>
                    <Typography component='li' sx={{ color: 'text.secondary' }}>
                      Tergabung dalam grup WhatsApp/Telegram komunitas
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'sticky',
                  top: 100,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant='h6'
                    sx={{
                      mb: 3,
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    Informasi Program
                  </Typography>

                  {/* Info Items */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Typography sx={{ fontSize: 20 }}>🏷️</Typography>
                      <Box>
                        <Typography variant='caption' color='text.secondary' display='block'>
                          Kategori
                        </Typography>
                        <Typography variant='body2' fontWeight={600}>
                          {categoryLabels[program.category]}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <Typography sx={{ fontSize: 20 }}>👥</Typography>
                      <Box>
                        <Typography variant='caption' color='text.secondary' display='block'>
                          Peserta Terdaftar
                        </Typography>
                        <Typography variant='body2' fontWeight={600}>
                          {program.participants || 0} Peserta
                        </Typography>
                      </Box>
                    </Box>

                    {program.startDate && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography sx={{ fontSize: 20 }}>📅</Typography>
                        <Box>
                          <Typography variant='caption' color='text.secondary' display='block'>
                            Tanggal Mulai
                          </Typography>
                          <Typography variant='body2' fontWeight={600}>
                            {new Date(program.startDate).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  {/* CTA Buttons */}
                  <Button
                    variant='contained'
                    fullWidth
                    size='large'
                    sx={{
                      mb: 2,
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
                    Daftar Sekarang
                  </Button>

                  <Button
                    variant='outlined'
                    fullWidth
                    size='large'
                    sx={{
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
                    Hubungi Admin
                  </Button>

                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{
                      display: 'block',
                      textAlign: 'center',
                      mt: 2,
                      lineHeight: 1.5,
                    }}
                  >
                    Dengan mendaftar, Anda menyetujui syarat dan ketentuan yang berlaku
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
