import PageHead from '../components/PageHead'
import React, { Fragment } from 'react'
import Hero from '../components/hero'
import Fade from 'react-reveal/Fade'
import CourseCard from '../components/CourseCard'
import {Predicates } from 'prismic-javascript'
import PrismicConfig from '../prismic.config.js'

export default class Free extends React.Component {
  static async getInitialProps ({ req, query }) {
    const prismicApi = await PrismicConfig.getApi(req)

    const free = await prismicApi.getByUID('free_courses', 'free-courses').catch(err => console.log(err))
    const courses = await prismicApi.query([
      Predicates.in('my.course.uid', free.data.courses.map((item) => item.course.uid))
    ]).catch(err => console.log(err))

    return { free, freeCourses: courses.results }
  }
  render () {
    const {freeCourses} = this.props
    return (
      <div>
        <PageHead title='Free courses from Makelight' />
        <Hero title='Take a free Makelight course' description='Get a taste of the Makelight experience with one of our free courses to inspire your creative side.' />
        <Fade delay={500}>
          <div className='p-4 text-center max-w-2xl m-auto'>
            <div className='free-cards'>
              {
                freeCourses.map(course =>
                  <CourseCard key={course.uid} document={course} />
                )
              }
            </div>
          </div>
        </Fade>
        <style jsx>{`
          @media(min-width:769px) {
            .free-cards {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-gap: 4rem;
            }
          }

          @media(max-width:768px) {
            .free-cards {
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
