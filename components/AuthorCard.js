import React, { Fragment } from "react";
import Sticky from "react-sticky-el";
import ContentIcon from "./ContentIcon";
import SocialIconsRow from "./SocialIconsRow";
import FacebookLike from "./FacebookLike";
import PrismicConfig from "../prismic.config.js";
import Fade from "react-reveal/Fade";
import { RichText } from "prismic-reactjs";
import { Parallax } from "react-scroll-parallax";

export default class AuthorCard extends React.Component {
  render() {
    const { author } = this.props;

    return (
      <Parallax offsetYMax={20} offsetYMin={-20}>
        <div className="lg:pt-12 text-center lg:text-left">
          <Fade bottom distance="50px" delay={600}>
            <div className="p-4 bg-white">
              <img
                alt={`Photo of ${RichText.asText(author.data.name)}`}
                className="lg:m-auto rounded-full inline-block"
                src={author.data["profile-image"]["square-200"].url}
                width="100"
                height="100"
              />
              <h3 className="font-sans font-light text-2xl text-grey-darkest mb-2 no-underline">
                {RichText.asText(author.data.name)}
              </h3>

              <div>
                {author.data.description &&
                  RichText.render(
                    author.data.description,
                    PrismicConfig.linkResolver
                  )}
              </div>
              <div>
                <SocialIconsRow />
              </div>
              <FacebookLike />
            </div>
          </Fade>
        </div>
      </Parallax>
    );
  }
}
