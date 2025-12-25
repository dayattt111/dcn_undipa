import { JSX } from 'react'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

// configs
import { AppConfig } from '@/configs'

// components
// import AppBar from '@/components/appbar/app-bar'
import Footer from '@/components/footer/footer'
import FooterGithubBanner from '@/components/footer-github-banner'

// @mui provider
import MuiThemeProvider from '@/plugins/@mui/components/@mui-theme.provider'

// app context provider
import { AppContextProvider } from '@/contexts'

// global styles
import './globals.css'

const AppBar = dynamic(() => import('@/components/appbar/app-bar'), {
  loading: () => <div>Loading...</div>,
  ssr: !!false,
})

const plugJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(AppConfig.siteUrl),
  title: {
    default: AppConfig.appName,
    template: `%s | ${AppConfig.appName}`,
  },
  description: AppConfig.appDescription,
  keywords: AppConfig.keywords,
  authors: [{ name: AppConfig.appName }],
  creator: AppConfig.appName,
  publisher: AppConfig.appName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: AppConfig.siteUrl,
    title: AppConfig.appName,
    description: AppConfig.appDescription,
    siteName: AppConfig.appName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${AppConfig.appName} - ${AppConfig.appSlogan}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: AppConfig.appName,
    description: AppConfig.appDescription,
    images: ['/twitter-image.png'],
    creator: '@dcn_undipa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'google-site-verification': 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <html lang='id' suppressHydrationWarning>
      <body className={plugJakartaSans.variable} suppressHydrationWarning>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <AppContextProvider>
            <MuiThemeProvider>
              <AppBar />
              {children}
              <Footer />
              <FooterGithubBanner />
            </MuiThemeProvider>
          </AppContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
