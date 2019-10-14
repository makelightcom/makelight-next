import React from 'react'
import {RichText, Date} from 'prismic-reactjs'
import Prismic, {Predicates } from 'prismic-javascript'
import PrismicConfig from '../prismic.config.js'
import Query from './prismic/Query'
import CourseOverview from './CourseOverview'
import Fade from 'react-reveal/Fade'

export default class CourseDetails extends React.Component {
  render () {
    return (
      <Query
          url={PrismicConfig.apiEndpoint}
          query={[
            [ 
              Predicates.at('document.id', this.props.courseId)
             ],
            { 
              pageSize: '1',
            }
          ]}
      >
        {({categoryLoading, prismic, categoryError}) => (
          <div>              
            {!categoryLoading && prismic &&
              <CourseOverview course={prismic.results[0]} />
            }
          </div>
        )}
      </Query>
    )
  }
}