export default (store) => ({
  path: '/',
  getIndexRoute(partialNextState, cb) {
    require.ensure([], require => {
      const Search = require('./containers/SearchContainer').default
      cb(null, { component: Search })
    }, '/')
  },
});

