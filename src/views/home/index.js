import { connect } from 'react-redux';
import Home from './home'

function mapStateToProps(state) {
  return {
    test: state.home.test,
    testData: state.home.testData
  };
}

export default connect(mapStateToProps)(Home);