import { connect } from 'react-redux'

import HomeView from '../components/HomeView'

import { connectToAPI, search } from 'store/modules/app'

const mapActionCreators = {
  connectToAPI,
  search,
}

const mapStateToProps = (state) => ({
  app: state.app
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)


