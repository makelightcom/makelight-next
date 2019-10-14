import { string, bool } from 'prop-types'
import LessonCard from '../components/LessonCard'
import React, { Fragment } from 'react'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

class LessonCardList extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string,
    showCategories: bool
  }

  defaultPropTypes = {
    showCategories: true,
    link: true
  }
  render () {
    const props = this.props
    return <div>
      <section className="card-container">
        {props.lessons.map((lesson) => 
          <LessonCard key={lesson.uid} document={lesson} link={props.link}></LessonCard>
        )}
      </section>
      <style jsx>{`

        .card-container {
            display: grid;
            padding: 1rem;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            grid-gap: 2rem;
        }
        `}</style>
    </div>
  }
}

export default LessonCardList
