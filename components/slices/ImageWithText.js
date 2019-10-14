import { object } from 'prop-types'
import PrismicDOM from 'prismic-dom'
import React, { Fragment } from 'react'
import PrismicConfig from '../../prismic.config.js'
import {RichText, Date} from 'prismic-reactjs'
import ErrorBoundary from '../ErrorBoundary'
import htmlSerializer from './htmlSerializer'
import PrismicRichText from 'prismic-richtext';
import ArticleImage from '../ArticleImage'

class ImageWithText extends React.Component {
  static propTypes = {
    slice: object
  }

  render() {
    //return <div></div>
    const renderedHtml = PrismicDOM.RichText.asHtml(this.props.slice.value[0].caption, PrismicConfig.linkResolver)
    const image = this.props.slice.value[0].image

    return <div className="flex max-w-xl m-auto">
        
        <div className="flex-1">
          <div className="p-4">
            {image && image.url && <ArticleImage 
              imageUrl={image.url} 
              imageWidth={image.dimensions ? image.dimensions.width : 100} 
              imageHeight={image.dimensions ? image.dimensions.height : 100} />}
            </div>
        </div>
        <div className="flex-1">
          <div className="p-4 bg-white -m-4 text-base md:text-l lg:text-xl" dangerouslySetInnerHTML={{__html: renderedHtml}}></div>
        </div>
        <style jsx global>{`
          .text-base a {
            color: ${this.props.color || 'auto'};
          }
        `}</style>     
      </div>
  }
}

export default ImageWithText

