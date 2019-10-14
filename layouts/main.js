import Nav from "../components/nav";
import React, { Component, Fragment } from "react";
import { MediaQueryProvider } from "react-media-query-hoc";
import Footer from "../components/Footer";
import Fade from "react-reveal/Fade";
import Router from "next/router";
import { ParallaxProvider } from "react-scroll-parallax";
import { getUserFromServerCookie, getUserFromLocalCookie } from "../utils/auth";
import Link from "next/link";

export default class Main extends React.Component {
  values = {
    width: 300,
    type: "screen"
  };

  state = {
    currentUser: null
  };

  constructor(props) {
    super(props);
    this.plyrStyles = React.createRef();
  }

  componentDidMount() {
    const currentUser = process.browser
      ? getUserFromLocalCookie()
      : getUserFromServerCookie(ctx.req);
    this.setState({
      currentUser: currentUser,
      isAuthenticated: !!currentUser
    });
  }

  render() {
    const { children, router } = this.props;
    const { currentUser } = this.state;

    return (
      <ParallaxProvider>
        <div className="main-grid">
          <main>
            <div className="">
              <MediaQueryProvider
                values={typeof window === "undefined" ? this.values : null}
              >
                <Nav router={router} route={router.route} />
              </MediaQueryProvider>
            </div>

            {children}
            {/*<div className={currentUser ? "with-side-menu" : "without-side-menu"}>
              {currentUser && 
                <div className="side-menu">
                  Menu 
                </div>
              }
              <div className="side-menu-main">
                { children }  
              </div>
            </div>  */}
          </main>
          <Footer />
          <style jsx>{`
            .main-grid {
              display: grid;
              grid-template-rows: minmax(100vh, auto) 50vh;
              margin-bottom: -50vh;
            }

            .with-side-menu {
              display: grid;
              grid-template-columns: 80px 1fr;
              height: 100%;
            }

            .side-menu {
              background-color: #eee;
            }

            .makelight-icon {
              line-height: 0px;
            }
          `}</style>
        </div>
      </ParallaxProvider>
    );
  }
}
