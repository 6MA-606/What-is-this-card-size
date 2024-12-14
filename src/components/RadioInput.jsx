import PropTypes from 'prop-types'

function RadioInput(props) {

  const {
    label,
    name,
    value,
    onChange,
    checked
  } = props

  return (
    <label className='flex gap-1 items-center'>
      <input
        type='radio'
        name={ name }
        value={ value }
        onChange={ onChange }
        className='radio radio-sm'
        checked={ checked }
      />
      <span>{ label }</span>
    </label>
  )
}

RadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool
}

export default RadioInput
