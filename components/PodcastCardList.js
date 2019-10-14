import { string, bool, array } from 'prop-types'
import PodcastCard from '../components/PodcastCard'
import React, { Fragment } from 'react'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

class PodcastCardList extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string,
    podcasts: array
  }

  defaultPropTypes = {
    showCategories: true
  }
  render () {
    const props = this.props
    return <div>
      <section className="card-container">
        {props.podcasts.map((podcast) => 
          <PodcastCard key={podcast.id} document={podcast}></PodcastCard>
        )}
      </section>
      <style jsx>{`

        .card-container {
            display: grid;
            padding: 1rem;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-gap: 2rem;
        }
        `}</style>
    </div>
  }
}

export default PodcastCardList
