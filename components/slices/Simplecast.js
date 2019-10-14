import { object } from 'prop-types'

class Simplecast extends React.Component {
  static propTypes = {
    slice: object
  }

  render() {
    const url = this.props.slice.value.url
    return  <div className="mw7 centered center">
              <iframe frameborder='0' height='330px' scrolling='no' seamless="true" src={`${url.replace("/s/","/e/")}?style=large`} width='100%'></iframe>
            </div>
  }
}

export default Simplecast