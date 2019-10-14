import PageHead from '../../components/PageHead'
import React, { Fragment } from 'react'
import Hero from '../../components/hero'
import Fade from 'react-reveal/Fade'
import CourseCard from '../../components/CourseCard'
import { Predicates } from 'prismic-javascript'
import PrismicConfig from '../../prismic.config.js'

export default class CoursesIndex extends React.Component {
  static async getInitialProps ({ req, query }) {
    const prismicApi = await PrismicConfig.getApi(req)

    const paid = await prismicApi
      .getByUID('courses_page', 'courses')
      .catch(err => console.log(err))

    let featured = null

    if (paid.data.featured && paid.data.featured.uid) {
      featured = await prismicApi
        .getByUID('course', paid.data.featured.uid)
        .catch(err => console.log(err))
    }

    const courses = await prismicApi
      .query([
        Predicates.in(
          'my.course.uid',
          paid.data.courses.map(item => item.course.uid)
        )
      ])
      .catch(err => console.log(err))

    return { paid, featured, courses: courses.results }
  }
  render () {
    const { courses, featured } = this.props

    let twos_or_threes = 'twos'

    if ((courses.count % 3) === 0) {
      twos_or_threes = 'threes'
    }

    return (
      <div>
        <PageHead title='Online Courses from Makelight' />
        <Hero
          title='Online courses to inspire your creative side'
          description='Inspiring and accessible short courses to help you lead a creative life.'
        />

        {featured && (
          <div className='bg-yellow-lighter pt-8 -pb-10'>
            <div className='max-w-md m-auto text-center'>
              <CourseCard document={featured} />
            </div>
          </div>
        )}

        <Fade delay={500}>
          <div className='p-4 text-center max-w-2xl m-auto'>
{/*            <h1 className='py-6'>All of our upcoming courses</h1>
*/}            <div className={`course-cards ${twos_or_threes}`}>
              {courses.map(course => <CourseCard document={course} />)}
            </div>
          </div>
        </Fade>
        <style jsx>{`
          @media (min-width: 769px) {
            .course-cards {
              display: grid;
              
              grid-gap: 4rem;
            }

            .course-cards.twos {
              grid-template-columns: 1fr 1fr;
            }

            .course-cards.threes {
              grid-template-columns: 1fr 1fr 1fr;
            }
          }

          @media (max-width: 768px) {
            .course-cards {
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: 2rem;
            }
          }
        `}</style>
      </div>
    )
  }
}
