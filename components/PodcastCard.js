import { string, bool } from 'prop-types'
import {RichText, Date} from 'prismic-reactjs'
import SquareArticleImage from './SquareArticleImage'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import PrismicDOM from 'prismic-dom'
import PrismicConfig from '../prismic.config.js'
import ArticleContentIcons from './ArticleContentIcons'
import ReactHoverObserver from 'react-hover-observer'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

class PodcastCard extends React.Component {
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

  state = {
    isHovering: false
  }

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    }
    this.onHoverChanged = this.onHoverChanged.bind(this);
  }

  onHoverChanged({ isHovering }) {
    this.setState({
      isHovering
    });
  }

  render() {
    const {document: data} = this.props;
    const image = data.images.large
    const slug = data.sharing_url.split('/').pop()
    return <div>
      <Fade up distance="50px" delay={Math.random()*1000} duration={500}>
        <div className="relative h-full max-w-m rounded overflow-hidden no-underline">          
          <ReactHoverObserver {...{
            className: 'article-card-hover-observer',
            onHoverChanged: this.onHoverChanged
          }}> 
            <Link href={`/podcasts/show?uid=${slug}`} as={`/podcasts/${slug}`}>
              <a className="no-underline text-pink">
                {image && <SquareArticleImage imageUrl={image} useImgix={true} isHovering={this.state.isHovering} /> }
                <div className="px-6 py-4">
                  <div className="font-title font-bold text-xl mb-2 no-underline">
                    {data.title}
                  </div>
                  <div className="font-body font-light font-title text-grey mb-2 no-underline">{data.description}</div>                                
                </div>
              </a>
            </Link>
          </ReactHoverObserver>
        </div>
      </Fade>
    </div>
  }
}

export default PodcastCard
