var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { query as prismicQuery } from '../queries';

//$FlowFixMe https://github.com/facebook/flow/issues/183
export default function withQuery(_ref) {
  var url = _ref.url,
      _ref$apiOptions = _ref.apiOptions,
      apiOptions = _ref$apiOptions === undefined ? {} : _ref$apiOptions,
      _ref$queryKey = _ref.queryKey,
      queryKey = _ref$queryKey === undefined ? '' : _ref$queryKey,
      _ref$query = _ref.query,
      query = _ref$query === undefined ? false : _ref$query,
      _ref$predicates = _ref.predicates,
      predicates = _ref$predicates === undefined ? '' : _ref$predicates,
      _ref$predicateOptions = _ref.predicateOptions,
      predicateOptions = _ref$predicateOptions === undefined ? {} : _ref$predicateOptions;

  return function (ComposedComponent) {
    return function (_React$Component) {
      _inherits(withQuery, _React$Component);

      function withQuery(props) {
        _classCallCheck(this, withQuery);

        var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this2.state = {
          loading: true,
          prismic: {},
          error: false
        };
        return _this2;
      }

      withQuery.prototype.componentDidMount = function componentDidMount() {
        var _this = this;
        prismicQuery({ url: url, apiOptions: apiOptions, query: query, predicates: predicates, predicateOptions: predicateOptions }).then(function (response) {
          _this.setState({ loading: false, prismic: response });
        }).catch(function (err) {
          _this.setState({ loading: false, error: err });
        });
      };

      withQuery.prototype.render = function render() {
        var _prismic;

        var keyed = queryKey.length > 0;
        var prismic = (_prismic = {
          queryKey: keyed ? queryKey : false
        }, _prismic[keyed ? queryKey + 'Loading' : 'loading'] = this.state.loading, _prismic[keyed ? queryKey + 'Error' : 'error'] = this.state.error, _prismic[keyed ? queryKey + 'Prismic' : 'prismic'] = this.state.prismic, _prismic);
        return React.createElement(ComposedComponent, _extends({}, this.props, prismic));
      };

      return withQuery;
    }(React.Component);
  };
}