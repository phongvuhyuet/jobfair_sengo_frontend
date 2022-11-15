import Head from 'next/head'
import { FC, ReactNode } from 'react'

interface IProps {
  title?: string
  keepMetaData?: boolean
  children?: ReactNode
}

const defaultSiteTitle = 'Senkou'

/**
 * Usage note
 *
 * If `children` existed, should add `keepMetaData` to make the default meta is
 * present.
 */
const MetaData: FC<IProps> = ({ title, children, keepMetaData }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="author" content="Senkou" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

      <title>{title || defaultSiteTitle}</title>

      <meta name="description" content="Senkou" />
      <meta name="keywords" content="Senkou" />
      <meta property="og:title" content={title || defaultSiteTitle} />
      <meta property="og:url" content="" />
      <meta property="og:description" content="Senkou" />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default MetaData
