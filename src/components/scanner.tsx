import { useEffect, useRef, useState } from 'react'
import { Box, Button, Paper } from '@mui/material'
import { createWorker } from 'tesseract.js'

const getWorker = async () => {
  return await createWorker('eng', 1)
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

const width = 120
const height = 35

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
  const y = (displayHeight - height) / 2

  return { x, y, width: _width, height: _height }
}

export const Scanner = () => {
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [working, setWorking] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      } catch (err) {
        console.error('Error accessing webcam: ', err)
      }
    }

    startVideo()
  }, [])

  const capture = () => {
    const canvas = canvasRef.current
    const video = videoRef.current

    if (canvas && video) {
      const context = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

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

  return (
    <Box
      sx={{
        p: 3,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {running && (
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
        )}

        <Box
          sx={{
            position: 'absolute',
            left: cropArea.x,
            top: cropArea.y - height - 30,
            zIndex: 22,
            width: cropArea.width,
          }}
        >
          {output && <Paper sx={{ pl: '4px', pr: '4px' }}>{output}</Paper>}
        </Box>

        {running && (
          <Button
            onClick={capture}
            variant="contained"
            size="small"
            disabled={working}
            sx={{
              position: 'absolute',
              left: cropArea.x,
              top: cropArea.y + height + 10,
              zIndex: 22,
              width: cropArea.width,
            }}
          >
            {working ? 'Working...' : 'Capture'}
          </Button>
        )}

        <Box component="video" ref={videoRef} playsInline />
      </Box>

      <Box component="canvas" ref={canvasRef} sx={{ display: 'none' }} />
    </Box>
  )
}
