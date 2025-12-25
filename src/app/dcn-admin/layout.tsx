'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// Emoji icons as components
const DashboardIcon = () => <span>📊</span>
const SchoolIcon = () => <span>📚</span>
const WorkIcon = () => <span>💼</span>
const FolderIcon = () => <span>📁</span>
const LeaderboardIcon = () => <span>🏆</span>
const SettingsIcon = () => <span>⚙️</span>
const MenuIcon = () => <span>☰</span>
const LogoutIcon = () => <span>🚪</span>
const HomeIcon = () => <span>🏠</span>

const DRAWER_WIDTH = 260

const menuItems = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/dcn-admin' },
  { title: 'Programs', icon: <SchoolIcon />, path: '/dcn-admin/programs' },
  { title: 'Portfolio', icon: <FolderIcon />, path: '/dcn-admin/portfolio' },
  { title: 'Career', icon: <WorkIcon />, path: '/dcn-admin/career' },
  { title: 'Leaderboard', icon: <LeaderboardIcon />, path: '/dcn-admin/leaderboard' },
  { title: 'Settings', icon: <SettingsIcon />, path: '/dcn-admin/settings' },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/check')
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
      if (!data.authenticated && pathname !== '/dcn-admin/login') {
        router.push('/dcn-admin/login')
      }
    } catch {
      setIsAuthenticated(false)
      router.push('/dcn-admin/login')
    }
  }, [pathname, router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/dcn-admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    )
  }

  // Show login page without layout
  if (!isAuthenticated && pathname === '/dcn-admin/login') {
    return <>{children}</>
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null
  }

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{
            background: 'linear-gradient(135deg, #980f5a 0%, #4c0027 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          DCN Admin
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Panel Management
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => {
                router.push(item.path)
                if (isMobile) setMobileOpen(false)
              }}
              selected={pathname === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={() => router.push('/')}
          sx={{ mb: 1 }}
        >
          Kembali ke Website
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar for mobile */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
          display: { md: 'none' },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="text.primary" fontWeight={700}>
            DCN Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: '64px', md: 0 },
          bgcolor: theme.palette.mode === 'dark' ? 'background.default' : '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
