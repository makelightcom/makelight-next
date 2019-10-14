import React, { Fragment } from 'react'
//import {Video, Images, Sound, Youtube, Vimeo} from 'react-entypo-icons'
import Video from 'react-entypo-icons/lib/entypo/Video'
import Vimeo from 'react-entypo-icons/lib/entypo/Vimeo'
import Images from 'react-entypo-icons/lib/entypo/Images'
import Youtube from 'react-entypo-icons/lib/entypo/Youtube'
import Sound from 'react-entypo-icons/lib/entypo/Sound'
import Text from 'react-entypo-icons/lib/entypo/Text'

const contentTypeIcons = {
  'vimeo': Video,
  'image': Images,
  'youtube': Youtube,
  'soundcloud': Sound,
  'simplecast': Sound,
}

class ContentIcon extends React.Component {
  render() {
    const Icon = contentTypeIcons[this.props.contentType]
    if(!Icon) {
      return null
    }
    return <span className="px-2 text-grey"><Icon /></span>
  }
}

export default ContentIcon