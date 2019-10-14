import React, {Fragment} from 'react'
import Fade from 'react-reveal/Fade'
import Link from 'next/link'
import {RichText} from 'prismic-reactjs'

export default class CategoryAndDescription extends React.Component {
  static defaultProps = {
    showDescription: true
  }

  render () {
    const {category, showDescription} = this.props
    if(!category) {
      return <div />
    }
    return (  
    
      <Fragment>
        {category && category.uid && 
          <div>
            <div className="font-sans font-regular text-xl xs:text-xl sm:text-xl md:text-xl lg:text-xl text-grey-darkest mb-2 no-underline leading-tight">
              <Fade 
                bottom 
                distance="50px" 
                delay={100}>
                <Link 
                  href={`/articles/categories?uid=${category.uid}`} 
                  as={`/articles/categories/${category.uid}`}>
                  <a className="no-underline">{`${RichText.asText(category.data.name)} /` }</a>
                </Link>
              </Fade>
            </div>
            {showDescription && category.data.description && 
              <div className="font-light font-title font-regular text-xl text-grey mb-2 no-underline leading-tight tracking-wide">
                <Fade bottom distance="50px" delay={200}>{RichText.asText(category.data.description)}</Fade>
              </div>
            }
          </div>
        }
      </Fragment>
    )
  }
}