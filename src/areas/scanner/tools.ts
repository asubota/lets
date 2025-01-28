import { createWorker } from 'tesseract.js'
import { height, width } from './constants.ts'

export const getWorker = async () => {
  return await createWorker(['ukr', 'eng'], 1)
}

export const getStream = async () => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment',
      },
    })
  } catch {
    return await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
      },
    })
  }
}

export const getCropArea = (element: HTMLVideoElement) => {
  const videoWidth = element.videoWidth
  const videoHeight = element.videoHeight
  const displayWidth = element.clientWidth
  const displayHeight = element.clientHeight

  const scaleX = displayWidth / videoWidth
  const scaleY = displayHeight / videoHeight

  const _width = width * scaleX
  const _height = height * scaleY
  const x = (displayWidth - width) / 2
  const y = (displayHeight - height) / 2 - 120

  return { x, y, width: _width, height: _height }
}
