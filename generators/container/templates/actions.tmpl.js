module.exports = ({ name, pascalCasedName }) => {
  return `
import Network from '../../utils/network';

const actions = {
  test: (msg) => {
    return {
      type: "TEST",
      payload: msg
    }
  },
  getTestData: () => {
    return async dispatch => {
      dispatch({type: "GET_TEST_DATA_PENDING"});
    
      try {
        let response = await Network.get('/test');
        dispatch({type: "GET_TEST_DATA_SUCCESS", payload: response.data});
      } catch (error) {
        dispatch({type: "GET_TEST_DATA_FAILED", payload: error.message});
      }
    }
  }
};

export default actions;
`
};
