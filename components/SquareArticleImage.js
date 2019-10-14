import { string, bool } from 'prop-types'
import LazyImage, { Source } from  './lazyload'
import LazyLoadingImgixImage from './LazyLoadingImgixImage'

class SquareArticleImage extends React.Component {
  static propTypes = {
    imageUrl: string,
    isHovering: bool,
    useImgix: bool,
    nopin: bool
  }

  state = {
    width: 32
  }

  static defaultProps = {
    useImgix: true,
    isHovering: false,
    nopin: false,
    renderImageServerSide: false
  }

  componentDidMount() {
    this.setState({ width: this.square.clientWidth })
  }

  render() {    
    let imageTag
    let {imageUrl, alt, renderImageServerSide} = this.props
    let lowResImageUrl = this.props.imageUrl
    const nopin = this.props.nopin ? 'nopin' : null
    
    if(this.props.useImgix) {

      let dimension = this.state.width

      const imgixOptions = { 
        w: dimension, 
        h: dimension, 
        fit: "crop", 
        crop: "entropy", 
        auto: "format"
      }
      imageTag = <LazyLoadingImgixImage 
        renderImageServerSide={renderImageServerSide}
        imageUrl={imageUrl}
        imgixOptions={imgixOptions}
        alt={alt ? alt : "*"}
        width={this.state.width} 
        height={this.state.width} 
        backgroundColor="#eeeeee" 
        nopin={nopin}></LazyLoadingImgixImage>
    } else {
      imageTag = <LazyImage 
        alt={alt ? alt : "*"} 
        width={this.state.width} 
        height={this.state.width} 
        src={lowResImageUrl} 
        fullResSrc={imageUrl} 
        backgroundColor="#eeeeee" 
        nopin={nopin}>
        <Source
          srcSet={imageUrl}
          media={'(min-width: 33px)'}
          nopin={nopin}
        />
      </LazyImage>
      
    }
    
    return (
      <div className="square-format" ref={element => this.square = element}>
        <div className={`square-format-inner ${this.props.isHovering ? 'is-hovering' : ''}`}>
          {imageTag}
        </div>
        <style jsx>{`
          .square-format {
            position: relative;
            padding-bottom: 100%;
            background-color: #eee;
            overflow: hidden;
          }
          .square-format-inner {
            position: absolute;
            width: 100%;
            top: 0px;
            left: 0px;
            transition: transform .8s;
          }
          .square-format-inner.is-hovering {
            transform: scale(1.1);
          }

        `}</style>
      </div>
    )
  }
}

export default SquareArticleImage