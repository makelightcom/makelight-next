import { object } from 'prop-types'
import React, { Fragment } from 'react'
import { Predicates } from 'prismic-javascript'
import { Query } from './prismic'
import SidewaysArticleList from './SidewaysArticleList'
import PrismicConfig from '../prismic.config.js'

class RelatedArticles extends React.Component {
  static propTypes = {
    article: object
  }

  constructor () {
    super()
    this.state = {
      list: false,
    }
  }

  componentDidMount () {
    this.setState({
      list: true
    })
  }

  render () {
    if(!this.state.list) {
      return <div></div>
    }

    return <div>
      <Query
        url={PrismicConfig.apiEndpoint}
        query={[
          [ 
            Predicates.any('document.type', [ 'article' ]),
            Predicates.not("my.article.audience", "members"),
            Predicates.not("my.article.uid", this.props.article.uid)
          ],
          { 
            pageSize: '9', 
            fetchLinks : ['author.name'],
            orderings: "[document.first_publication_date desc]"
          },
        ]}
      >
        {({loading, prismic, error}) => (
          <Fragment>
            {!loading && prismic &&
              <SidewaysArticleList articles={prismic.results}></SidewaysArticleList>
            }
          </Fragment>
        )}
      </Query>
    </div>
  }
}

export default RelatedArticles


