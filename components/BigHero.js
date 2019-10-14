import Fade from 'react-reveal/Fade'
import AnimatedIcon from './AnimatedIcon'
import { Parallax } from 'react-scroll-parallax'
import React, { Fragment } from 'react'
import PetalPattern from './PetalPattern'
import JoinTheMembershipButton from './JoinTheMembershipButton'

const BigHero = (props) => {
  return (

    <div className='big-hero relative'>
      <div />
      <div className='makelight-icon m-auto text-center'><AnimatedIcon /></div>
      { false && (typeof (window) !== 'undefined') &&
      <Fragment>
        <h1 className='font-light font-sans title text-3xl lg:text-4xl xl:text-5xl text-pink-light tracking-wide'><Fade bottom cascade>Makelight</Fade></h1>
        <div className='font-light font-sans title text-2xl text-grey tracking-wide'>
          <div className='inline-block px-4'><Fade bottom cascade delay={1000}>Creativity</Fade></div>
          <div className='inline-block px-4'><Fade bottom cascade delay={1200}>Growth</Fade></div>
          <div className='inline-block px-4'><Fade bottom cascade delay={1400}>Balance</Fade></div>
        </div>
      </Fragment>
      }
      <div><h1 className='leading-none font-bold title text-3xl lg:text-4xl xl:text-5xl text-grey-dark tracking-wide'>
        <Fade bottom cascade>Build your</Fade>
        <Fade bottom cascade>creative life</Fade>
      </h1>
        <Fade bottom delay={500}>
        <div>
            {(!!props.children) &&
            <div>{props.children}</div>
          }
            {(!props.children) &&
            <div style={{textAlign: 'center'}}>
              <p className='text-grey-dark text-xl m-auto p-4 block text-center max-w-sm break-words'>Makelight is a supportive, positive learning community for creative people.</p>
              <JoinTheMembershipButton buttonText='Join the membership' />
            </div>
          }
          </div>
      </Fade>
      </div>

      <div className='absolute pin' style={{zIndex: -1}}>
        <PetalPattern />
      </div>

      <style jsx>{`
          .big-hero {
            height: 100vw;
            display: grid;
            grid-template-rows: 1fr 3fr 8fr;
          }

          .makelight-icon {
            align-self: center;
            justify-self: center;
            width: 14vw;
            margin: auto;
          }

          .title {
            align-self: center;
            justify-self: center;
          }

          @media(min-width:769px) {
            .big-hero {
              height: 40vw;
              grid-template-rows: 1fr 3fr 6fr;
            }

            .makelight-icon {
              width: 6vw;
              padding-top: 7px;
            }
          }
        `}</style>
      <style jsx global>{`
        .animated-fill path {
          transition: fill 2s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default BigHero
