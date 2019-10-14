import { object } from 'prop-types'
import React, { Fragment } from 'react'
import {RichText} from 'prismic-reactjs'

class SliceTitle extends React.Component {
  static propTypes = {
    slice: object
  }

  render() {
    return <h1 className="text-center">{RichText.asText(this.props.slice.value)}</h1>
  }
}

export default SliceTitle

