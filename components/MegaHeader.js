import { string, number, bool } from 'prop-types'
import LazyImage, { Source } from  './lazyload'
import ImgixClient from 'imgix-core-js'
import { Parallax } from 'react-scroll-parallax';

export default class MegaHeader extends React.Component {
  static propTypes = {
    imageUrl: string,
    colorOverlayOpacity: number,
    color: string,
    useImgix: bool
  }

  state = {
    width: 64
  }

  static defaultProps = {
    color: 'eeeeee',
    colorOverlayOpacity: 0,
    useImgix: true
  }

  render() {
    
    const client = new ImgixClient({
      host: "makelight-prismic-images.imgix.net"
    });

    let imageTag
    let imageUrl = this.props.imageUrl
    let lowResImageUrl = this.props.imageUrl

    const nopin = this.props.nopin ? 'nopin' : null

    const filename = this.props.imageUrl.split("/").pop()
    if(typeof(window) === 'undefined') {
      imageTag = <div />
    } else {
      if(this.props.useImgix) {
        lowResImageUrl = client.buildURL(filename, { 
          w: 64, 
          h: 64, 
          fit: "crop", 
          crop: "entropy", 
          auto: "format" 
        })
        imageUrl = client.buildURL(filename, { 
          w: window.innerWidth * window.devicePixelRatio, 
          h: window.innerHeight * window.devicePixelRatio, 
          fit: "crop", 
          crop: "entropy", 
          auto: "format",
          balph: this.props.colorOverlayOpacity ? this.props.colorOverlayOpacity : 50,
          bm: 'normal',
          blend: this.props.color.replace('#','')
        })
      }
      
      imageTag = <LazyImage src={lowResImageUrl} fullResSrc={imageUrl} backgroundColor="#eeeeee" nopin={nopin}>
        <Source
          srcSet={imageUrl}
          media={'(min-width: 65px)'}
          nopin={nopin}
        />
      </LazyImage>
    }
    
    return (
      <div className="relative" style={{height: '50vh'}}>
        <div className="absolute" style={{transform: 'translateY(-50vh)'}}>
          <Parallax offsetYMax={100}
            offsetYMin={0}
            slowerScrollRate
            >
            <div className="h-screen">{imageTag}</div>
          </Parallax>
          {/*<Parallax offsetYMax={200}
            offsetYMin={150}
            slowerScrollRate
            >
            <div style={{height: '33vh', backgroundColor: this.props.color}}></div>
          </Parallax>*/}
        </div>
      </div>
    )

  }
}