import { string, optionalNumber, bool } from 'prop-types'
import LazyImage, { Source } from  './lazyload'
import LazyLoadingImgixImage from './LazyLoadingImgixImage'
import Fade from 'react-reveal/Fade';

class ArticleImage extends React.Component {
  static propTypes = {
    imageUrl: string,
    color: string,
    imageWidth: optionalNumber,
    imageHeight: optionalNumber,
    renderImageServerSide: bool,
    alt: string
  }

  static defaultProps = {
    imageWidth: 100,
    imageHeight: 100,
    color: '#eeaaaa',
    renderImageServerSide: false,
    alt: '*'
  }

  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      width: 32
    }
  }

  componentDidMount() {
    const width = this.container.current.clientWidth
    const mounted = true
    console.log("Article image mounted", width, this.container)
    this.setState({ width, mounted })
  }

  componentWillReceiveProps(props) {
    this.setState({ width: this.container.current.clientWidth })
  }

  render() {
    const {imageHeight, imageWidth, alt, renderImageServerSide, imageUrl} = this.props
    const nopin = this.props.nopin ? 'nopin' : null
    const {width} = this.state
    const colorStyles = {
      backgroundColor: this.props.color,
      transform: 'translate(-1rem -1rem)',
      zIndex: -1,
      height: "calc(100% - 1rem)",
      width: "calc(100% - 1rem)", 
      lineHeight: '0px', 
    }

    const displayWidth = width
    const displayHeight = Math.round(imageHeight*(width/imageWidth))

    const imgixOptions = { 
      w: displayWidth, 
      h: displayHeight, 
      auto: "format"
    }
    const imageTag = <LazyLoadingImgixImage 
      renderImageServerSide={renderImageServerSide}
      imageUrl={imageUrl}
      imgixOptions={imgixOptions}
      alt={alt ? alt : "*"}
      width={displayWidth} 
      height={displayHeight} 
      backgroundColor="#eeeeee" 
      paused={false}
      nopin={nopin}></LazyLoadingImgixImage>

    const containerStyles = {
      width: "100%", 
      lineHeight: '0px', 
      paddingBottom:`${(Math.round(100*imageHeight/imageWidth))}%`
    }
    return (
      <div 
        className="relative image-display" 
        style={containerStyles}>
          <div 
            className="absolute w-full pl-4 pt-4" 
            ref={this.container}>
            <Fade bottom distance="8rem">
              {imageTag}
            </Fade>
          </div>
          <div className="absolute pin" style={colorStyles} />
      </div>
    )
      
  }
}

export default ArticleImage