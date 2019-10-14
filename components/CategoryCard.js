import { string } from 'prop-types'
import SquareArticleImage from './SquareArticleImage'
import Link from './DataPrefetchLink'
import React from 'react'
import Fade from 'react-reveal/Fade'
import ReactHoverObserver from 'react-hover-observer'
import {asText} from '../utils/prismic'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

class CategoryCard extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string
  }

  defaultPropTypes = {
    showCategories: true
  }

  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    }
    this.onHoverChanged = this.onHoverChanged.bind(this);
  }

  onHoverChanged({ isHovering }) {
    console.log("hover")
    this.setState({
      isHovering
    });
  }
 
  render() {
    const {document: doc} = this.props;
    const {data} = doc;

    const image = data.image.url
    return <div>
      <Fade up distance="50px" delay={Math.random()*1000} duration={500}>
        <div className="relative h-full max-w-m rounded overflow-hidden no-underline">
          <ReactHoverObserver {...{
            className: 'catgory-card-hover-observer',
            onHoverChanged: this.onHoverChanged
          }}>
            <Link prefetch withData href={`/articles/categories?uid=${doc.uid}`} as={`/articles/categories/${doc.uid}`}>
              <a className="no-underline text-pink block">                
                {image && <SquareArticleImage 
                  alt={`{Card image for the ${asText(data.name)} category`} 
                  imageUrl={image} 
                  isHovering={this.state.isHovering} 
                  useImgix={true} />}
                <div className="px-6 py-4">
                  <div className="font-title font-bold text-xl mb-2 no-underline">
                    {asText(data.name)}
                  </div>
                  <div className="font-body font-light font-title text-grey mb-2 no-underline">{asText(data.description)}</div>                              
                </div>
              </a>
            </Link>
          </ReactHoverObserver>
        </div>
      </Fade>
    </div>
  }
}

export default CategoryCard
