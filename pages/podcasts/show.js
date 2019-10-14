import React from 'react'
import Podcast from '../../components/Podcast'
import SliceList from '../../components/SliceList'
import PodcastCardList from '../../components/PodcastCardList'
import AnimatedHero from '../../components/AnimatedHero'
import Fade from 'react-reveal/Fade'
import ErrorBoundary from '../../components/ErrorBoundary'

import { Predicates } from 'prismic-javascript'
import PrismicConfig from '../../prismic.config.js'

class PodcastShow extends React.Component {
  static async getInitialProps ({ req, query }) {
    const api = await PrismicConfig.getApi()
    const article = await api.query([
      Predicates.at('my.podcast_episode.simplecast_shortcode', query.uid),
      Predicates.at('document.type', 'podcast_episode')
    ])
      .catch(err => console.log('Error loading article', err))
    console.log('article', article)
    const individualEpisode = await fetch(`https://www.makelight.com/podcasts/${query.uid}.json`)
    const episode = await individualEpisode.json()
    console.log(episode)
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

    return { article: article.results[0], episode: episode.episode, podcasts: json, error }
  }

  render () {
    const {article, podcasts, episode, error} = this.props
    return <div>
      <ErrorBoundary>

        <div className='lg:flex'>
          <div className='lg:flex-1'>
            <div className='max-w-md m-auto px-4'>
              <AnimatedHero
                title='Makefulness'
                subtitle='The Makelight podcast with Emily Quinton'
              />

              <Fade delay={900}>
                <div className='p-4 text-center max-w-m'>
                  <h1 className='font-light leading-none pb-8'>{episode.title}</h1>
                  <p className='font-normal'>{episode.description}</p>
                </div>
              </Fade>

              <Fade delay={500}>
                <div className='p-8 text-center max-w-md m-auto'>
                  <a
                    className='bg-pink text-white px-6 py-4 mx-1 no-underline'
                    href='https://itunes.apple.com/gb/podcast/makefulness/id1268275889'>Follow on iTunes</a>
                  <a
                    className='bg-teal text-white px-6 py-4 mx-1 no-underline'
                    href='https://makelight.com/feeds/makefulness'>RSS feed</a>
                </div>
              </Fade>
            </div>
          </div>
          <div className='lg:flex-1'>
            <Podcast episode={episode} />
          </div>
        </div>

        <div className='m-auto max-w-lg px-4 py-8'>
          <iframe
            frameBorder='0'
            height='200px'
            scrolling='no'
            seamless
            src={`https://embed.simplecast.com/${episode.sharing_url.split('/').pop()}?color=eeaaaa`}
            width='100%' />
        </div>

        {article &&
          <div className='max-w-lg m-auto'>
            <SliceList sliceZone={article.data.body} article={article} />
          </div>
        }

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
      </ErrorBoundary>

    </div>
  }
}

export default PodcastShow
