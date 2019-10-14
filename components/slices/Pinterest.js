import { object } from 'prop-types'

class Pinterest extends React.Component {
  static propTypes = {
    slice: object
  }

  render() {
    return  <a  data-pin-do="embedBoard" 
                data-pin-board-width="900" 
                data-pin-scale-height="900"
                data-pin-scale-width="115"
                href={this.props.slice.value.value}></a>
  }
}

export default Pinterest

