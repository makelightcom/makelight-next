import Player from './Player'

class Youtube extends React.Component {
  render () {
    return <div className='max-w-xl m-auto'><Player type='youtube' {...this.props} /></div>
  }
}

export default Youtube
