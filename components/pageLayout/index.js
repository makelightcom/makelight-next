import React, { Fragment } from 'react'
//import InterstitialPage from './InterstitialPage'
import VideoPage from './VideoPage'
import FullPageHeader from './FullPageHeader'

const pageLayouts = {
  //'interstitial': InterstitialPage,
  'video': VideoPage,
  'full': FullPageHeader
}

class PageLayout extends React.Component {
  render() {
    const Layout = pageLayouts[this.props.layout]
    const props = this.props
    if(!Layout) {
      return null
    }
    return <Layout {...props}>{this.props.children}</Layout>
  }
}

export default PageLayout