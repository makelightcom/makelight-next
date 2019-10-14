import Prismic from 'prismic-javascript';
import invariant from 'invariant';


//$FlowFixMe https://github.com/facebook/flow/issues/183
var query = function query(_ref) {
  var url = _ref.url,
      _ref$apiOptions = _ref.apiOptions,
      apiOptions = _ref$apiOptions === undefined ? {} : _ref$apiOptions,
      _ref$query = _ref.query,
      query = _ref$query === undefined ? false : _ref$query,
      _ref$predicates = _ref.predicates,
      predicates = _ref$predicates === undefined ? '' : _ref$predicates,
      _ref$predicateOptions = _ref.predicateOptions,
      predicateOptions = _ref$predicateOptions === undefined ? {} : _ref$predicateOptions;

  !url ? process.env.NODE_ENV !== 'production' ? invariant(false, 'No url prop passed. Make sure you pass in an api url ' + 'via the "url" prop.') : invariant(false) : void 0;
  !(query || predicates || predicateOptions) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'You must pass a query, predicates, or options. ') : invariant(false) : void 0;
  return Prismic.api(url, apiOptions).then(function (api) {
    if (query) {
      return api.query.apply(api, query);
    }
    return api.query(predicates, predicateOptions);
  });
};

var queryById = function queryById(_ref2) {
  var url = _ref2.url,
      _ref2$apiOptions = _ref2.apiOptions,
      apiOptions = _ref2$apiOptions === undefined ? {} : _ref2$apiOptions,
      id = _ref2.id,
      _ref2$predicateOption = _ref2.predicateOptions,
      predicateOptions = _ref2$predicateOption === undefined ? {} : _ref2$predicateOption,
      _ref2$additionalOptio = _ref2.additionalOptions,
      additionalOptions = _ref2$additionalOptio === undefined ? {} : _ref2$additionalOptio;

  !url ? process.env.NODE_ENV !== 'production' ? invariant(false, 'No url prop passed. Make sure you pass in an api url ' + 'via the "url" prop.') : invariant(false) : void 0;
  !id ? process.env.NODE_ENV !== 'production' ? invariant(false, 'No id prop passed. Make sure you pass in a document' + 'id via the "id" prop.') : invariant(false) : void 0;
  return Prismic.api(url, apiOptions).then(function (api) {
    return api.getByID(id, additionalOptions);
  });
};

var queryByUid = function queryByUid(_ref3) {
  var url = _ref3.url,
      _ref3$apiOptions = _ref3.apiOptions,
      apiOptions = _ref3$apiOptions === undefined ? {} : _ref3$apiOptions,
      uid = _ref3.uid,
      type = _ref3.type,
      _ref3$additionalOptio = _ref3.additionalOptions,
      additionalOptions = _ref3$additionalOptio === undefined ? {} : _ref3$additionalOptio;

  !url ? process.env.NODE_ENV !== 'production' ? invariant(false, 'No url prop passed. Make sure you pass in an api url ' + 'via the "url" prop.') : invariant(false) : void 0;
  !uid ? process.env.NODE_ENV !== 'production' ? invariant(false, 'No uid prop passed. Make sure you pass in a document' + 'type via the "uid" prop.') : invariant(false) : void 0;
  !type ? process.env.NODE_ENV !== 'production' ? invariant(false, 'No type prop passed. Make sure you pass in a document' + 'type via the "type" prop.') : invariant(false) : void 0;
  return Prismic.api(url, apiOptions).then(function (api) {
    return api.getByUID(type, uid, additionalOptions);
  });
};
export { query, queryById, queryByUid };