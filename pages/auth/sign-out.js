import React from 'react'
import defaultPage from '../../hocs/defaultPage'
import { unsetToken } from '../../utils/auth'
import { logout } from '../../utils/auth0'

class SignOut extends React.Component {
  componentDidMount () {
    unsetToken()
    logout()
    
  }
  render () {
    return null
  }
}


export default defaultPage(SignOut)


