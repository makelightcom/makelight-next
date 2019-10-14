import { object } from 'prop-types'
import ArticleImage from '../ArticleImage'

class SliceImage extends React.Component {
  static propTypes = {
    slice: object
  }

  render() {
    return(
      <div className="max-w-lg m-auto">
        <ArticleImage 
          imageUrl={this.props.slice.value.url} 
          imageWidth={this.props.slice.value.dimensions.width} 
          imageHeight={this.props.slice.value.dimensions.height} 
        />
      </div>
    )
  }
}

export default SliceImage