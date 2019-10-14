import React, { Component } from 'react'
import PropTypes from 'prop-types'
import auth0 from 'auth0-js'

class Auth0LoginButtons extends Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    onAuth0Login: PropTypes.func.isRequired,
    onAuth0LoginError: PropTypes.func.isRequired,
  }

  state = {
    authorizing: false
  }

  componentDidMount () {
    this.webAuth = new auth0.WebAuth({
      domain:       'stef.eu.auth0.com',
      clientID:     '1PELjySs3TuYsqv2al8euHGqtcuht5iF'
    });

    if(window.location.hash) {
      this.webAuth.parseHash({ hash: window.location.hash }, (err, authResult) => {
        if (err) {
          this.setState({authorizing: false})
          this.setState({error: err})
          if(this.props.onAuth0LoginError) {
            this.props.onAuth0LoginError(err)
          }
          if(typeof(window.Raven !== "undefined")) {
            window.Raven.captureException(err);
          }
          console.error(err)
          return
        }
        if(authResult) {

          this.webAuth.client.userInfo(authResult.accessToken, (err, profile) => {
            console.log("Webauth", err, profile)
            // Now you have the user's information
            this.props.onAuth0Login(authResult.idToken, profile)
          })
        }
      })
    }
  }

  componentWillUnmount() {
  }

  signInWithInstagram = (e) => {
    e.preventDefault()
    this.setState({authorizing: true})
    const authorizeParams = {
      connection: 'instagram',
      scope: 'profile openid read:user_idp_tokens',
      responseType: 'token',
      redirectUri: `${window.location.href.split('/').slice(0, 3).join('/')}/signin`
    }
    //console.log(authorizeParams)
    this.webAuth.authorize(authorizeParams)
  }
  
  render() {
    if(!this.props.visible) {
      return(
        <div></div>
      )
    }
    return (
      <div>
        <button disabled={this.authorizing} onClick={this.signInWithInstagram}>          
          Sign in
        </button>
      </div>
    )
  }
}

export default Auth0LoginButtons
