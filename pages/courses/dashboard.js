import LessonCardList from '../../components/LessonCardList'
import { Predicates } from 'prismic-javascript'
import React, { Fragment } from 'react'
import PrismicConfig from '../../prismic.config.js'
import { RichText } from 'prismic-reactjs'

class CourseDashboard extends React.Component {
  static async getInitialProps ({ req, query }) {
    const api = await PrismicConfig.getApi()

    const course = await api
      .getByUID('course', query.uid)
      .catch(err => console.log(err))

    const lessons = await api
      .query(
        [
          Predicates.any('document.type', ['lesson']),
          Predicates.at('my.lesson.course', course.id)
        ],
        {
          pageSize: '50',
          orderings: ['[my.lesson.number]']
        }
      )
      .catch(err => console.log(err))
    return { course, lessons: lessons.results }
  }

  render () {
    const { course, lessons } = this.props
    const { data } = course
    return (
      <div className='px-4'>
        <h1>{RichText.asText(data.title)}</h1>
        <div className='lesson-list'>
          <LessonCardList lessons={lessons} />
        </div>
      </div>
    )
  }
}

export default CourseDashboard
