import { string, bool } from 'prop-types'
import {RichText, Date} from 'prismic-reactjs'
import SquareArticleImage from './SquareArticleImage'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Fade from 'react-reveal/Fade'
import PrismicDOM from 'prismic-dom'
import PrismicConfig from '../prismic.config.js'
import ArticleContentIcons from './ArticleContentIcons'
import PageHead from '../components/PageHead'
import Hero from '../components/hero'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

class Podcast extends React.Component {
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
    const {episode} = this.props  
    const image = episode.images.large
    return <div>

      <div className="max-w-md m-auto">
        {image && <SquareArticleImage imageUrl={image} useImgix={true} isHovering={false} /> }

        
      </div>
    </div>
  }
}

export default Podcast