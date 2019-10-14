import PageHead from '../../components/PageHead'
import ArticleList from '../../components/ArticleList'
import { Predicates } from 'prismic-javascript'
import PrismicConfig from '../../prismic.config.js'
import { Query } from '../../components/prismic'
import React, { Fragment } from 'react'
import Hero from '../../components/hero'
import ErrorBoundary from '../../components/ErrorBoundary'
import {RichText} from 'prismic-reactjs'
import Fade from 'react-reveal/Fade'
import Link from '../../components/DataPrefetchLink'

class Categories extends React.Component {
  render () {
    return <div>

      <Query
        url={PrismicConfig.apiEndpoint}
        query={[
          [
            Predicates.at('document.type', 'category'),
            Predicates.at('my.category.uid', this.props.router.query.uid)
          ],
          {
            pageSize: '1'
          }
        ]}
      >
        {({categoryLoading, prismic, categoryError}) => (
          <div>
            {!categoryLoading && prismic && prismic.results && prismic.results[0] &&
              <Fragment>
                <ErrorBoundary>
                  <PageHead title={RichText.asText(prismic.results[0].data.name)} />
                  <div className='py-4 text-center'>
                    <div className='font-title font-regular text-xl xs:text-xl sm:text-xl md:text-2xl lg:text-2xl text-grey-darkest mb-2 no-underline leading-tight'>
                      <Fade bottom distance='50px' delay={100}><Link href={`/categories`} as={`/articles/categories`} withData><a className='no-underline'>Topics /</a></Link></Fade>
                    </div>
                  </div>
                  <Hero title={RichText.asText(prismic.results[0].data.name)} />
                  <Fade delay={500}>
                    <div className='font-title font-regular text-xl text-grey-darkest p-4 text-center max-w-m'>
                      {RichText.render(prismic.results[0].data.description, PrismicConfig.linkResolver)}
                    </div>
                  </Fade>
                  <Query
                    url={PrismicConfig.apiEndpoint}
                    query={[
                      [
                        Predicates.any('document.type', [ 'article' ]),
                        Predicates.not('my.article.audience', 'members'),
                        Predicates.at('my.article.category', prismic.results[0].id)
                      ],
                      {
                        pageSize: '24',
                        fetchLinks: ['category.name', 'category.slug', 'author.name', 'author.slug', 'author.profile-image', 'author.description', 'author.makelight-username'],
                        orderings: '[document.first_publication_date desc]'
                      }
                    ]}
                  >
                    {({loading, prismic, error}) => (
                      <Fragment>
                        {!loading && prismic &&
                          <ArticleList articles={prismic.results} showCategories={false} />
                        }
                      </Fragment>
                    )}
                  </Query>
                </ErrorBoundary>
              </Fragment>
            }
          </div>
        )}
      </Query>
    </div>
  }
}

export default Categories
