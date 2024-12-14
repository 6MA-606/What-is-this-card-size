import PropTypes from "prop-types"
import { mmToPixels } from "../libs/utils"
import { useCallback, useEffect, useState } from "react"

function Card(props) {
  const {
    width,
    height,
    round,
    imageUrl,
    isOutlineMode
  } = props

  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio)

  const getLatestStyle = useCallback(() => ({
    width: mmToPixels(width, devicePixelRatio) + 'px',
    height: mmToPixels(height, devicePixelRatio) + 'px',
    borderRadius: mmToPixels(round, devicePixelRatio) + 'px'
  }), [width, height, round, devicePixelRatio])

  const [style, setStyle] = useState(getLatestStyle())

  const handleWindowResize = () => {
    setDevicePixelRatio(window.devicePixelRatio)
  }

  window.addEventListener('resize', handleWindowResize)

  useEffect(() => {
    setStyle(getLatestStyle())
  }, [getLatestStyle])

  return (
    <>
      <div
        className="absolute flex items-center border-x-2 border-base-content"
        style={{
          width: style.width,
          transform: `translateY(-${mmToPixels(height, devicePixelRatio) / 2 + 18}px)`
        }}
      >
        <div className="flex-grow h-[2px] bg-base-content mr-1"></div>
        <div className="font-semibold">{ width } mm</div>
        <div className="flex-grow h-[2px] bg-base-content ml-1"></div>
      </div>
      <div style={ style } className={ 'box-content overflow-hidden ' + (!isOutlineMode ? 'bg-error' : 'border-[1mm] border-dashed border-error') }>
        { imageUrl && <img src={ imageUrl } alt="Card" className="w-full h-full object-fill" /> }
      </div>
      <div
        className="absolute w-6 flex flex-col items-center border-y-2 border-base-content"
        style={{
          height: style.height,
          transform: `translateX(-${mmToPixels(width, devicePixelRatio) / 2 + 18}px)`
        }}
      >
        <div className="flex-grow w-[2px] bg-base-content mb-5"></div>
        <div className="font-semibold text-center whitespace-nowrap -rotate-90">{ height } mm</div>
        <div className="flex-grow w-[2px] bg-base-content mt-5"></div>
      </div>
    </>
  )
}

Card.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  isOutlineMode: PropTypes.bool.isRequired
}

export default Card