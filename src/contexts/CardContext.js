import { useContext } from "react";
import { CardDispatchContext, CardStateContext } from "./CardContextProvider";

const useCardStateContext = () => {
  
  const context = useContext(CardStateContext)

  if (context === undefined) {
    throw new Error('useCardStateContext must be used within a CardContextProvider')
  }

  return context
}

const useCardDispatchContext = () => {
  
  const context = useContext(CardDispatchContext)

  if (context === undefined) {
    throw new Error('useCardDispatchContext must be used within a CardContextProvider')
  }

  return context
}

export { useCardStateContext, useCardDispatchContext }
