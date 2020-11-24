let initialState = {
  networkOff: false
}

const NetworkReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NETWORK_OFF':
      return {
        ...state,
        networkOff: true
      }
    case 'NETWORK_ON':
      return {
        ...state,
        networkOff: false
      }
    default:
      return state
  } 
}

export default NetworkReducer
