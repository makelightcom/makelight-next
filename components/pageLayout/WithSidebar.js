import { string } from 'prop-types'
import {RichText, Date} from 'prismic-reactjs'
import ArticleImage from '../ArticleImage'
import Link from 'next/link'
import React, { Fragment } from 'react'
import SliceList from '../SliceList'
import Fade from 'react-reveal/Fade';
import css from 'styled-jsx/css'
import PageHead from '../PageHead'
import StickyOnDesktop from '../StickyOnDesktop'
import PrismicConfig from '../../prismic.config.js'
import ErrorBoundary from '../ErrorBoundary'
import glamorous from 'glamorous'
import ImgixClient from 'imgix-core-js'
import Head from 'next/head'
import AuthorCard from '../AuthorCard'
import PageLayout from '../pageLayout'
import LargeTitle from '../LargeTitle'
import CategoryAndDescription from '../CategoryAndDescription'

const MobileOnly = glamorous.div(tw("block lg:hidden xl:hidden"))
const DesktopOnly = glamorous.div(tw("hidden lg:block xl:block"))

const styles = css`

  @media (min-width: 1200px) {

    .coloured-image {
      grid-column: 1;
      grid-row: 1;
    }
    .article-container {
      display: grid;
      padding: 1rem;
      grid-template-columns: [imagery] minmax(240px, 5fr) minmax(40em, 8fr) 3fr;
      grid-gap: 1rem;
      margin-left: 0rem;
      margin-right: 0rem;
    }
    .article-content {
      display: grid;
      grid-template-rows: minmax(1fr, 50vh) 2fr 4fr;
      grid-row: 1 / span 2;
      grid-column: 2;
      grid-gap: 1rem;
    }
  }
`

class Article extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string
  }

  render() {

    const doc = this.props.document;
    const {data} = doc;
    const {image} = data;
    
    return (

      <div className="article-container">
        <MobileOnly>
          <div className="my-8 mx-4">
            <div className="py-4 p-4 bg-white -m-4 max-w-md">
              <CategoryAndDescription category={data.category} showDescription={false} />
            </div>
            <div className="max-w-md">
              <LargeTitle text={RichText.asText(data.title)} />
            </div>
          
            
          </div>
        </MobileOnly>
        <DesktopOnly>
          {data.pinterest_image && data.pinterest_image.url && <div className="pinterest">
          
            <StickyOnDesktop mode="top" boundaryElement=".article-container">
              <div className="py-4 pr-8 max-w-sm">
                <ErrorBoundary>
                  {<ArticleImage 
                    imageUrl={data.pinterest_image.url} 
                    imageWidth={data.pinterest_image.dimensions ? data.pinterest_image.dimensions.width : 100} 
                    imageHeight={data.pinterest_image.dimensions ? data.pinterest_image.dimensions.height : 100} 
                    color={data.color} />}
                </ErrorBoundary>
              </div>
            </StickyOnDesktop>
          
          </div>}
          {!(data.pinterest_image && data.pinterest_image.url) && image && 
            <div className="coloured-image">
              <ErrorBoundary>
                {image && image.url && <ArticleImage 
                  imageUrl={image.url} 
                  imageWidth={image.dimensions ? image.dimensions.width : 100} 
                  imageHeight={image.dimensions ? image.dimensions.height : 100} 
                  color={data.color} />}
              </ErrorBoundary>
            </div>
          }
        </DesktopOnly>
        <MobileOnly>
          <div>
            {image && image.url && <ArticleImage 
              imageUrl={image.url} 
              imageWidth={image.dimensions ? image.dimensions.width : 100} 
              imageHeight={image.dimensions ? image.dimensions.height : 100} 
              color={data.color} />}
          </div>
        </MobileOnly>
        <div className="p-4 article-content bg-white">       
          <DesktopOnly>
            <div className="max-w-md">
              <LargeTitle text={RichText.asText(data.title)} />
            </div>
          
            <div className="py-4 p-4 bg-white -m-4 max-w-md">
              <CategoryAndDescription category={data.category} />
            </div>
          </DesktopOnly>
          <div className="text-xl max-w-md m-auto m-0-l m-0-xl">
            <ErrorBoundary>
              <SliceList sliceZone={data.body} article={doc}></SliceList>
              <div className="some-breathing-room lg:h-6"></div>
            </ErrorBoundary>
          </div>
          
        </div>

        <div className="article-sidebar px-4 lg:px-0">
          <StickyOnDesktop mode="top" boundaryElement=".article-container">
            
            {data.author &&               
              <AuthorCard author={data.author} />             
            }
          </StickyOnDesktop>
        </div>

        <div className="h-16"></div>

        <MobileOnly>
          {data.pinterest_image && data.pinterest_image.url && <div className="pinterest">          
            <div className="p-4 max-w-sm m-auto">
              <h3 className="font-light text-center p-4">Save to Pinterest</h3>
              <ErrorBoundary>
                {<ArticleImage 
                  imageUrl={data.pinterest_image.url} 
                  imageWidth={data.pinterest_image.dimensions ? data.pinterest_image.dimensions.width : 100} 
                  imageHeight={data.pinterest_image.dimensions ? data.pinterest_image.dimensions.height : 100} 
                  color={data.color} />}
              </ErrorBoundary>
            </div>
          </div>}
        </MobileOnly>
        
        <style jsx>{styles}</style>
      
    </div>
    )
  }
}

export default Article
