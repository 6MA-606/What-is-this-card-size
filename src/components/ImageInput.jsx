import PropTypes from 'prop-types'
import RadioInput from './RadioInput'
import { useMemo, useRef, useState } from 'react'
import { verifyImageUrl } from '../libs/utils'
import { v4 } from 'uuid'

function ImageInput(props) {
  
  const {
    label,
    onChange
  } = props

  const [mode, setMode] = useState(0)
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [selectedImageId, setSelectedImageId] = useState('')
  const [isImageUrlLoading, setIsImageUrlLoading] = useState(false)
  const [isImageUrlValid, setIsImageUrlValid] = useState(true)
  const disabledAddImageUrl = useMemo(() => {
    return currentImageUrl === '' || isImageUrlLoading || !isImageUrlValid
  }, [currentImageUrl, isImageUrlLoading, isImageUrlValid])

  const handleChangeMode = (event) => {
    setMode(parseInt(event.target.value))
  }

  const handleFileChange = (event) => {
    const newFiles = event.target.files
    for (let i = 0; i < newFiles.length; i++) {

      if (newFiles[i].type.indexOf('image/') === -1) {
        continue
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setImages((images) => [{ id: v4(), url: event.target.result, file: newFiles[i].name }, ...images])
      }
      reader.readAsDataURL(newFiles[i])
    }

  }

  const handleImageClick = (image) => {
    setSelectedImageId(image.id)
    onChange({ target: { value: image.url } })
  }

  const handleBrowseClick = (event) => {
    event.preventDefault()
    fileInputRef.current.click()
  }

  const handleImageUrlChange = async (event) => {
    setCurrentImageUrl(event.target.value)
    
    try {
      setIsImageUrlLoading(true)
      if (await verifyImageUrl(event.target.value)) {
        setIsImageUrlValid(true)
      } else {
        throw new Error('Invalid Image URL')
      }
    } catch (error) {
      console.error(error)
      setIsImageUrlValid(false)
    } finally {
      setIsImageUrlLoading(false)
    }
  }

  const handleAddImageUrl = async (event) => {
    event.preventDefault()
    setImages((images) => [{ id: v4(), url: currentImageUrl }, ...images])
  }

  return (
    <div className="w-full h-full flex gap-4 flex-col">
      <input
        type="file"
        accept="image/*"
        onChange={ handleFileChange }
        multiple
        className='hidden'
        ref={ fileInputRef }
      />
      <div className='flex-none flex flex-col gap-2'>
        <div className='font-semibold'>{ label }</div>
        <div className='flex gap-4'>
          <RadioInput
            label='Image Url'
            name='srcType'
            value={ 0 }
            onChange={ handleChangeMode }
            checked={ mode === 0 }
          />
          <RadioInput
            label='File'
            name='srcType'
            value={ 1 }
            onChange={ handleChangeMode }
          />
        </div>
        <div
          className={
            mode === 0
              ? 'flex flex-col gap-2'
              : 'hidden'
          }
        >
          { currentImageUrl !== '' && !isImageUrlLoading && !isImageUrlValid && <div className='text-error text-sm'>Invalid Image URL</div> }
          <div
            className={
              'w-full flex items-center join border ' +
              (currentImageUrl !== '' && !isImageUrlLoading && !isImageUrlValid ?
                'border-error' :
                'border-neutral')
            }
          >
            <input
              type="text"
              value={ currentImageUrl }
              onInput={ handleImageUrlChange }
              className="w-full input join-item"
              placeholder="Paste image url here"
            />
            <button
              className="btn join-item"
              disabled={ disabledAddImageUrl }
              onClick={ handleAddImageUrl }
            >
              Add Image
            </button>
          </div>
        </div>
        <button
          onClick={ handleBrowseClick }
          className={
            mode === 1
              ? 'btn'
              : 'hidden'
          }
        >
          Browse Image
        </button>
      </div>
      <div className='flex-auto flex flex-col gap-2'>
        <div className='flex-none'>Your added images will be shown here (It will disappear after you refresh the page)</div>
        <div className='flex-auto relative overflow-y-auto border border-neutral border-dashed rounded-lg'>
          <div className='absolute w-full h-full p-4 flex content-start flex-wrap gap-2'>
            { images.length > 0 && images.map((image, index) => (
              <img
                key={ image.id }
                src={ image.url }
                alt={ `Image ${ index }` }
                title={ image.file || image.url }
                onClick={ () => handleImageClick(image) }
                className={
                  'w-28 h-28 bg-base-300 p-2 rounded-lg object-contain cursor-pointer ' +
                  (image.id === selectedImageId ? 'border-2 border-primary' : '')
                }
              />
            )) }
          </div>
        </div>
      </div>
    </div>
  )
}

ImageInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ImageInput
