import { FC, useEffect, useRef, useState } from 'react'
import { Alert, Box, Button, CircularProgress } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import SearchIcon from '@mui/icons-material/Search'
import { height, width } from './constants.ts'
import { getCropArea, getStream, getWorker } from './tools.ts'
import { Output } from './output.tsx'
import { Blur } from './blur.tsx'
import { ScanArea } from './scan-area.tsx'
import { Cancel } from './cancel.tsx'
import { createLink } from '@tanstack/react-router'

const LinkedButton = createLink(Button)

export const Scanner: FC = () => {
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState('')
  const [working, setWorking] = useState(false)
  const [initError, setInitError] = useState<unknown>(null)

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

          video.onloadedmetadata = () => {
            video.play()
            setCropArea(getCropArea(video))
            setRunning(true)
          }
        }

        return stream
      } catch (err) {
        console.error('Error accessing webcam: ', err)
        setInitError(err?.toString())
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
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        performOCR(canvas.toDataURL('image/jpeg'))
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
      setOutput(text.trim())
      await worker.terminate()
    } catch (e) {
      console.log('## e', e)
    }

    setWorking(false)
  }

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

      <LinkedButton
        to={'/'}
        search={output.length ? { s: output } : {}}
        variant="contained"
      >
        <SearchIcon />
      </LinkedButton>
    </Box>
  )

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {!!initError && (
        <Box
          sx={{
            p: 3,
            position: 'absolute',
            top: '200px',
          }}
        >
          <Alert severity="error">{initError.toString()}</Alert>
        </Box>
      )}

      {!running && (
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            height: '150px',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
      )}
      <Cancel />
      {running && actions}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          {running && <Output cropArea={cropArea} output={output} />}
          {running && <Blur cropArea={cropArea} />}
          {running && <ScanArea cropArea={cropArea} />}

          <Box
            component="video"
            ref={videoRef}
            playsInline
            muted
            sx={{ visibility: running ? 'visible' : 'hidden' }}
          />
        </Box>
      </Box>

      <Box component="canvas" ref={canvasRef} sx={{ display: 'none' }} />
    </Box>
  )
}
