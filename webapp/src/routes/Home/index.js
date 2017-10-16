export default (store) => ({
  path: '/',
  getIndexRoute(partialNextState, cb) {
    require.ensure([], require => {
      const Home = require('./containers/HomeContainer').default
      cb(null, { component: Home })
    }, 'home')
  },
});

