import React, { Fragment } from 'react'
import PageLayout from './pageLayout'
import PageHead from './PageHead'
import {RichText, Date} from 'prismic-reactjs'
import ImgixClient from 'imgix-core-js'

class Article extends React.Component {
  render () {
    const props = this.props
    const doc = this.props.document
    const {data} = doc
    const image = data.image.url

    const contentTypes = data.body.map((i) => {
      return i.slice_type
    }).unique()

    let layout = 'full'

    if(contentTypes.includes('vimeo') || contentTypes.includes('youtube') ) {
      layout = 'video'
    }

    let og = {
      "og:type": "article",
      "og:url": `https://makelight.com/articles/${props.document.uid}`,
      "article:published_time": doc.first_publication_date,
    }

    if(data.author && data.author.data) {
      og["article:author"] = RichText.asText(data.author.data.name)
    }

    return (
      <Fragment>
        <PageHead title={RichText.asText(data.title)} ogImage={image} og={og} />
        <PageLayout layout={layout} {...props}>
          
        </PageLayout>
      </Fragment>
    )
  }
}
export default Article
