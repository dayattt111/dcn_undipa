'use client'

import React from 'react'

// components
import Image from 'next/image'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// hooks
import { useTheme } from '@mui/material/styles'

// constants
import { communityPrograms } from '@/constants/community'

// configs
import { AppConfig } from '@/configs'

type ProgramItemProps = {
  item: ICommunityProgram
}
const HomeProgramItem = ({ item }: ProgramItemProps) => {
  const onClick = (slug: string) => {
    console.log('slug->', slug)
  }

  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Box
        sx={{
          cursor: 'pointer',
          borderRadius: 4,
          px: { xs: 3, sm: 4, md: 5 },
          py: { xs: 3, sm: 3.5, md: 4 },
          position: 'relative',
          overflow: 'hidden',
          transition: (theme) =>
            theme.transitions.create(['background-color', 'transform'], {
              duration: 450,
            }),
          backgroundColor: 'background.paper',
          '&:hover': {
            boxShadow: 2,
            transform: 'translateY(-4px)',
          },
        }}
        onClick={() => onClick(item.slug)}
      >
        {/* Status Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            backgroundColor: item.status === 'active' ? '#2e7d32' : '#ed6c02',
            color: '#fff',
          }}
        >
          {item.status === 'active' ? 'Aktif' : 'Segera'}
        </Box>

        <Box
          sx={{
            img: {
              height: { xs: 56, md: 64 },
              width: 'auto',
            },
            mb: { xs: 2, md: 3 },
          }}
        >
          <Image
            src={item.image as string}
            alt={item.title}
            width={100}
            height={100}
            style={{ width: 'auto', height: '100%' }}
          />
        </Box>
        <Typography
          component='h3'
          variant='h4'
          sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, mb: { xs: 1.5, md: 2 }, pr: { xs: 8, sm: 10 } }}
        >
          {item.title}
        </Typography>

        <Box sx={{ minHeight: { xs: 60, md: 70 }, overflow: 'hidden' }}>
          <Typography
            component='p'
            sx={{ color: 'text.secondary', fontSize: { xs: 14, md: 15 }, lineHeight: 1.6 }}
          >
            {item.description}
          </Typography>
        </Box>

        {/* Participants count */}
        {item.participants && (
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              {item.participants}
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              peserta
            </Typography>
          </Box>
        )}
      </Box>
    </Grid>
  )
}

const HomePrograms = () => {
  const { palette } = useTheme()
  return (
    <Box
      id='home-programs'
      component='section'
      sx={{
        width: '100%',
        pt: { xs: 8, md: 14 },
        pb: { xs: 6, md: 12 },
        position: 'relative',
        background: palette.mode === 'dark' 
          ? 'linear-gradient(165deg, #2d0017 0%, #4c0027 25%, #6b0a3f 50%, #4c0027 75%, #2d0017 100%)'
          : 'linear-gradient(165deg, #d81b60 0%, #e91e63 20%, #ec407a 40%, #f06292 60%, #e91e63 80%, #d81b60 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '60%',
          height: '200%',
          background: palette.mode === 'dark'
            ? 'radial-gradient(circle, rgba(152, 15, 90, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          transform: 'rotate(-15deg)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '50%',
          height: '150%',
          background: palette.mode === 'dark'
            ? 'radial-gradient(circle, rgba(236, 64, 122, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
          transform: 'rotate(25deg)',
          pointerEvents: 'none',
        },
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
          {communityPrograms.map((item) => (
            <HomeProgramItem item={item} key={item.id} />
          ))}
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
