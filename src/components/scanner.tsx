import { FC, useEffect, useRef, useState } from 'react'
import { Box, Button, IconButton, Paper } from '@mui/material'
import { createWorker } from 'tesseract.js'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useAppActions } from '../store'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import SearchIcon from '@mui/icons-material/Search'
import { useFormContext } from 'react-hook-form'
import { SearchForm } from '../types.ts'

const getWorker = async () => {
  return await createWorker(['ukr', 'eng'], 1)
}

const getStream = async () => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      },
    })
  } catch (e) {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
      },
    })
  }
}

const width = 140
const height = 32

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

const Blur: FC<{ cropArea: CropArea }> = ({ cropArea }) => {
  return (
    <Box
      width="100%"
      height="100%"
      component="svg"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <defs>
        <mask id="mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect
            x={cropArea.x}
            y={cropArea.y}
            width={cropArea.width}
            height={cropArea.height}
            fill="black"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        mask="url(#mask)"
        fill="rgba(0, 0, 0, 0.5)"
      />
    </Box>
  )
}

const ScanArea: FC<{ cropArea: CropArea }> = ({ cropArea }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        border: '1px solid',
        borderColor: 'primary.main',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        left: cropArea.x,
        top: cropArea.y,
        width: cropArea.width,
        height: cropArea.height,
      }}
    />
  )
}

const Output: FC<{ cropArea: CropArea; output: string }> = ({
  cropArea,
  output,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: cropArea.x,
        top: cropArea.y + height + 30,
        zIndex: 1,
        minWidth: cropArea.width,
      }}
    >
      <Paper sx={{ pl: '4px', pr: '4px' }}>{output}</Paper>
    </Box>
  )
}

const getCropArea = (element: HTMLVideoElement) => {
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

interface ScannerProps {
  onSubmit(): void
}

export const Scanner: FC<ScannerProps> = ({ onSubmit }) => {
  const { setValue } = useFormContext<SearchForm>()
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [working, setWorking] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { setMode } = useAppActions()

  const [cropArea, setCropArea] = useState({
    x: 0,
    y: 0,
    width,
    height,
  })

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await getStream()
        const video = videoRef.current

        if (video) {
          video.srcObject = stream

          video.onresize = () => {
            video.play()
            setRunning(true)
            setCropArea(getCropArea(video))
          }
        }

        return stream
      } catch (err) {
        console.error('Error accessing webcam: ', err)
      }
    }

    const mediaStream = startVideo()
    return () => {
      mediaStream.then((stream) => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
      })
    }
  }, [])

  const capture = () => {
    const canvas = canvasRef.current
    const video = videoRef.current

    if (canvas && video) {
      const context = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        const imageSrc = canvas.toDataURL('image/jpeg')
        performOCR(imageSrc)
      }
    }
  }

  const performOCR = async (image: string) => {
    setWorking(true)

    try {
      const worker = await getWorker()

      const {
        data: { text },
      } = await worker.recognize(image, {
        rectangle: {
          top: cropArea.y,
          left: cropArea.x,
          width: cropArea.width,
          height: cropArea.height,
        },
      })
      setOutput(text)
      await worker.terminate()
    } catch (e) {
      console.log('## e', e)
    }

    setWorking(false)
  }

  const cancelIcon = (
    <IconButton
      onClick={() => setMode('search')}
      sx={{
        zIndex: 1,
        position: 'absolute',
        top: '15px',
        left: '15px',
        color: 'primary.main',
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  )

  const actions = (
    <Box
      sx={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        display: 'flex',
        gap: '20px',
      }}
    >
      <Button variant="contained" onClick={capture} disabled={working}>
        <CameraAltIcon />
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          setValue('input', output)
          onSubmit()
          setMode('search')
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  )

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {running && cancelIcon}
      {running && actions}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          {running && <Output cropArea={cropArea} output={output} />}
          {running && <Blur cropArea={cropArea} />}
          {running && <ScanArea cropArea={cropArea} />}
          <Box component="video" ref={videoRef} playsInline />
        </Box>
      </Box>

      <Box component="canvas" ref={canvasRef} sx={{ display: 'none' }} />
    </Box>
  )
}
