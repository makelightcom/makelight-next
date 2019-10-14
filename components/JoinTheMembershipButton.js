import React, { Fragment } from 'react'
import Link from './DataPrefetchLink'

export default class JoinTheMembershipButton extends React.Component {
  state = {
    buttonText: this.props.buttonText ? this.props.buttonText : "Become a member",
    activeButtonText: this.props.buttonText ? this.props.buttonText : "Become a member",
    disabled: false,
    error: null
  }

  render () {
    const {disabled, error, buttonText} = this.state
    return (   
      <div>
        <div className="relative inline-block">
          <Link href={"/membership"} as={"/membership"}>
            <a href="/membership" className="relative inline-block">
              <span>
                <span className="text-white p-4 px-6 inline-block bg-pink font-sans font-bold hover:bg-teal" style={{transform: 'translate(-0.5rem, -0.5rem)'}}>Become a member</span>
                <span className="pin bg-yellow absolute" style={{zIndex: -1, transform: 'translate(0.5rem, 0.5rem)'}}>
                </span>
              </span>
            </a>
          </Link>        
        </div>
        {error && 
          <p className="p-4">There was a problem: {error}</p>
        }
      </div>
    )
  }
}