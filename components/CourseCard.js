import { string, bool } from "prop-types";
import { RichText, Date } from "prismic-reactjs";
import SquareArticleImage from "./SquareArticleImage";
import Link from "./DataPrefetchLink";
import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
import PrismicDOM from "prismic-dom";
import PrismicConfig from "../prismic.config.js";
import ArticleContentIcons from "./ArticleContentIcons";
import { asText } from "../utils/prismic";

const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

class CourseCard extends React.Component {
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

  state = {
    fadeDelay: 0
  };

  componentWillMount() {
    this.setState({ fadeDelay: Math.random() * 1000 });
  }

  render() {
    let data;
    let image;
    let uid;
    let slug;

    const { document: doc, course } = this.props;
    const { fadeDelay } = this.state;
    if (course) {
      data = course;
      image = course.image_url;
      slug = course.slug;
    } else {
      data = doc.data;
      image = data.image.url;
      slug = doc.uid;
    }

    if (!image) {
      return <div>Problem displaying course</div>;
    }

    return (
      <div className="relative" style={{ paddingBottom: "120%" }}>
        <div className="absolute pin-top z-1 h-full w-full">
          <Fade up distance="50px" delay={fadeDelay} duration={500}>
            <div className="relative h-full max-w-m rounded overflow-hidden no-underline">
              <Link href={`/courses/show?uid=${slug}`} as={`/courses/${slug}`}>
                <a className="no-underline text-pink relative">
                  <div className="z-1 relative">
                    {image && (
                      <SquareArticleImage nopin={true} imageUrl={image} />
                    )}
                  </div>
                </a>
              </Link>
            </div>
          </Fade>
        </div>
        <div className="px-6 py-4 absolute z-10" style={{ top: "50%" }}>
          <Fade up distance="50px" delay={fadeDelay + 250} duration={500}>
            <div className="bg-white p-4 text-left bg-pink-lightest">
              <div className="font-title font-bold text-xl mb-2 no-underline">
                <Link
                  prefetch
                  withData
                  href={`/courses/show?uid=${slug}`}
                  as={`/online-courses/${slug}`}
                >
                  <a className="no-underline text-pink relative">
                    {asText(data.title)}
                  </a>
                </Link>
              </div>
              <div className="font-body font-light font-title text-grey-darker mb-2 no-underline opacity-75">
                {asText(data.headline)}
              </div>
              {true && (
                <div className="inline-block">
                  <Link
                    prefetch
                    withData
                    href={`/courses/show?uid=${slug}`}
                    as={`/online-courses/${slug}`}
                  >
                    <a className="bg-white text-grey-darker px-4 py-2 block no-underline">
                      Learn more
                    </a>
                  </Link>                  
                </div>
              )}
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

export default CourseCard;
