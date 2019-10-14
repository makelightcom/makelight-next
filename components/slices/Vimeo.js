import Player from './Player'

class Vimeo extends React.Component {
  render () {
    return <div className='max-w-xl m-auto'><Player type='vimeo' {...this.props} /></div>
  }
}

export default Vimeo
