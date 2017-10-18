import { connect } from 'react-redux'

import Search from '../components/Search'

import { search } from 'store/modules/app'

const mapActionCreators = {
  search,
}

const mapStateToProps = (state) => ({
  searchResult: state.app.get('searchResult'),
})

export default connect(mapStateToProps, mapActionCreators)(Search)


