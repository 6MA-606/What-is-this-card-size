import PropTypes from "prop-types"

function NumberInput(props) {

  const {
    label,
    value,
    min,
    max,
    step,
    onChange
  } = props

  return (
    <div className="flex flex-col">
      <div className="font-semibold">{ label }</div>
      <div className="flex gap-2 items-center">
        <input
          type="range"
          min={ min }
          max={ max }
          step={ step }
          value={ value }
          onChange={ onChange }
          className="range range-sm"
        />
        <input
          type="number"
          min={ min }
          max={ max }
          step={ step }
          value={ value }
          onChange={ onChange }
          className="w-[4rem] input input-sm input-bordered"
        />
        <div>mm</div>
      </div>
    </div>
  )
}

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default NumberInput