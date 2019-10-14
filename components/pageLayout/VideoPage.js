import React, { Fragment } from 'react'
import PrismicConfig from '../../prismic.config.js'
import ErrorBoundary from '../ErrorBoundary'
import SliceList from '../SliceList'
import LargeTitle from '../LargeTitle'
import {RichText} from 'prismic-reactjs'
import CategoryAndDescription from '../CategoryAndDescription'

class VideoPage extends React.Component {
  render() {
    const props = this.props
    const doc = this.props.document
    const {data} = doc
    
    return (
      <div>
        <div className="py-4 p-4 bg-white max-w-md">
          <CategoryAndDescription category={data.category} showDescription={false} />
        </div>
        <div className="m-auto text-center px-4">
          <LargeTitle text={RichText.asText(data.title)} />
        </div>
        <div className="text-xl max-w-md m-auto px-4">
          <ErrorBoundary>
            <SliceList sliceZone={data.body} article={doc}></SliceList>
            <div className="some-breathing-room lg:h-6"></div>
          </ErrorBoundary>
        </div>
      </div>
    )
  }
}

export default VideoPage