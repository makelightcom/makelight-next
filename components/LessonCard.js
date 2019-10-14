import { string, bool } from 'prop-types'
import {RichText, Date} from 'prismic-reactjs'
import SquareArticleImage from './SquareArticleImage'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import PrismicDOM from 'prismic-dom'
import PrismicConfig from '../prismic.config.js'
import ArticleContentIcons from './ArticleContentIcons'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

class LessonCard extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string,
    showCategories: bool
  }

  defaultPropTypes = {
    showCategories: true
  }

  render() {
    const {document: doc, link} = this.props;
    const {data} = doc;

    const image = data.image.url
    const child = (
      <div>
        {image && <SquareArticleImage imageUrl={image} nopin={true} />}
        <div className="px-6 py-4">
          <div className="font-title font-bold text-xl mb-2 no-underline">
            {RichText.asText(data.title)}
            <ArticleContentIcons article={doc} />
          </div>
          <div className="font-body font-light font-title text-grey mb-2 no-underline">
            {RichText.asText(data.description)}
          </div>                                
        </div>
      </div>
    )
    return <div>
      <Fade up distance="50px" delay={Math.random()*1000} duration={500}>
        <div className="relative h-full max-w-m rounded overflow-hidden no-underline">          
          {link && 
            <Link href={`/lessons/show?uid=${doc.uid}`} as={`/lessons/${doc.uid}`}>
              <a className="no-underline text-pink">
                {child}
              </a>
            </Link>
          }
          {(!link) && 
            <div>{child}</div>
          }
        </div>
      </Fade>
    </div>
  }
}

export default LessonCard
