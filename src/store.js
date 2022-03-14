import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  imageUrl: '',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'setimageurl':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
