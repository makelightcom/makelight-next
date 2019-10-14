import { string, bool } from 'prop-types'
import CategoryCard from '../components/CategoryCard'
import React, { Fragment } from 'react'

const defaultDescription = ''
const defaultOGURL = ''
const defaultOGImage = ''

class CategoryCardList extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string
  }

  render () {
    const props = this.props
    return <div>
      <section className="card-container">
        {props.categories.map((lesson) => 
          <CategoryCard key={lesson.uid} document={lesson} />
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

export default CategoryCardList
