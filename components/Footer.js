import React, { Fragment } from 'react'
import Sticky from 'react-sticky-el'
import SocialIconsRow from './SocialIconsRow'

class Footer extends React.Component {
  render () {
    return <div>
      <footer className='text-center font-title h-full bg-teal-lightest'>
        <div className='footer-inner p-6 bg-teal-lightest text-teal mt-6 h-full'>

          <p>Made with ❤️ and ☕ in London.</p>
          <p>hello@makelight.com</p>
          <SocialIconsRow />

        </div>
      </footer>
      <style jsx>{`
        footer {
          display: grid;
        }

        .footer-inner {
          align-self: center;
          justify-self: center;
        }
      `}</style>
    </div>
  }
}

export default Footer
