import { object } from 'prop-types'
import PrismicDOM from 'prismic-dom'
import React, { Fragment } from 'react'
import PrismicConfig from '../../prismic.config.js'
import {RichText, Date} from 'prismic-reactjs'
import ErrorBoundary from '../ErrorBoundary'
import htmlSerializer from './htmlSerializer'
import PrismicRichText from 'prismic-richtext';

class SliceText extends React.Component {
  static propTypes = {
    slice: object
  }

  render() {
    const renderedHtml = PrismicDOM.RichText.asHtml(this.props.slice.value, PrismicConfig.linkResolver)
    return <Fragment>
        <div className="max-w-lg m-auto p-4 bg-white text-base md:text-l lg:text-xl" dangerouslySetInnerHTML={{__html: renderedHtml}}></div>
        <style jsx global>{`
          .text-base a {
            color: ${this.props.color || 'auto'};
          }
        `}</style>     
      </Fragment>
  }
}

export default SliceText

