import Link from "./DataPrefetchLink";
import Icon from "../static/makelight-icon.svg";
import React from "react";
import Headroom from "react-headroom";
import Fade from "react-reveal/Fade";
import css from "styled-jsx/css";
import SocialIconsRow from "./SocialIconsRow";
import glamorous from "glamorous";
import { getUserFromServerCookie, getUserFromLocalCookie } from "../utils/auth";

const IconListItem = glamorous.li(tw("block"));
const MakelightLogoA = glamorous.a(
  tw(
    "pointer-events-auto cursor-pointer sm:py-0 md:py-1 sm:px-2 md:px-2 lg:px-2 xl:px-2 font-sans font-light block text-left text-grey-dark hover:text-teal"
  )
);
const DesktopNavLink = glamorous.a(
  tw(
    "tracking-wide no-underline animated-underline pointer-events-auto cursor-pointer p-3 block font-sans font-light text-grey-dark hover:text-teal"
  )
);
const MobileOnlyLi = glamorous.li(
  tw("font-sans inline-block lg:hidden xl:hidden")
);
const DesktopOnlyLi = glamorous.li(
  tw("text-right font-sans hidden lg:inline-block xl:inline-block")
);
const Navigation = glamorous.nav(tw("font-sans font-light w-full pa-0 m-0"));

const globalStyles = css`
  .animated-underline a {
    position: relative;
    text-align: center;
  }

  .animated-underline a:before {
    content: "";
    position: absolute;
    width: 50%;
    height: 4px;
    bottom: 0;
    left: 25%;

    background-color: #ffeeaa;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  .animated-underline:hover span {
    color: #222;
  }

  .mobile-subnav .animated-underline a:before{
    background-color: #ffaaaa;
  }

  .animated-underline a:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`;

