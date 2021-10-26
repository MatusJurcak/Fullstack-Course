const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodArray = {
        ...state,
        good: state.good + 1
      }
      return goodArray
    case 'OK':
      const okArray = {
        ...state,
        ok: state.ok + 1
      }
      return okArray
    case 'BAD':
      const badArray = {
        ...state,
        bad: state.bad + 1
      }
      return badArray
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer