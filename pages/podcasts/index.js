import PageHead from '../../components/PageHead'
import AnimatedHero from '../../components/AnimatedHero'
import React, { Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import PodcastCardList from '../../components/PodcastCardList'

class Podcasts extends React.Component {
  static async getInitialProps ({ req, query }) {
    let error
    let json
    const res = await fetch('https://www.makelight.com/podcasts.json').catch((ex) => {
      console.error(ex)
      error = ex
    })
    if (error) {
      return { error: error }
    } else {
      json = await res.json()
    }
    return { podcasts: json, error: error }
  }

  render () {
    const {podcasts, error} = this.props
    return (<div>
      <PageHead title='The Makelight Podcast' />

      <AnimatedHero title='Makefulness' description='The Makelight Podcast with Emily Quinton' />

      <div className='max-w-xl m-auto'>
        {error &&
          <div className='mw-sm p-4 shadow'>
            <h2>Sorry, loading failed</h2>
            <p className='font-body'>{error.message}</p>
          </div>
        }
        {podcasts &&
          <PodcastCardList podcasts={podcasts} />
        }
      </div>
    </div>
    )
  }
}

export default Podcasts
