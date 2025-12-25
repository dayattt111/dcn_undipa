import { JSX } from 'react'
import dynamic from 'next/dynamic'

// components
import Stack from '@mui/material/Stack'
import PageLoader from '@/components/section-loader'

const HomeHero = dynamic(() => import('./_components/home-hero'), {
  loading: () => <PageLoader />,
})
const HomeAbout = dynamic(() => import('./_components/home-about'), {
  loading: () => <PageLoader />,
})
const HomeLeaderboard = dynamic(() => import('./_components/home-leaderboard'), {
  loading: () => <PageLoader />,
})
const HomeStats = dynamic(() => import('./_components/home-stats'), {
  loading: () => <PageLoader />,
})
const HomePrograms = dynamic(() => import('./_components/home-programs'), {
  loading: () => <PageLoader />,
})
const HomePortfolio = dynamic(() => import('./_components/home-portfolio'), {
  loading: () => <PageLoader />,
})
const HomeCareer = dynamic(() => import('./_components/home-career'), {
  loading: () => <PageLoader />,
})
const HomeCTA = dynamic(() => import('./_components/home-cta'), {
  loading: () => <PageLoader />,
})

const HomePage = (): JSX.Element => {
  return (
    <Stack component='main' direction='column'>
      <HomeHero />
      <HomeAbout />
      <HomeLeaderboard />
      <HomeStats />
      <HomePrograms />
      <HomePortfolio />
      <HomeCareer />
      <HomeCTA />
    </Stack>
  )
}

export default HomePage
