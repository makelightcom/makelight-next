import Link from "next/link";
import { resolve, parse, format } from "url";
import Router from "next/router";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

export default class DataPrefetchLink extends Link {
  static propTypes = exact({
    withData: PropTypes.bool,
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    isHovering: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.element,
      (props, propName) => {
        const value = props[propName];

        if (typeof value === "string") {
          warnLink(
            `Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>`
          );
        }

        return null;
      }
    ]).isRequired
  });

  prefetch() {
    if (typeof window === "undefined" || !this.props.prefetch) {
      return;
    }

    const { pathname } = window.location;
    const hrefString =
      this.props.href !== "string" ? format(this.props.href) : this.props.href;
    const href = resolve(pathname, hrefString);
    const { query } = parse(href, true);

    return Router.prefetch(href).then(Component => {
      if (
        this.props.withData &&
        Component &&
        Component.getInitialProps &&
        typeof Component.getInitialProps === "function"
      ) {
        const ctx = { pathname: href, query, isVirtualCall: true };
        console.log("Preload getInitialProps", ctx);
        return Component.getInitialProps(ctx).then(() => Component);
      }
    });
  }
}
