import PageHead from '../components/PageHead'
import { Predicates } from 'prismic-javascript'
import PrismicConfig from '../prismic.config.js'
import React from 'react'
import BigHero from '../components/BigHero'
import Pagination from '../components/Pagination'
import ArticleList from '../components/ArticleList'
import defaultPage from '../hocs/defaultPage'

class Blog extends React.Component {
  static async getInitialProps ({ req, query }) {
    const page = query.page || 1

    const prismicApi = await PrismicConfig.getApi(req)

    const data = await prismicApi
      .query(
        [
          Predicates.at('document.type', 'article'),
          Predicates.not('my.article.audience', 'members')
        ],
        {
          pageSize: '18',
          page: page,
          fetchLinks: [
            'category.name',
            'category.slug',
            'author.name',
            'author.slug',
            'author.profile-image',
            'author.description',
            'author.makelight-username'
          ],
          orderings: '[document.first_publication_date desc]'
        }
      )
      .catch(err => console.log(err))

    return { prismic: data, page: page }
  }

  render () {
    const { prismic, page } = this.props
    let router = {
      pathname: '/'
    }
    return (
      <div>
        <PageHead title='Makelight Blog' />
        {page > 1 && (
          <div className='px-4 py-6'>
            <Pagination prismic={prismic} href={router.pathname} />
          </div>
        )}

        <div className=''>
          <ArticleList articles={prismic.results} showCategories />
        </div>
        <div className='px-4 py-6'>
          <Pagination prismic={prismic} href={router.pathname} />
        </div>
      </div>
    )
  }
}

export default defaultPage(Blog)
