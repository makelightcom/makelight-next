import React, { Component} from 'react';
import Link from './DataPrefetchLink'
import {RichText} from 'prismic-reactjs'

export default class LessonProgress extends Component {

  componentDidMount() {
    
  }

  render() {
    const {lessons, course} = this.props
    return (
      <div className="py-4">
        <div className="pb-2 mb-4">
          <Link prefetch withData
            href={`/courses/show?uid=${course.uid}`} 
            as={`/courses/${course.uid}`}>
            <a className="no-underline">{`${RichText.asText(course.data.title)}` }</a>
          </Link>
        </div>
        {
          lessons && lessons.map((lesson) =>
            <div key={lesson.uid} className="pb-2">
              <Link prefetch withData
                  href={`/lessons/show?uid=${lesson.uid}`} 
                  as={`/lessons/${lesson.uid}`}>
                  <a className="no-underline">{`${RichText.asText(lesson.data.title).split(": ")[0]}` }</a>
                </Link>
            </div>
          )
        }

      </div>
    );
  }
}