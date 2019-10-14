import Article from '../components/Article'
import Prismic, { Predicates } from 'prismic-javascript'
import { Query, DocumentByUid } from '../components/prismic'
import React, { Fragment } from 'react'
import ArticleList from '../components/ArticleList'
import RelatedArticles from '../components/RelatedArticles'
import PrismicConfig from '../prismic.config.js'
import ErrorBoundary from '../components/ErrorBoundary'

class Articles extends React.Component {
  static async getInitialProps ({ req, query }) {
    const prismicApi = await PrismicConfig.getApi(req)

    const article = await prismicApi
      .getByUID(
        'article',
        query.uid,
        {
          'fetchLinks': [
            'category.name',
            'category.slug',
            'category.description',
            'author.name',
            'author.slug',
            'author.profile-image',
            'author.description',
            'author.makelight-username'
          ]
        }
      )
      .catch(err => console.log(err))

    if (!article) {
      const err = new Error()
      err.code = 'ENOENT'
      throw err
    }
    const {layout} = query
    return { article, layout }
  }

  render () {
    const {article} = this.props
    return (
      <div>
        <ErrorBoundary>
          <ErrorBoundary>
            <Article document={article} />
          </ErrorBoundary>
        </ErrorBoundary>
        <section className='relative bg-white lg:bg-grey-lighter xl:bg-grey-lighter'>
          <ErrorBoundary>
            <RelatedArticles article={article} />
          </ErrorBoundary>
        </section>
      </div>)
  }
}

export default Articles
