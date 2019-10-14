import Fade from 'react-reveal/Fade'
import glamorous from 'glamorous'

const Tall = glamorous.div(tw('p-8'))
const HeroContainer = glamorous.div(tw('hero pt-8 pb-8 px-2'))
const HeroText = glamorous.h1(tw('text-center font-light font-sans text-3xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-5xl tracking-wide text-grey-dark'))

class Hero extends React.Component {
  render () {
    const props = this.props
    return <Tall>
      <HeroContainer>
        <HeroText>
          <div className='hidden lg:block xl:block'>
            <Fade bottom cascade collapse delay={500}>{props.title}</Fade>
          </div>
          <div className='block lg:hidden xl:hidden'>
            <Fade bottom collapse delay={500}>{props.title}</Fade>
          </div>
        </HeroText>
        {props.description &&
          <div className='py-6 text-center text-pink text-xl'>
            <Fade bottom cascade collapse delay={800}>{props.description}</Fade>
          </div>
        }
      </HeroContainer>
    </Tall>
  }
}

export default Hero
