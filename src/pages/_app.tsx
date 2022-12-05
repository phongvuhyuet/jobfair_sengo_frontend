import 'nprogress/nprogress.css'
import 'styles/globals.css'

import { createTheme, ThemeProvider } from '@mui/material'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ReactElement, ReactNode, useEffect } from 'react'
import { injectInstance } from 'src/common/axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const theme = createTheme({
  typography: {
    fontFamily: ['Be Vietnam', 'Roboto'].join(','),
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 200,
      fontStyle: 'italic',
    },
  },
  palette: {
    primary: { main: '#FF8E3C' },
    secondary: { main: '#6C757D' },
  },
})

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // nprogress
  injectInstance()
  NProgress.configure({ showSpinner: false })
  useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteDone)
    Router.events.on('routeChangeError', handleRouteDone)

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteDone)
      Router.events.off('routeChangeError', handleRouteDone)
    }
  }, [])

  const getLayout = Component.getLayout ?? (page => page)

  return getLayout(
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
