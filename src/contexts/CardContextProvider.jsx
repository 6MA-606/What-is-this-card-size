import PropTypes from "prop-types"
import { createContext, useReducer } from "react"
import CARD_ACTIONS from "../enums/cardActions"

const initialState = Object.freeze({
  width: 64,
  height: 89,
  round: 0,
  imageUrl: '',
  isOutlineMode: false,
})

function reducer(state, action) {
  const { type, payload } = action
  switch (type) {
    case CARD_ACTIONS.SET_WIDTH:
      return { ...state, width: payload }
    case CARD_ACTIONS.SET_HEIGHT:
      return { ...state, height: payload }
    case CARD_ACTIONS.RESET_CARD_SIZE:
      return { ...initialState }
    case CARD_ACTIONS.SET_ROUND:
      return { ...state, round: payload }
    case CARD_ACTIONS.SET_IMAGE_URL:
      return { ...state, imageUrl: payload }
    case CARD_ACTIONS.TOGGLE_OUTLINE_MODE:
      return { ...state, isOutlineMode: !state.isOutlineMode }
    default:
      return state
  }
}

const CardStateContext = createContext()
const CardDispatchContext = createContext()

function CardContextProvider(props) {

  const { children } = props

  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <CardStateContext.Provider value={state}>
      <CardDispatchContext.Provider value={dispatch}>
        { children }
      </CardDispatchContext.Provider>
    </CardStateContext.Provider>
  )
}

CardContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { CardContextProvider as default, CardStateContext, CardDispatchContext }