import Head from "next/head";
import { string, object } from "prop-types";
import React, { Fragment } from "react";
import ImgixClient from "imgix-core-js";

const defaultDescription =
  "Grow your creative life with support from an inspirational community of makers and doers";
const defaultOGURL = null;
const defaultOGImage =
  "https://prismic-io.s3.amazonaws.com/makelight/9382015e-22fd-4399-96fa-df5456add022_square-sharing-image1200.png";

class PageHead extends React.Component {
  static propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string,
    og: object
  };

  static defaultProps = {
    og: {}
  };

  render() {
    const { props, state } = this;
    const { og } = props;
    const client = new ImgixClient({
      host: "makelight-prismic-images.imgix.net"
    });

    let sharingImage
    if(props.ogImage) {
      sharingImage = client.buildURL(
        (props.ogImage || defaultOGImage).split("/").pop(),
        {
          w: 1200,
          h: 630,
          fit: "crop",
          crop: "entropy",
          auto: "format"
        }
      )
    } else {
      sharingImage = client.buildURL(
        (defaultOGImage).split("/").pop(),
        {
          w: 1200,
          h: 1200,
          fit: "crop",
          crop: "entropy",
          auto: "format"
        }
      )
    }

    return (
      <Head>
        <meta charSet="UTF-8" />
        <title>{props.title || "Makelight"}</title>
        <meta
          name="description"
          content={props.description || defaultDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
        <link rel="apple-touch-icon" href="/static/touch-icon.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
        <link rel="icon" href="/static/favicon.ico" />
        {(props.url || defaultOGURL) && (
          <meta property="og:url" content={props.url || defaultOGURL} />
        )}
        <meta property="og:title" content={props.title || ""} />
        <meta
          property="og:description"
          content={props.description || defaultDescription}
        />
        <meta name="twitter:site" content={props.url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={sharingImage} />
        {typeof og["og:type"] === undefined && (
          <meta name="og:type" content="article" />
        )}
        {Object.entries(props.og).map(item => (
          <meta key={item[0]} name={item[0]} content={item[1]} />
        ))}
        <meta property="og:image" content={sharingImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta content="Makelight" property="og:site_name" />
        <meta content="379839278887820" property="fb:app_id" />
        {props.children}
      </Head>
    );
  }
}
export default PageHead;
