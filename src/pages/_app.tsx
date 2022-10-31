import 'nprogress/nprogress.css'
import 'styles/globals.css'

import { createTheme, ThemeProvider } from '@mui/material'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { ReactElement, ReactNode, useEffect } from 'react'
import { injectInstance } from 'src/common/axios'
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const theme = createTheme({
  palette: {
    primary: { main: '#FF8E3C' },
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
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
