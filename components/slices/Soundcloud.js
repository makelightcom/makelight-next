import React, { Fragment } from 'react'
import SoundcloudEmbed from './SoundcloudEmbed'

const clientId = 'eadf9c50ace95cc55b0315cc8bad385a'

class Soundcloud extends React.Component {
  render () {
    return <div className='max-w-xl m-auto'>
      <SoundcloudEmbed resolveUrl={this.props.slice.value.url} clientId={clientId} />
    </div>
  }
}

export default Soundcloud
