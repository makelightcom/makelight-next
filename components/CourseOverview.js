import React, { Fragment } from "react";
import { RichText, Date } from "prismic-reactjs";
import Prismic, { Predicates } from "prismic-javascript";
import PrismicConfig from "../prismic.config.js";
import Query from "./prismic/Query";
import SquareArticleImage from "./SquareArticleImage";
import truncate from "truncate";

export default class CourseOverview extends React.Component {
  render() {
    const { course } = this.props;
    return (
      <div>
        <Query
          url={PrismicConfig.apiEndpoint}
          query={[
            [
              Predicates.any("document.type", ["lesson"]),
              Predicates.at("my.lesson.course", course.id)
            ],
            {
              pageSize: "50",
              orderings: ["[my.lesson.number]"]
            }
          ]}
        >
          {({ loading, prismic, error }) => (
            <Fragment>
              {!loading &&
                prismic && (
                  <div className="lesson-list">
                    {prismic.results.map(item => (
                      <div
                        key={item.id}
                        className="relative bg-white p-2 block clearfix flex"
                      >
                        <span className="-m-2 w-12 inline-block float-left">
                          {item.data.image && item.data.image.url ? (
                            <SquareArticleImage
                              useImgix={true}
                              imageUrl={item.data.image.url}
                            />
                          ) : (
                            <div className="bg-grey h-12 w-12" />
                          )}
                        </span>
                        <span className="ml-4 float-left py-1 text-grey-darker">
                          {truncate(RichText.asText(item.data.title), 128)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
            </Fragment>
          )}
        </Query>
        <style jsx>{`
          @media (min-width: 769px) {
            .lesson-list {
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: 0.5rem;
            }
          }

          @media (max-width: 768px) {
            .lesson-list {
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: 0.5rem;
            }
          }
        `}</style>
      </div>
    );
  }
}
