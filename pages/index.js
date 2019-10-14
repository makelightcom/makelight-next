import PageHead from '../components/PageHead'
import { Predicates } from 'prismic-javascript'
import PrismicConfig from '../prismic.config.js'
import React from 'react'
import BigHero from '../components/BigHero'
import Pagination from '../components/Pagination'
import ArticleList from '../components/ArticleList'
import defaultPage from '../hocs/defaultPage'
import Link from '../components/DataPrefetchLink'

class Index extends React.Component {
  // static async getInitialProps ({ req, query }) {
  //   const page = query.page || 1

  //   const prismicApi = await PrismicConfig.getApi(req)

  //   const data = await prismicApi
  //     .query(
  //       [
  //         Predicates.at('document.type', 'article'),
  //         Predicates.not('my.article.audience', 'members')
  //       ],
  //       {
  //         pageSize: '18',
  //         page: page,
  //         fetchLinks: [
  //           'category.name',
  //           'category.slug',
  //           'author.name',
  //           'author.slug',
  //           'author.profile-image',
  //           'author.description',
  //           'author.makelight-username'
  //         ],
  //         orderings: '[document.first_publication_date desc]'
  //       }
  //     )
  //     .catch(err => console.log(err))

  //   return { prismic: data, page: page }
  // }

  render () {
    let { prismic, page } = this.props
    page = page || 1
    const sale = false
    let router = {
      pathname: '/'
    }
    return (
      <div>
        <PageHead title='Makelight' />

        {page == 1 && <BigHero>
          {sale &&
            <div className='max-w-md px-2 py-6 text-grey-darker text-center m-auto'>
              <div className='py-6 text-xl font-bold'>
                  Our Summer Sale is on now. <br />Join one of our inspiring courses or workshops at a 30% discount.
              </div>
              <a href='https://ukstore.makelight.com/collections/summer-sale' className='my-2 bg-pink text-white text-xl m-auto inline-block px-4 py-2 no-underline font-bold'>View sale</a>
            </div>
          }
        </BigHero>}
        {false && 
          <div>
            {page > 1 && (
              <div className='px-4'>
                <Pagination prismic={prismic} href={router.pathname} />
              </div>
            )}

            {prismic &&
              <div>
                <div className=''>
                  <ArticleList articles={prismic.results} showCategories />
                </div>
                <div className='px-4'>
                  <Pagination prismic={prismic} href={router.pathname} />
                </div>
              </div>
            }
            </div>
        }
      </div>
    )
  }
}

export default defaultPage(Index)
