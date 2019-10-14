import PageHead from '../components/PageHead'
import CategoryCardList from '../components/CategoryCardList'
import { Predicates } from 'prismic-javascript'
import { Query } from '../components/prismic'
import React, { Fragment } from 'react'
import Hero from '../components/hero'
import PrismicConfig from '../prismic.config.js'
import ErrorBoundary from '../components/ErrorBoundary'

class Categories extends React.Component {
  render () {
    return <div>

      <Query
        url={PrismicConfig.apiEndpoint}
        query={[
          [
            Predicates.any('document.type', [ 'category' ])
          ]
        ]}
      >
        {({categoriesLoading, prismic, categoryError}) => (
          <div>
            {!categoriesLoading && prismic &&
              <Fragment>
                <ErrorBoundary>
                  <PageHead title='All our articles' />
                  <Hero title='All our articles' />

                  <Query
                    url={PrismicConfig.apiEndpoint}
                    query={[
                      [
                        Predicates.any('document.type', [ 'category' ])
                      ],
                      {
                        pageSize: '100',
                        orderings: '[document.first_publication_date desc]'
                      }
                    ]}
                  >
                    {({loading, prismic, error}) => (
                      <Fragment>
                        {!loading && prismic &&
                          <CategoryCardList categories={prismic.results} />
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
