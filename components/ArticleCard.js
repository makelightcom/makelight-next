import { string, bool } from 'prop-types'
import SquareArticleImage from './SquareArticleImage'
import Link from './DataPrefetchLink'
import React, { Fragment } from 'react'
import PrismicDOM from 'prismic-dom'
import PrismicConfig from '../prismic.config.js'
import ArticleContentIcons from './ArticleContentIcons'
import ReactHoverObserver from 'react-hover-observer'
import Fade from 'react-reveal/Fade'
import truncate from 'truncate'
import {asText} from '../utils/prismic'

class ArticleCard extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string,
    showCategories: bool,
    renderImageServerSide: bool
  }

  static defaultPropTypes = {
    showCategories: true,
    renderImageServerSide: false
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
    })
  }
 
  render() {
    const {document: doc, renderImageServerSide} = this.props;
    const {data} = doc;

    const image = data.image ? data.image.url : null
    const isHovering = this.state.isHovering || false
    return (  
      <Fade bottom distance='64px'>
      <div className="relative h-full max-w-m lg:rounded overflow-hidden no-underline">
        <div className="absolute pin-r pin-t p-4 z-50">
          
        </div>
        
        <ReactHoverObserver {...{
          className: 'article-card-hover-observer',
          onHoverChanged: this.onHoverChanged
        }}>                      
          <Link prefetch withData href={`/articles?uid=${doc.uid}`} as={`/articles/${doc.uid}`}>
            <a aria-label={`Read more about ${asText(data.title)}`} href={`/articles/${doc.uid}`} className="no-underline text-pink block">                
              {image && <SquareArticleImage 
                renderImageServerSide={renderImageServerSide} 
                alt={`Article card image for ${asText(data.title)}`} 
                nopin={true} useImgix={true} 
                imageUrl={image} 
                isHovering={isHovering}/>}
            </a>
          </Link>
          <div className="px-6 py-4 bg-white">                
            <Link href={`/articles?uid=${doc.uid}`} as={`/articles/${doc.uid}`}>
              <a href={`/articles/${doc.uid}`} className="font-title font-bold text-xl mb-2 no-underline hover:text-grey-darker">    
                {asText(data.title)}
              </a>
            </Link>
            
            <div className="font-body font-light font-title text-grey mb-2 no-underline">
              {truncate(asText(data.description), 255)}</div>                              

            <div className="mb-2 pt-2">
              
              {this.props.showCategories && data.category && data.category.data &&
                <Link prefetch withData href={`/articles/categories?uid=${data.category.uid}`} as={`/articles/categories/${data.category.uid}`}>
                  <a aria-label={`More articles in ${asText(data.category.data.name)}`} href={`/articles/categories/${data.category.uid}`} className="no-underline font-body inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey mr-2 hover:text-pink">{asText(data.category.data.name)}</a>
                </Link>
              }
              <span className="pa-2">
                <ArticleContentIcons article={doc} />
              </span>
            </div>
          </div>            
        </ReactHoverObserver>
      </div>
      </Fade>
    )
  }
}

export default ArticleCard
