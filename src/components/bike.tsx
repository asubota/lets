import { useState } from 'react'

import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'

import SafeBike from './bike.svg?react'
import BrokenBike from './broken-bike.svg?react'
import { Version } from './version.tsx'

const effects = ['bnw', 'invert', 'glow', 'gradient'] as const
const allEffects = new Set(effects)
type Effect = (typeof effects)[number]

export const Bike = ({ type }: { type: 'safe' | 'broken' }) => {
  const [effects, setEffects] = useState<Effect[]>(() => {
    const currentDocumentClasses = new Set(document.body.classList)

    const commonItems = new Set(
      [...currentDocumentClasses].filter((item) =>
        allEffects.has(item as Effect),
      ),
    )

    return Array.from(commonItems) as Effect[]
  })

  const handle = (_: unknown, newEffects: Effect[]) => {
    setEffects(newEffects)

    allEffects.forEach((e) => document.body.classList.remove(e))
    newEffects.forEach((effect) => document.body.classList.add(effect))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '200px',ml:3,
        flexDirection: 'column',
      }}
    >
      {type === 'safe' && <Version />}
      {type === 'safe' && <Box component={SafeBike} sx={{ width: '270px' }} />}
      {type === 'broken' && (
        <>
          <Box component={BrokenBike} sx={{ width: '270px' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              top: '-50px',
            }}
          >
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
