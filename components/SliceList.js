import Slice from './Slice'
import { object, array } from 'prop-types'
import React, { Fragment } from 'react'
import ErrorBoundary from './ErrorBoundary'

class SliceList extends React.Component {
  static propTypes = {
    sliceZone: array,
    article: object
  }

  render() {
    const article = this.props.article

    return <div className="slice-list text-grey-darker">
      {this.props.sliceZone && this.props.sliceZone.map((slice, index) => 
        <ErrorBoundary key={index}>
          <Slice slice={slice} article={article} />
        </ErrorBoundary>
      )}
      <style jsx global>{`
        @media (min-width: 1080px) {
          .slice-list .slice-image:nth-child(odd) {
            transform: translateX(-4rem);
            border: 1px red;
          }
        }
      `}</style>
    </div>
  }
}

export default SliceList