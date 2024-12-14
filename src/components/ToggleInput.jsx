import PropTypes from "prop-types"

function ToggleInput(props) {

  const {
    label,
    checked,
    onChange
  } = props

  return (
    <div className="flex gap-2 items-center">
      <div className="font-semibold">{ label }</div>
      <input
        type="checkbox"
        checked={ checked }
        onChange={ onChange }
        className="toggle"
      />
    </div>
  )
}

ToggleInput.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ToggleInput