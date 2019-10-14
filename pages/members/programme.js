import PageHead from '../../components/PageHead'
import React, { Fragment } from 'react'
import Hero from '../../components/hero'
import Prismic, { Predicates } from 'prismic-javascript'
import PrismicConfig from '../../prismic.config.js'
import CourseCard from '../../components/CourseCard'

class MembersProgramme extends React.Component {
  static async getInitialProps ({ req, query }) {
    const prismicApi =
      req && req.prismic
        ? req.prismic.api
        : await Prismic.api(PrismicConfig.apiEndpoint).then(api => {
          return api
        })
    const programme = await prismicApi
      .getByUID('the_programme', 'the-programme')
      .catch(err => console.log(err))
    const courses = await prismicApi
      .query([
        Prismic.Predicates.in(
          'my.course.uid',
          programme.data.courses.map(item => item.course.uid)
        )
      ])
      .catch(err => console.log(err))

    return { programme, courses: courses.results }
  }

  render () {
    const { courses } = this.props
    return (
      <div>
        <PageHead title='Makelight Membership' />
        <Hero title='The Makelight Membership' />
        <p>
          As a Makelight subscriber you get unlimited access to Makelight
          courses, and more as we add them, plus lots more benefits - read on!
        </p>
        <div className='px-4'>
          {courses.map(course => (
            <div className='course' key={course.uid}>
              <CourseCard document={course} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default MembersProgramme
