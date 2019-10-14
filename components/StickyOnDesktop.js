import Sticky from 'react-sticky-el'
import Responsive from 'react-responsive'
import glamorous from 'glamorous'
import {Fragment} from 'react'

const Desktop = props => <Responsive {...props} minWidth={1200} />
const Mobile = props => <Responsive {...props} maxWidth={1199} />

class StickyOnDesktop extends React.Component {
  render() {
    const {props} = this
    const {children} = props

    return( <Fragment>
      <Desktop>          
        <Sticky {...props}>
          {children}
        </Sticky>
      </Desktop>
      <Mobile>
        {children}
      </Mobile>
    </Fragment>)
  }
}

export default StickyOnDesktop