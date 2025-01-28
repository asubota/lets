import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import SafeBike from './bike.svg?react'
import BrokenBike from './broken-bike.svg?react'
import { Version } from './version.tsx'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import { useState } from 'react'

const allEffects = ['bnw', 'invert', 'glow', 'gradient'] as const
type Effect = (typeof allEffects)[number]

export const Bike = ({ type }: { type: 'safe' | 'broken' }) => {
  const [effects, setEffects] = useState<Effect[]>([])

  const handle = (_: unknown, newEffects: Effect[]) => {
    setEffects(newEffects)

    allEffects.forEach((e) => document.body.classList.remove(e))
    newEffects.forEach((effect) => document.body.classList.add(effect))
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '300px',
        position: 'absolute',
        bottom: '215px',
        left: '50%',
        transform: 'translate(-50%)',
      }}
    >
      {type === 'safe' && <Version />}
      {type === 'safe' && <SafeBike />}
      {type === 'broken' && (
        <>
          <BrokenBike />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
            <ToggleButtonGroup value={effects} onChange={handle} size="small">
              <ToggleButton value="bnw">
                <WbSunnyIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="invert">
                <InvertColorsIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="glow">
                <FormatColorTextIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="gradient">
                <DynamicFeedIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </>
      )}
    </Box>
  )
}
