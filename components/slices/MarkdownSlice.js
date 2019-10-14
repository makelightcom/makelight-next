import { object } from 'prop-types'
import PrismicDOM from 'prismic-dom'
import React, { Fragment } from 'react'
import PrismicConfig from '../../prismic.config.js'
import {RichText, Date} from 'prismic-reactjs'
import {markdown} from 'markdown'
import PrismicRichText from 'prismic-richtext';

class MarkdownSlice extends React.Component {
  static propTypes = {
    slice: object
  }

  render() {
    return <div className="text-base md:text-l lg:text-xl" dangerouslySetInnerHTML={{__html: markdown.toHTML(this.props.slice.value)}}></div>
  }
}

export default MarkdownSlice

