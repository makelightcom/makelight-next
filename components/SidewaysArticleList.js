import { string, bool } from "prop-types";
import ArticleCard from "../components/ArticleCard";
import React, { Fragment } from "react";
import Link from "next/link";

class SidewaysArticleList extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string,
    showCategories: bool
  };

  defaultPropTypes = {
    showCategories: true
  };
  render() {
    const props = this.props;
    return (
      <div className="relative sideways-container">
        <section className="absolute card-container pa-1 md:p-8 lg:p-10 xl:p-10">
          {props.articles.map(article => (
            <div className="article-card" key={article.uid}>
              <ArticleCard
                document={article}
                showCategories={props.showCategories || true}
              />
            </div>
          ))}
          <div>
            <Link href="/">
              <a href="/">All articles</a>
            </Link>
          </div>
        </section>
        <style jsx>{`
          .sideways-container {
            min-height: 40rem;
            overflow-x: scroll;
            overflow-y: hidden;
            width: 100%;
            -webkit-overflow-scrolling: touch;
          }
          .card-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, 16rem);
            grid-gap: 2rem;
            width: ${(props.articles.length + 1) * 20}rem;
            margin: auto;
          }
        `}</style>
      </div>
    );
  }
}

export default SidewaysArticleList;
