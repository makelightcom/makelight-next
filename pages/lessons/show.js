import PageHead from '../../components/PageHead'
import Lesson from '../../components/Lesson'
import { Predicates } from 'prismic-javascript'
import React from 'react'
import SidewaysLessonList from '../../components/SidewaysLessonList'
import PrismicConfig from '../../prismic.config.js'
import ErrorBoundary from '../../components/ErrorBoundary'

let prismicApi

class Lessons extends React.Component {
  static async getInitialProps ({ req, query }) {
    const api = await PrismicConfig.getApi(req)

    const lesson = await api
      .getByUID('lesson', query.uid)
      .catch(err => console.log(err))

    const course = await api
      .getByUID('course', lesson.data.course.uid)
      .catch(err => console.log(err))

    const lessonsQuery = await api
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

    const lessons = lessonsQuery.results

    return { course, lesson, lessons }
  }

  render () {
    const { lesson, lessons, course } = this.props
    return (
      <div>
        {!lesson && <div>Loading</div>}
        {lesson &&
          lessons &&
          course && (
            <Lesson document={lesson} lessons={lessons} course={course} />
          )}

        <div className='py-10' />
        <section className='relative bg-white lg:bg-grey-lighter xl:bg-grey-lighter'>
          <h3 className='text-center p-4'>All episodes</h3>
          <ErrorBoundary>
            <SidewaysLessonList lessons={lessons} lesson={lesson} />
          </ErrorBoundary>
        </section>
      </div>
    )
  }
}

export default Lessons
