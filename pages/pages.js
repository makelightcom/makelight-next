import React from 'react'
import PrismicConfig from '../prismic.config.js'
import {asText} from '../utils/prismic'
import ErrorBoundary from '../components/ErrorBoundary'
import SliceList from '../components/SliceList'
import Hero from '../components/hero'

class Pages extends React.Component {
  static async getInitialProps ({ req, query }) {
    const api = await PrismicConfig.getApi()
    const page = await api.getByUID('page', query.uid)
      .catch(err => console.log(err))
    return { page }
  }

  render () {
    const {page} = this.props

    if (!page) {
      return <div className='max-w-md m-auto text-center py-6 px-2'><h1>Sorry - couldn't find that page</h1></div>
    }

    const {data} = page
    return <div>
      <Hero title={asText(page.data.title)} />
      <ErrorBoundary>
        <div className='max-w-md m-auto'>
          <SliceList sliceZone={data.body} article={page} />
        </div>
        <div className='some-breathing-room lg:h-6' />
      </ErrorBoundary>
    </div>
  }
}

export default Pages
