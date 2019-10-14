import React from 'react'
import Router from 'next/router'

import { getUserFromServerCookie, getUserFromLocalCookie } from '../utils/auth'

export default Page => class DefaultPage extends React.Component {
  static async getInitialProps(ctx) {
    const currentUser = process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(ctx.req)
    
    let pageProps = {}
    if(Page.getInitialProps) {
      pageProps = await Page.getInitialProps(ctx)
    }
    return {
      ...pageProps,
      currentUser,
      currentUrl: ctx.pathname,
      isAuthenticated: !!currentUser
    }
  }

  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout(event) {
    if (event.key === 'logout') {
      Router.push(`/?logout=${event.newValue}`)
    }
  }

  componentDidMount() {
    window.addEventListener('storage', this.logout, false)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.logout, false)
  }

  render() {
    return (
      <Page {...this.props} />
    )
  }
}