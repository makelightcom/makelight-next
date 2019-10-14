import React from 'react'
import ReactDOM from 'react-dom'
import { Cover, PlayButton, Timer } from 'react-soundplayer/components'
import { withSoundCloudAudio } from 'react-soundplayer/addons'


class SoundcloudEmbed extends React.Component {

  play = () => {
    if (this.props.playing) {
      this.props.soundCloudAudio.pause();
    } else {
      this.props.soundCloudAudio.play();
    }
  }

  render() {
    const props = this.props
    let { track, currentTime } = props

    return (
      <div className="border-grey">
        <button className="bg-pink p-4 text-white font-title " onClick={() => this.play()}>
          {this.props.playing ? 'Pause' : '▶ Play'}
        </button>
        <h2 className="custom-player-title">
          {track ? track.title : 'Loading...'}
        </h2>
        <Timer 
          className="custom-player-timer"
          duration={track ? track.duration / 1000 : 0} 
          currentTime={currentTime} 
          {...props} />
      </div>
    )
  }
}

export default withSoundCloudAudio(SoundcloudEmbed)