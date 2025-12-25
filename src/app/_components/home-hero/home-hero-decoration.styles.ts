import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'
import {
  AnimationControls,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from 'framer-motion'

type AnimateDecoration = {
  sxRoot: SxProps<Theme>
  sxImgContainer: SxProps<Theme>
  initial: TargetAndTransition | VariantLabels | boolean
  animate: AnimationControls | TargetAndTransition | VariantLabels | boolean
  transition: Transition
  image: {
    imageUrl: string
    width: number
    height: number
  }
}

export const animatedDecorations: Array<AnimateDecoration> = [
  {
    sxRoot: {
      top: { xs: -20, md: -30 },
      right: { xs: 10, md: 40 },
    },
    sxImgContainer: {
      width: { xs: 100, sm: 200, md: 330 },
    },
    initial: { rotate: -20, opacity: 0, scale: 2, x: 200 },
    animate: { rotate: 0, opacity: 1, scale: 1, x: 0 },
    transition: {
      delay: 0.35,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/flowerpot.png',
      width: 550,
      height: 471,
    },
  },
  {
    sxRoot: {
      top: { xs: -10, md: 0 },
      left: { xs: -20, md: 0 },
    },
    sxImgContainer: {
      width: { xs: 80, sm: 180, md: 250 },
    },
    initial: { rotate: 10, opacity: 0, scale: 1.25, x: -100 },
    animate: { rotate: 0, opacity: 1, scale: 1, x: 0 },
    transition: {
      delay: 0.35,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/camera.png',
      width: 458,
      height: 309,
    },
  },
  {
    sxRoot: {
      left: { xs: 134, md: 234 },
      bottom: { xs: 172, md: 272 },
      transform: 'rotate(-45deg)',
    },
    sxImgContainer: {
      width: { xs: 20, md: 40 },
    },
    initial: { rotate: -50, opacity: 0, y: 400 },
    animate: { rotate: 0, opacity: 1, y: 0 },
    transition: {
      delay: 0.52,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/paperclip.png',
      width: 100,
      height: 90,
    },
  },
  {
    sxRoot: {
      left: { xs: 174, md: 274 },
      bottom: { xs: 136, md: 216 },
      transform: 'rotate(13deg)',
    },
    sxImgContainer: {
      width: { xs: 20, md: 40 },
    },
    initial: { rotate: -50, opacity: 0, y: 400 },
    animate: { rotate: 0, opacity: 1, y: 0 },
    transition: {
      delay: 0.52,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/paperclip.png',
      width: 100,
      height: 90,
    },
  },
  {
    sxRoot: {
      left: { xs: -60, md: -110 },
      bottom: { xs: -100, md: -160 },
    },
    sxImgContainer: {
      width: { xs: 180, sm: 380, md: 520 },
    },
    initial: { rotate: 0, opacity: 0, y: 300 },
    animate: { rotate: 0, opacity: 1, y: 0 },
    transition: {
      delay: 0.35,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/papers.png',
      width: 900,
      height: 1000,
    },
  },
  {
    sxRoot: {
      left: { xs: 170, md: 270 },
      bottom: { xs: 66, md: 106 },
    },
    sxImgContainer: {
      width: { xs: 60, sm: 100, md: 148 },
    },
    initial: { rotate: -50, opacity: 0, y: 400 },
    animate: { rotate: 0, opacity: 1, y: 0 },
    transition: {
      delay: 0.52,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/edding.png',
      width: 217,
      height: 320,
    },
  },
  {
    sxRoot: {
      bottom: { xs: -20, md: 0 },
      left: { xs: 60, md: 100 },
    },
    sxImgContainer: {
      width: { xs: 70, md: 200 },
    },
    initial: { rotate: -50, opacity: 0, y: 400 },
    animate: { rotate: 0, opacity: 1, y: 0 },
    transition: {
      delay: 0.48,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/marker.png',
      width: 200,
      height: 300,
    },
  },
  {
    sxRoot: {
      right: { xs: -40, md: -60 },
      bottom: { xs: -50, md: -84 },
    },
    sxImgContainer: {
      width: { xs: 150, sm: 320, md: 460 },
    },
    initial: { rotate: 0, opacity: 0, scale: 1.1, x: 200 },
    animate: { rotate: -32, opacity: 1, scale: 1, x: 0 },
    transition: {
      delay: 0.35,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/mac.png',
      width: 500,
      height: 480,
    },
  },
  {
    sxRoot: {
      bottom: { xs: -60, md: -90 },
      right: { xs: 180, sm: 240, md: 320 },
    },
    sxImgContainer: {
      width: { xs: 90, sm: 150, md: 206 },
    },
    initial: { rotate: 20, opacity: 0, scale: 1.1, x: 200 },
    animate: { rotate: -6, opacity: 1, scale: 1, x: 0 },
    transition: {
      delay: 0.2,
      type: 'spring',
      bounce: 0,
    },
    image: {
      imageUrl: '/images/hero/smartphone.png',
      width: 500,
      height: 500,
    },
  },
]
