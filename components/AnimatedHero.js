import Fade from 'react-reveal/Fade'
import AnimatedIcon from './AnimatedIcon'
import React, {Fragment} from 'react'
import { Parallax } from 'react-scroll-parallax'

export default class AnimatedHero extends React.Component {
  render () {
    const {title, subtitle, description} = this.props
    return (
      <Parallax offsetYMax={20}
        offsetYMin={-20}
        slowerScrollRate>
        <div className='big-hero pt-8 pb-8'>
          <div style={{minHeight: '12rem'}}>
            <div className='w-16 m-auto text-center' style={{width: '64px', margin: 'auto'}}><AnimatedIcon /></div>
            { (typeof (window) !== 'undefined') &&
            <Fragment>
              <h1 className='font-light font-sans title text-5xl text-pink-light tracking-wide leading-none py-6'><Fade bottom>{title}</Fade></h1>
              {subtitle && <div className='font-light font-sans title text-2xl text-grey tracking-wide leading-none py-6'>
                <div className='inline-block px-4'><Fade bottom delay={1000}>{subtitle}</Fade></div>
              </div>}
            </Fragment>
            }
          </div>

          {description &&
            <div style={{minHeight: '6rem'}}>
              <div className='text-center text-pink text-xl'>
                <Fade bottom cascade collapse delay={800}>{description}</Fade>
              </div>
            </div>
          }

          <style jsx>{`
            .title {
              align-self: center;
              justify-self: center;
            }
          `}</style>
        </div>
      </Parallax>)
  }
}
