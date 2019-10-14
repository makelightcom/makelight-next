import React, { Fragment } from 'react'
import Sticky from 'react-sticky-el'
import ContentIcon from './ContentIcon'

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

class ArticleContentIcons extends React.Component {

  state = {
    contentTypes: []
  }

  componentDidMount() {
    const contentTypes = this.props.article.data.body.map((i) => {
      return i.slice_type
    }).unique()

    this.setState({contentTypes: contentTypes})
  }
  render() {
    return <Fragment>
      {this.state.contentTypes.map((item) => 
        <ContentIcon key={item} contentType={item} />
      )}
    </Fragment>
  }
}

export default ArticleContentIcons