function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { queryById } from '../queries';

var DocumentById = function (_React$Component) {
  _inherits(DocumentById, _React$Component);

  function DocumentById(props) {
    _classCallCheck(this, DocumentById);

    var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this2.componentDidMount = function () {
      var _this = _this2;
      queryById({ url: _this2.props.url, apiOptions: _this2.props.apiOptions, id: _this2.props.id, additionalOPtions: _this2.props.queryOptions }).then(function (response) {
        _this.setState({ loading: false, prismic: response });
      }).catch(function (err) {
        _this.setState({ loading: false, error: err });
      });
    };

    _this2.state = {
      loading: true,
      prismic: false,
      error: false
    };
    return _this2;
  }

  DocumentById.prototype.render = function render() {
    var _prismic;

    var keyed = this.props.queryKey.length > 0;
    var prismic = (_prismic = {
      queryKey: keyed ? this.props.queryKey : false
    }, _prismic[keyed ? this.props.queryKey + 'Loading' : 'loading'] = this.state.loading, _prismic[keyed ? this.props.queryKey + 'Error' : 'error'] = this.state.error, _prismic[keyed ? this.props.queryKey + 'Prismic' : 'prismic'] = this.state.prismic, _prismic);
    return React.createElement(
      'div',
      null,
      this.props.children(prismic)
    );
  };

  return DocumentById;
}(React.Component);

DocumentById.defaultProps = {
  queryKey: '',
  apiOptions: {},
  queryOptions: {}
};
export default DocumentById;