import { string } from 'prop-types'
import {RichText, Date} from 'prismic-reactjs'
import SquareArticleImage from './SquareArticleImage'
import Link from 'next/link'
import React, { Fragment } from 'react'
import SliceList from './SliceList'
import Fade from 'react-reveal/Fade';
import css from 'styled-jsx/css'
import PageHead from './PageHead'
import Sticky from 'react-sticky-el'
import PrismicConfig from '../prismic.config.js'
import ErrorBoundary from './ErrorBoundary'
import FacebookLike from './FacebookLike'
import LessonProgress from './LessonProgress'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

const styles = css`

  @media (min-width: 576px) {

  }

  @media (min-width: 992px) {
  }

  @media (min-width: 1200px) {

    .coloured-image {
      grid-column: 1;
      grid-row: 1;
    }
    .article-container {
      display: grid;
      padding: 1rem;
      grid-template-columns: [imagery] minmax(200px, 2fr) minmax(48em, 1fr) 1fr;
      grid-gap: 1rem;
      margin-left: 0rem;
      margin-right: 0rem;
    }
    .article-content {
      display: grid;
      padding: 1rem;
      grid-template-rows: 2f 1fr;
      grid-row: 1 / span 2;
      grid-column: 2;
      grid-gap: 1rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .pinterest-sharing {
      grid-column: 1;
      grid-row: 2;
    }

  }
`

class Lesson extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string
  }

  render() {
    const {lessons, course} = this.props
    const doc = this.props.document;
    const {data} = doc;

    const image = data.image
    
    return (
      <div>
        <PageHead title={RichText.asText(data.title)}></PageHead>
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="lg:flex">                            
            <div className="w-full">
              <div className="block lg:flex xl:flex items-center">                
                <div className="flex-1 px-4 text-center">
                  {data.course && data.course.uid && 
                      <div className="py-4">
                        <div className="font-title font-regular text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-2xl text-grey-darkest mb-2 no-underline leading-tight">
                          <Fade bottom distance="50px">
                            <Link href={`/courses/show?uid=${data.course.uid}`} as={`/courses/${data.course.uid}`}>
                              <a className="no-underline">{`${RichText.asText(course.data.title)}` }</a>
                            </Link>
                          </Fade>
                        </div>
                      </div>
                    }
                  <div className="font-title font-regular text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-grey-darkest mb-2 no-underline leading-tight px-4">
                    <Fade bottom distance="50px">{RichText.asText(data.title)}</Fade>
                  </div>
                </div>

                <div className="flex-1 max-h-screen max-w- ">
                  {image && image.url && <SquareArticleImage 
                      imageUrl={image.url} 
                      imageWidth={image.dimensions ? image.dimensions.width : 100} 
                      imageHeight={image.dimensions ? image.dimensions.height : 100} 
                      color={data.color} />}
                </div>                
              </div>                          
            </div>            
          </div>
        </div>
        <div className="bg-white lg:bg-grey-lighter">
          <div className="max-w-lg px-4 mt-8 m-auto">
            <ErrorBoundary>
              <SliceList sliceZone={data.body} article={doc}></SliceList>
              <div className="some-breathing-room lg:h-6"></div>
            </ErrorBoundary>
          </div>  
        </div>

        <style jsx>{styles}</style>  
      </div>
    )
  }
}

export default Lesson
