export const mmToPixels = (mm, devicePixelRatio = window.devicePixelRatio) => {
  return (mm * devicePixelRatio * 96) / 25.4
}

function isValidUrl(url) {
  try {
      new URL(url)
      return true
  } catch {
      return false
  }
}


function isImageUrl(url) {
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i
  return imageExtensions.test(url)
}


async function isImageMimeType(url) {
  try {
      const response = await fetch(url, { method: 'HEAD' })
      const contentType = response.headers.get('Content-Type')
      return contentType && contentType.startsWith('image/')
  } catch (error) {
      console.error("Error fetching URL:", error)
      return false
  }
}

function isImageLoadable(url) {
  return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
  })
}

export async function verifyImageUrl(url) {
  if (!isValidUrl(url) || !isImageUrl(url)) {
      return false
  }
  if (await isImageMimeType(url)) {
      return await isImageLoadable(url)
  }
  return false
}
