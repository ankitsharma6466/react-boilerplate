export default (state = {
  loader: false,
  testData: {},
  test: ""
}, action) => {
  switch (action.type) {
  
    case "TEST":
      return {...state, test: action.payload};
    
    case "GET_TEST_DATA_PENDING":
      return {...state, loader: true};
  
    case "GET_TEST_DATA_SUCCESS":
      return {...state, loader: false, testData: action.payload};
    
    case "GET_TEST_DATA_FAILED":
      return {...state, loader: false};
      
    default: return state;
  }
};