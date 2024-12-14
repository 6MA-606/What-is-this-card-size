import { useState } from "react"
import { useCardDispatchContext, useCardStateContext } from "../contexts/CardContext"
import CARD_ACTIONS from "../enums/cardActions"
import ImageInput from "./ImageInput"
import NumberInput from "./NumberInput"
import ToggleInput from "./ToggleInput"

function InputSection() {

  const {
    width,
    height,
    round,
    isOutlineMode,
  } = useCardStateContext()

  const dispatch = useCardDispatchContext()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleWidthChange = (event) => {
    dispatch({ type: CARD_ACTIONS.SET_WIDTH, payload: Number(event.target.value) })
  }

  const handleHeightChange = (event) => {
    dispatch({ type: CARD_ACTIONS.SET_HEIGHT, payload: Number(event.target.value) })
  }

  const handleRoundChange = (event) => {
    dispatch({ type: CARD_ACTIONS.SET_ROUND, payload: Number(event.target.value) })
  }

  const handleToggleOutlineMode = () => {
    dispatch({ type: CARD_ACTIONS.TOGGLE_OUTLINE_MODE })
  }

  const handleImageUrlChange = (event) => {
    dispatch({ type: CARD_ACTIONS.SET_IMAGE_URL, payload: event.target.value })
  }

  return (
    <>
      <div className={ `sm:hidden absolute w-full flex justify-center transition-transform duration-500 ${isMenuOpen ? 'translate-y-[0rem]' : 'translate-y-[calc(100vh-17rem)]'}` }>
        <button
          className="bg-base-100 bg-opacity-80 w-20 h-20 rounded-t-full flex justify-center items-center"
          onClick={ () => setIsMenuOpen(!isMenuOpen) }
        >
          <svg className={ `transition-transform duration-500 ${ isMenuOpen ? 'rotate-180' : '' }`} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
          </svg>
        </button>
      </div>
      <section className={`fixed sm:static h-[calc(100vh-4rem)] bg-base-100 bg-opacity-80 sm:bg-transparent sm:h-full p-4 transition-transform duration-500 sm:translate-y-0 ${isMenuOpen ? 'translate-y-[4rem]' : 'translate-y-[calc(100vh-13rem)]'}`}>
        <form className="w-full h-full flex flex-col gap-4">
          <div className="flex-none flex flex-col gap-2">
            <NumberInput
              label="Width"
              min={ 32 }
              max={ 128 }
              step={ 1 }
              value={ width }
              onChange={ handleWidthChange }
            />
            <NumberInput
              label="Height"
              min={ 45 }
              max={ 180 }
              step={ 1 }
              value={ height }
              onChange={ handleHeightChange }
            />
            <NumberInput
              label="Round"
              min={ 0 }
              max={ 20 }
              step={ 1 }
              value={ round }
              onChange={ handleRoundChange }
            />
            <ToggleInput
              label="Outline"
              checked={ isOutlineMode }
              onChange={ handleToggleOutlineMode }
            />
          </div>
          <div className="divider m-0" />
          <div className="flex-grow">
            <ImageInput
              label="Card Image"
              onChange={ handleImageUrlChange }
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default InputSection
