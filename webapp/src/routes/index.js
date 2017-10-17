// We only need to import the modules necessary for initial render
import SearchRoute from './Search'

export const createRoutes = (store) => ({
  onEnter: async (nextState, replace, cb) => {
    // TODO: Do something on enter here

    cb()
  },
  getComponent (nextState, cb) {
    require.ensure([], require => {
      const CoreLayout = require('../layouts/CoreLayout').default

      cb(null, CoreLayout)
    }, 'core')
  },
  childRoutes: [
    SearchRoute(store),
  ]
})

export default createRoutes
