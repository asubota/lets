import { FC, ReactNode, SyntheticEvent, useRef } from 'react'
import TouchRipple, {
  TouchRippleActions,
} from '@mui/material/ButtonBase/TouchRipple'
import { Box } from '@mui/material'

export const RippleText: FC<{ text: ReactNode }> = ({ text }) => {
  const rippleRef = useRef<TouchRippleActions>(null)

  const handleMouseDown = (event: SyntheticEvent) =>
    rippleRef.current?.start(event)

  const handleMouseUp = () => rippleRef.current?.stop()

  return (
    <Box
      component="span"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      sx={{
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {text}
      <TouchRipple ref={rippleRef} />
    </Box>
  )
}
