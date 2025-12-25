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
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

import { portfolioProjects } from '@/constants/portfolio'
import { IPortfolioProject } from '@/types/portfolio'

type CategoryFilter = 'all' | IPortfolioProject['category']

const categoryLabels: Record<CategoryFilter, string> = {
  all: 'Semua Project',
  web: 'Web Development',
  mobile: 'Mobile Apps',
  ml: 'Machine Learning',
  cloud: 'Cloud Computing',
  game: 'Game Development',
  other: 'Lainnya',
}

const categoryIcons: Record<CategoryFilter, string> = {
  all: '🎯',
  web: '🌐',
  mobile: '📱',
  ml: '🤖',
  cloud: '☁️',
  game: '🎮',
  other: '💡',
}

const ProjectCard = ({ project }: { project: IPortfolioProject }) => {
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 12px 40px rgba(152, 15, 90, 0.25)'
                : '0 12px 40px rgba(152, 15, 90, 0.15)',
          },
        }}
      >
        {/* Project Image */}
        <CardMedia
          sx={{
            height: 200,
            position: 'relative',
            backgroundColor: 'background.default',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(152, 15, 90, 0.3) 0%, rgba(76, 0, 39, 0.3) 100%)'
                  : 'linear-gradient(135deg, rgba(152, 15, 90, 0.1) 0%, rgba(255, 245, 248, 0.5) 100%)',
            }}
          >
            <Typography variant="h4" sx={{ opacity: 0.3 }}>
              {categoryIcons[project.category]}
            </Typography>
          </Box>
          <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
            <Chip
              label={categoryLabels[project.category]}
              size="small"
              sx={{
                fontWeight: 600,
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.7)'
                    : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            />
          </Box>
        </CardMedia>

        <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
          {/* Project Title */}
          <Typography
            variant="h5"
            component="h3"
            sx={{
              mb: 1.5,
              fontWeight: 700,
              fontSize: { xs: 18, md: 20 },
              lineHeight: 1.3,
            }}
          >
            {project.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 60,
            }}
          >
            {project.description}
          </Typography>

          {/* Tech Stack */}
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {project.techStack.slice(0, 4).map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                size="small"
                sx={{
                  fontSize: 10,
                  height: 20,
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(152, 15, 90, 0.15)'
                      : 'rgba(152, 15, 90, 0.08)',
                  color: 'primary.main',
                }}
              />
            ))}
            {project.techStack.length > 4 && (
              <Chip
                label={`+${project.techStack.length - 4}`}
                size="small"
                sx={{
                  fontSize: 10,
                  height: 20,
                  backgroundColor:
                    theme.palette.mode === 'dark'
                      ? 'rgba(152, 15, 90, 0.15)'
                      : 'rgba(152, 15, 90, 0.08)',
                  color: 'primary.main',
                }}
              />
            )}
          </Box>

          {/* Creator Info */}
          <Box
            sx={{
              mt: 'auto',
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                src={project.creator.avatar}
                alt={project.creator.name}
                sx={{ width: 32, height: 32 }}
              >
                {project.creator.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                  {project.creator.name}
                </Typography>
                {project.creator.role && (
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                    {project.creator.role}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {project.creator.github && (
                <Tooltip title="GitHub">
                  <IconButton
                    size="small"
                    href={project.creator.github}
                    target="_blank"
                    sx={{ color: 'text.secondary' }}
                  >
                    <Typography sx={{ fontSize: 16 }}>🔗</Typography>
                  </IconButton>
                </Tooltip>
              )}
              {project.links.demo && (
                <Tooltip title="Live Demo">
                  <IconButton
                    size="small"
                    href={project.links.demo}
                    target="_blank"
                    sx={{ color: 'primary.main' }}
                  >
                    <Typography sx={{ fontSize: 16 }}>🚀</Typography>
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          {/* View Details Button */}
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              textTransform: 'none',
              fontWeight: 600,
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'rgba(152, 15, 90, 0.05)',
              },
            }}
            href={`/portfolio/${project.slug}`}
          >
            Lihat Detail
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function PortfolioPageContent() {
  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all')

  const filteredProjects =
    selectedCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === selectedCategory)

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
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Chip
              label="PORTFOLIO KOMUNITAS"
              sx={{
                mb: 3,
                px: 2,
                py: 0.5,
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(152, 15, 90, 0.2)'
                    : 'rgba(152, 15, 90, 0.1)',
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
              variant="h1"
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
              Portfolio Projects
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: 16, md: 18 },
              }}
            >
              Showcase karya terbaik dari anggota komunitas. Dari web apps, mobile apps,
              hingga machine learning projects yang menginspirasi.
            </Typography>
          </motion.div>
        </Box>

        {/* Category Filter Tabs */}
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
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
            {(Object.keys(categoryLabels) as CategoryFilter[]).map((cat) => (
              <Tab
                key={cat}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{categoryIcons[cat]}</span>
                    <span>{categoryLabels[cat]}</span>
                  </Box>
                }
                value={cat}
              />
            ))}
          </Tabs>
        </Box>

        {/* Stats */}
        <Box
          sx={{
            mb: 6,
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {filteredProjects.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Projects
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {new Set(filteredProjects.map((p) => p.creator.name)).size}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Contributors
            </Typography>
          </Box>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Belum ada project untuk kategori ini
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
            borderColor:
              theme.palette.mode === 'dark'
                ? 'rgba(152, 15, 90, 0.3)'
                : 'rgba(152, 15, 90, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: 24, md: 32 },
            }}
          >
            Punya Project Keren?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.7 }}
          >
            Showcase projectmu di sini! Submit project terbaikmu dan inspirasi ribuan
            developer lainnya di komunitas DCN UNDIPA.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
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
              Submit Project
            </Button>
            <Button
              variant="outlined"
              size="large"
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
              Lihat Panduan
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
