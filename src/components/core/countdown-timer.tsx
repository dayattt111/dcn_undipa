'use client'

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

interface CountdownTimerProps {
  deadline: string // ISO date string
  onExpired?: () => void
  size?: 'small' | 'medium' | 'large'
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

const calculateTimeLeft = (deadline: string): TimeLeft => {
  // Parse deadline and convert to WIB (GMT+7)
  const deadlineDate = new Date(deadline)
  const now = new Date()
  
  // Convert to WIB timezone (UTC+7)
  const wibOffset = 7 * 60 * 60 * 1000 // 7 hours in milliseconds
  const nowWIB = new Date(now.getTime() + wibOffset)
  const deadlineWIB = new Date(deadlineDate.getTime() + wibOffset)
  
  const difference = deadlineWIB.getTime() - nowWIB.getTime()

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  }
}

export default function CountdownTimer({
  deadline,
  onExpired,
  size = 'medium',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(deadline))

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(deadline)
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.isExpired && onExpired) {
        onExpired()
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline, onExpired])

  if (timeLeft.isExpired) {
    return (
      <Chip
        label='Pendaftaran Ditutup'
        color='default'
        size={size === 'large' ? 'medium' : 'small'}
        sx={{
          fontWeight: 600,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
      />
    )
  }

  const fontSize = {
    small: { number: 14, label: 10 },
    medium: { number: 18, label: 11 },
    large: { number: 24, label: 12 },
  }[size]

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: size === 'large' ? 2 : 1,
      }}
    >
      {timeLeft.days > 0 && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: fontSize.number,
              fontWeight: 700,
              lineHeight: 1,
              color: 'primary.main',
            }}
          >
            {timeLeft.days}
          </Typography>
          <Typography
            sx={{
              fontSize: fontSize.label,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            Hari
          </Typography>
        </Box>
      )}
      
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: fontSize.number,
            fontWeight: 700,
            lineHeight: 1,
            color: 'primary.main',
          }}
        >
          {String(timeLeft.hours).padStart(2, '0')}
        </Typography>
        <Typography
          sx={{
            fontSize: fontSize.label,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Jam
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: fontSize.number,
          fontWeight: 700,
          color: 'text.secondary',
        }}
      >
        :
      </Typography>

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: fontSize.number,
            fontWeight: 700,
            lineHeight: 1,
            color: 'primary.main',
          }}
        >
          {String(timeLeft.minutes).padStart(2, '0')}
        </Typography>
        <Typography
          sx={{
            fontSize: fontSize.label,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Menit
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: fontSize.number,
          fontWeight: 700,
          color: 'text.secondary',
        }}
      >
        :
      </Typography>

      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: fontSize.number,
            fontWeight: 700,
            lineHeight: 1,
            color: 'primary.main',
          }}
        >
          {String(timeLeft.seconds).padStart(2, '0')}
        </Typography>
        <Typography
          sx={{
            fontSize: fontSize.label,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          Detik
        </Typography>
      </Box>
    </Box>
  )
}
