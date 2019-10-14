import { string, bool } from 'prop-types'
import ArticleCard from '../components/ArticleCard'
import React, { Fragment } from 'react'

class ArticleList extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string,
    showCategories: bool
  }

  defaultPropTypes = {
    showCategories: true
  }
  render () {
    const props = this.props
    return <div className="bg-white lg:bg-grey-lighter xl:bg-grey-lighter">
      <section className='card-container pa-1 md:p-8 lg:p-10 xl:p-10'>
        {props.articles.map((article, index) => 
          <div className="article-card" key={article.uid} >
            <ArticleCard 
              document={article} 
              renderImageServerSide={index < 4}
              showCategories={props.showCategories || true}></ArticleCard>
            
          </div>
        )}
      </section>
      <style jsx>{`

        .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
            grid-gap: 4rem;
            max-width: 90rem;
            margin: auto;
        }        

        `}</style>
    </div>
  }
}

export default ArticleList