const styles = css`
  nav {
    text-align: center;
  }

  ul {
    list-style-type: none;
    padding-left: 0px;
  }
  a {
    color: #444444;
    text-decoration: none;
    font-size: 17px;
  }

  .desktop-nav-menu-items {
    text-align: right;
  }

  @media (min-width: 769px) {
    .nav-menu {
      display: grid;
      grid-template-columns: 48px 180px 1fr;
      grid-gap: 0.5rem;
      width: 100%;
      padding: 1rem;
      margin: 0px;
    }

    .mobile-subnav {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .nav-menu {
      display: grid;
      grid-template-columns: 32px 180px 1fr;
      grid-gap: 0.5rem;
      width: 100%;
      padding: 1rem;
      margin: 0px;
    }

    .mobile-subnav {
      min-height: 100vh;
      transition: background-color 0.5s;
      transition-timing-function: ease-in-out;
    }

    .mobile-subnav-container {
      transition: background-color 0.5s;
      transition-timing-function: ease-in-out;
    }

    .mobile-subnav-container-active {
      background-color: rgba(255, 235, 235, 1);
    }

    .mobile-subnav-container-inactive {
      background-color: rgba(255, 235, 235, 0);
    }
  }

  .mobile-subnav {
    min-height: 100vh;
  }
  .mobile-subnav li {
    margin: 0px;
    margin-bottom: -2px;
  }

  .makelight-icon {
    line-height: 0px;
  }

  .icon-link::after {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

class Nav extends React.Component {
  state = {
    menuActive: false
  };

  componentDidMount() {
    const currentUser = process.browser
      ? getUserFromLocalCookie()
      : getUserFromServerCookie(ctx.req);
    this.setState({
      menuActive: false,
      currentUser: currentUser,
      isAuthenticated: !!currentUser
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.route !== this.props.route) {
      this.setState({ menuActive: false });
    }
  }

  toggleActive = () => {
    this.setState({ menuActive: !this.state.menuActive });
  };

  render() {
    let links = [
      { href: "/online-courses", label: "Courses" },
      // { href: "/podcasts", label: "Podcast" },
      { href: "/membership", label: "Membership" },
      { href: "/free", label: "Free!" },
      //{ href: "https://ukstore.makelight.com", label: "Store", internal: false },
      { href: "/blog", label: "Blog" }
    ];
    if (this.state.isAuthenticated) {
      links.push({ href: "/dashboard", label: "Dashboard" });
    } else {
      links.push({ href: "/about", label: "About" });
      links.push({
        //href: '/auth/sign-in',
        href: "https://makelight.com/auth/signup",
        label: "Sign in",
        internal: false
      });
    }

    links.map(link => {
      link.key = `nav-link-${link.href}-${link.label}`;
      return link;
    });

    const toggleActive = this.toggleActive;

    return (
      <div className="font-sans">
        <style jsx global>
          {globalStyles}
        </style>
        <style jsx>{styles}</style>
        <Headroom>
          <Navigation style={{ backgroundColor: "rgba(255,255,255,0.8275)" }}>
            <ul className="nav-menu">
              <IconListItem>
                <Link prefetch withData href="/">
                  <a
                    aria-label={`Makelight home`}
                    href="/"
                    className="makelight-icon block"
                  >
                    <Icon style={{ width: "100%", height: "100%" }} />
                  </a>
                </Link>
              </IconListItem>
              <li className="leading-none">
                <Link prefetch withData href="/">
                  <MakelightLogoA>
                    <span className="block m-auto text-left leading-none tracking-wide text-lg lg:text-xl xl:text-2xl">
                      Makelight
                    </span>
                    <span className="block m-auto text-left tracking-wide uppercase text-xs lg:text-xs xl:text-xs font-light font-sans pt-1 block">
                      by Emily Quinton
                    </span>
                  </MakelightLogoA>
                </Link>
              </li>
              <MobileOnlyLi>
                <div className="text-right">
                  <a
                    className={`burger-cross w-6 block float-right ${
                      this.state.menuActive ? "active" : "inactive"
                    }`}
                    onClick={toggleActive}
                  >
                    <span>
                      <span className="top h-1 block bg-grey w-full my-1" />
                      <span className="middle h-1 block bg-grey w-full my-1" />
                      <span className="bottom h-1 block bg-grey w-full my-1" />
                    </span>
                  </a>
                </div>
              </MobileOnlyLi>

              <DesktopOnlyLi>
                <ul className="desktop-nav-menu-items h-100 inline-block">
                  {links.map(({ key, href, label, asPath, internal }, index) => (
                    <li className="inline-block p-2 animated-underline" key={key}>
                      {internal !== false && (
                        <Link
                          prefetch
                          withData
                          href={href}
                          as={asPath ? asPath : href}
                        >
                          <DesktopNavLink href={href} onClick={toggleActive}>
                            <span style={{color: `hsl(${170 + (170*index/links.length)} 45% 60%)`}}>{label}</span>
                          </DesktopNavLink>
                        </Link>
                      )}
                      {internal === false && (
                        <DesktopNavLink href={href}>
                          <span style={{color: `hsl(${170 + (170*index/links.length)} 45% 70%)`}}>
                            {label}
                          </span></DesktopNavLink>
                      )}
                    </li>
                  ))}
                  <li className="inline-block p-2">
                    <SocialIconsRow />
                  </li>
                  {this.state.currentUser && (
                    <li className="p-2 inline-block">
                      <img
                        className="inline-block rounded-full"
                        src={this.state.currentUser.picture}
                        width="25"
                        height="25"
                      />
                    </li>
                  )}
                </ul>
              </DesktopOnlyLi>
            </ul>
            <div
              className={`lg:hidden xl:hidden absolute w-full mobile-subnav-container ${
                this.state.menuActive
                  ? "mobile-subnav-container-active"
                  : "mobile-subnav-container-inactive"
              }`}
              style={{ top: "64px" }}
            >
              <Fade collapse bottom when={this.state.menuActive}>
                <ul className={`mobile-subnav w-full text-center py-12`}>
                  {links.map(({ key, href, label, asPath, internal }) => (
                    <li className="animated-underline" key={key}>
                      {internal !== false && (
                        <Link
                          prefetch
                          withData
                          href={href}
                          as={asPath ? asPath : href}
                        >
                          <a
                            href={href}
                            className="p-3 block font-title text-teal-dark hover:text-teal"
                          >
                            {label}
                          </a>
                        </Link>
                      )}
                      {internal === false && (
                        <a
                          href={href}
                          className="p-3 block font-title text-teal-dark hover:text-teal"
                        >
                          {label}
                        </a>
                      )}
                    </li>
                  ))}
                  <li className="py-8">
                    <SocialIconsRow />
                  </li>
                </ul>
              </Fade>
            </div>
          </Navigation>
        </Headroom>
        <style jsx>{`
          .nav-menu {
            width: 100%;
            overflow: hidden;
          }

          @media (min-width: 769px) {
            .nav-menu {
              height: 83px;
            }
          }

          .burger-cross:focus {
            outline: 0;
          }

          .active .middle {
            opacity: 0;
          }

          .top,
          .bottom,
          .middle {
            transition: all 0.5s ease-in-out;
          }

          .active .top {
            transform: translate(0px, 8px) rotate(-45deg);
          }

          .active .bottom {
            transform: translate(0px, -8px) rotate(45deg);
          }
        `}</style>
      </div>
    );
  }
}

export default Nav;
