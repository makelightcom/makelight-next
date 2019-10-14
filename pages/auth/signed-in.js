import React from 'react'
import {object} from 'prop-types'
import Router from 'next/router'

import { setToken } from '../../utils/auth'
import { parseHash } from '../../utils/auth0'

export default class SignedIn extends React.Component {
  static propTypes = {
    url: object.isRequired
  }

  componentDidMount () {
    parseHash((err, result) => {
      if(err) {
        console.error('Something happened with the Sign In request')
        return;
      }

      setToken(result.idToken, result.accessToken);
      Router.push('/')
    })
  }
  render () {
    return null
  }
}