import App, {Container} from 'next/app'
import React from 'react'
import Layout from '../layouts/main'
import NextHead from 'next/head'
import reactRevealConfig from 'react-reveal/globals'
import Router from 'next/router'
import { rehydrate, css } from 'glamor'
import glamorous from 'glamorous'
import htmlescape from 'htmlescape'
import theEnv from '../utils/env'
const { DEPLOYMENT_ID } = theEnv
const MAKELIGHT = '***'
const env = { DEPLOYMENT_ID, MAKELIGHT }

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  rehydrate(window.__NEXT_DATA__.ids)
}

reactRevealConfig({ ssrFadeout: true })

let IntersectionObserver

class MyApp extends App {
  constructor () {
    super()
    if (process.browser) {
      IntersectionObserver = require('intersection-observer')
    }
  }

  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render () {
    const {Component, pageProps, router} = this.props
    return <Container>
      <Layout router={router}>
        <NextHead>
          {process.env && <script
            dangerouslySetInnerHTML={{ __html: '__ENV__ = ' + htmlescape(env) }}
          />}
        </NextHead>
        <Component key={router.asPath} router={router} route={router.asPath} {...pageProps} />
      </Layout>
    </Container>
  }
}

export default MyApp
