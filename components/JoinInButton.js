import React, { Fragment } from 'react'

export default class JoinInButton extends React.Component {
  state = {
    buttonText: this.props.buttonText ? this.props.buttonText : "Join in",
    activeButtonText: this.props.buttonText ? this.props.buttonText : "Join in",
    disabled: false,
    error: null
  }

  handleJoinIn = async () => {
    
  }

  render () {
    const {disabled, error, buttonText} = this.state
    return (   
      <div>
        <div className="relative inline-block">
          <button 
            disabled={disabled}
            className="text-white p-4 px-6 inline-block bg-pink font-sans font-bold hover:bg-teal" 
            style={{transform: 'translate(-0.5rem, -0.5rem)'}} onClick={this.handleJoinIn}>{buttonText}</button>
          <div className="pin bg-yellow absolute" style={{zIndex: -1, transform: 'translate(0.5rem, 0.5rem)'}}>
          </div>          
        </div>
        {error && 
          <p className="p-4">There was a problem: {error}</p>
        }
      </div>
    )
  }
}