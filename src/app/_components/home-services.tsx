'use client'

import React, { useState, useEffect } from 'react'

// components
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CountdownTimer from '@/components/core/countdown-timer'
import Skeleton from '@mui/material/Skeleton'

// hooks
import { useTheme } from '@mui/material/styles'

// types
import { ICommunityProgram } from '@/types/community'

// firebase
import { getActivePrograms } from '@/lib/firebase/programs'

// configs
import { AppConfig } from '@/configs'

type ProgramItemProps = {
  item: ICommunityProgram
}
const HomeProgramItem = ({ item }: ProgramItemProps) => {
  const [isExpired, setIsExpired] = useState(false)

  const isRegistrationClosed = item.registrationDeadline 
    ? new Date(item.registrationDeadline) < new Date() || isExpired
    : false

  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Box
        component={isRegistrationClosed ? 'div' : 'a'}
        href={isRegistrationClosed ? undefined : `/programs/${item.slug}`}
        sx={{
          cursor: isRegistrationClosed ? 'not-allowed' : 'pointer',
          borderRadius: 4,
          px: 5,
          py: 4,
          position: 'relative',
          overflow: 'hidden',
          transition: (theme) =>
            theme.transitions.create(['background-color', 'transform'], {
              duration: 450,
            }),
          backgroundColor: 'background.paper',
          textDecoration: 'none',
          display: 'block',
          opacity: isRegistrationClosed ? 0.6 : 1,
          ...(!isRegistrationClosed && {
            '&:hover': {
              boxShadow: 2,
              transform: 'translateY(-4px)',

              '& button': {
                opacity: 1,
              },
            },
          }),
        }}
      >
        <Box
          sx={{
            img: {
              height: 64,
              width: 'auto',
            },
            mb: 3,
          }}
        >
          <Image
            src={item.image as string}
            alt={item.title}
            width={100}
            height={100}
          />
        </Box>
        <Typography
          component='h3'
          variant='h4'
          sx={{ fontSize: { xs: 18, md: 20 }, mb: 2 }}
        >
          {item.title}
        </Typography>

        <Box sx={{ height: 70, overflow: 'hidden' }}>
          <Typography
            component='p'
            sx={{ color: 'text.secondary', fontSize: 15 }}
          >
            {item.description}
          </Typography>
        </Box>

        {/* Countdown Timer */}
        {item.registrationDeadline && !isRegistrationClosed && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px dashed rgba(255,255,255,0.2)' }}>
            <Typography
              variant='caption'
              sx={{
                display: 'block',
                mb: 1,
                fontWeight: 600,
                color: '#fbfbfb',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: 10,
              }}
            >
              ⏰ Batas Pendaftaran
            </Typography>
            <CountdownTimer 
              deadline={item.registrationDeadline} 
              onExpired={() => setIsExpired(true)}
              size='small'
            />
          </Box>
        )}
      </Box>
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
        const data = await getActivePrograms()
        setPrograms(data.slice(0, 6)) // Limit to 6 programs for homepage
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
        pt: { xs: 8, md: 14 },
        pb: { xs: 6, md: 12 },
        backgroundColor: palette.mode === 'dark' ? '#151733' : '#087ae7',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            mb: 6,
            color: 'primary.contrastText',
            textAlign: { xs: 'center', md: 'left' },
            width: {
              xs: '100%',
              md: '80%',
            },
          }}
        >
          <Box
            sx={{
              mb: 3,
              borderRadius: 1,
              display: 'inline-block',
              padding: '6px 14px',
              backgroundColor: 'rgb(255,255,255,0.10)',
              color: '#fbfbfb',
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
              variant='h5'
            >
              PROGRAM KOMUNITAS
            </Typography>
          </Box>
          <Typography
            component='h2'
            variant='h2'
            sx={{
              mb: 2,
              lineHeight: 1.4,
              fontWeight: '800',
              fontSize: { xs: 28, md: 40 },
            }}
          >
            Program Belajar & Pengembangan
          </Typography>
          <Typography
            sx={{
              color: '#ececec',
              mb: 1,
              fontSize: {
                xs: 16,
                md: 20,
              },
              lineHeight: 1.6,
            }}
          >
            Ikuti berbagai program yang dirancang untuk mengembangkan skill programming 
            dan membangun portofolio profesional.
          </Typography>
        </Box>
      </Container>
      <Container
        sx={{
          position: 'relative',
          overflowX: {
            xs: 'hidden',
            lg: 'unset',
          },
        }}
      >
        {/* Shapes */}
        <Box sx={{ position: 'absolute', top: -10, left: -16 }}>
          <Image
            src='/images/shape-2-b.png'
            width={70}
            height={100}
            alt='Shape 2'
          />
        </Box>
        <Box sx={{ position: 'absolute', top: 40, right: -20 }}>
          <Image
            src='/images/shape-1-a.png'
            width={84}
            height={90}
            alt='Shape 1'
          />
        </Box>
        <Box sx={{ position: 'absolute', top: -40, right: 420, width: 60 }}>
          <Image
            src='/images/circle-b.svg'
            width={34}
            height={34}
            alt='Shape circle a'
          />
        </Box>
        <Box sx={{ position: 'absolute', top: 500, right: -46 }}>
          <Image
            src='/images/figure-shape-1-b.png'
            width={26}
            height={26}
            alt='Shape 3'
          />
        </Box>
        <Box sx={{ position: 'absolute', top: -30, right: 112 }}>
          <Image
            src='/images/figure-shape-4-a.png'
            width={43}
            height={38}
            alt='Shape 4'
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 340,
            left: -40,
            transform: 'rotate(23deg)',
          }}
        >
          <Image
            src='/images/figure-shape-2.png'
            width={43}
            height={38}
            alt='Shape 4'
          />
        </Box>

        <Grid container spacing={3}>
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Box sx={{ p: 5, backgroundColor: 'background.paper', borderRadius: 4 }}>
                  <Skeleton variant="rectangular" width={64} height={64} sx={{ mb: 3, borderRadius: 2 }} />
                  <Skeleton variant="text" width="80%" height={32} sx={{ mb: 2 }} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Grid>
            ))
          ) : programs.length > 0 ? (
            programs.map((item) => (
              <HomeProgramItem item={item} key={item.id} />
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: 'center', py: 8, color: '#fbfbfb' }}>
                <Typography variant="h6">Belum ada program tersedia</Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6, color: '#fbfbfb' }}>
          <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
            Bergabung dengan {AppConfig.appName} dan kembangkan skill bersama ratusan developer lainnya
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePrograms
