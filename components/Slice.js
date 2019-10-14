import Vimeo from './slices/Vimeo'
import Youtube from './slices/Youtube'
import Pinterest from './slices/Pinterest'
import Simplecast from './slices/Simplecast'
import SliceImage from './slices/SliceImage'
import SliceNarrowImage from './slices/SliceNarrowImage'
import SliceText from './slices/SliceText'
import Soundcloud from './slices/Soundcloud'
import Title from './slices/SliceTitle'
import Button from './slices/Button'
import ImageWithText from './slices/ImageWithText'
import MarkdownSlice from './slices/MarkdownSlice'
import InstagramHashtag from './slices/InstagramHashtag'
import { object } from 'prop-types'
import Fade from 'react-reveal/Fade'
import ErrorBoundary from './ErrorBoundary'
import {withErrorBoundary} from 'react-error-boundary'

class Slice extends React.Component {
  static propTypes = {
    slice: object,
    article: object
  }

  sliceTypes = {
    "vimeo": Vimeo,
    "simplecast": Simplecast,
    "pinterest": Pinterest,
    "image": SliceImage,
    "text": SliceText,
    "youtube": Youtube,
    "soundcloud": Soundcloud,
    "markdown": MarkdownSlice,
    "title": Title,
    "button": Button,
    "image-with-text": ImageWithText,
    "narrow-image": SliceNarrowImage,
    "instagram-hashtag": InstagramHashtag
  }

  render() {
    if(!this.props.slice.slice_type) {
      return <div>No slice</div>
    }
    const TagName = this.sliceTypes[this.props.slice.slice_type] //withErrorBoundary(this.sliceTypes[this.props.slice.slice_type], ErrorBoundary)

    if(TagName) {
      return <div className={`py-8 slice-${this.props.slice.slice_type}`}><Fade><TagName color={this.props.article.data.color} slice={this.props.slice} /></Fade></div>
    } else {
      return <div>No tag for <span>{this.props.slice.slice_type}</span></div>
    }
  }
}

export default Slice