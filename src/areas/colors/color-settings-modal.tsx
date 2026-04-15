import { useEffect, useMemo, useState } from 'react'

import HouseIcon from '@mui/icons-material/House'
import RestoreIcon from '@mui/icons-material/Restore'
import {
  Box,
  Button,
  DialogActions,
  Divider,
  Paper,
  Slider,
  Stack,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material'
import { createLink, useNavigate } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { HexColorInput, HexColorPicker } from 'react-colorful'

import { generateGradient, parseGradient, type GradientData } from './gradient-utils.ts'
import { useSetColors } from '../../api-colors.ts'
import { Modal } from '../../components/modal.tsx'
import { VendorChip } from '../../components/vendor-chip.tsx'
import { type Color } from '../../types.ts'

const LinkedButton = createLink(Button)

const PRESET_COLORS = [
  '#EA2B06',
  '#EF4444',
  '#F97316',
  '#FACC15',
  '#22C55E',
  '#10B981',
  '#06B6D4',
  '#3B82F6',
  '#6366F1',
  '#8B5CF6',
  '#D946EF',
  '#EC4899',
  '#64748B',
  '#94A3B8',
  '#F1F5F9',
  '#0F172A',
]

export const ColorSettingsModal = ({
  vendors,
  colors: currentColors,
}: {
  vendors: string[]
  colors: Record<string, Color>
}) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { mutate } = useSetColors()
  const [colors, setColors] = useState(currentColors)
  const [activeVendor, setActiveVendor] = useState<string | null>(vendors[0] || null)
  const [fill, setFill] = useState<'color' | 'borderColor' | 'both' | 'bg'>('both')
  const [isGradient, setIsGradient] = useState(false)
  const [gradientData, setGradientData] = useState<GradientData>({
    startColor: '#EA2B06',
    endColor: '#F97316',
    angle: 90,
  })

  const isDark = theme.palette.mode === 'dark'

  // Initialize gradient data when active vendor changes
  useEffect(() => {
    if (activeVendor && colors[activeVendor]?.backgroundColor) {
      const parsed = parseGradient(colors[activeVendor].backgroundColor)
      if (parsed) {
        setIsGradient(true)
        setGradientData(parsed)
      } else {
        setIsGradient(false)
      }
    } else {
      setIsGradient(false)
    }
  }, [activeVendor])

  const currentColor = useMemo(() => {
    if (!activeVendor) {
      return '#EA2B06'
    }
    const data = colors[activeVendor] || {}
    switch (fill) {
      case 'color':
        return data.color || '#EA2B06'
      case 'borderColor':
        return data.borderColor || '#EA2B06'
      case 'bg':
        return isGradient ? gradientData.startColor : data.backgroundColor || '#EA2B06'
      case 'both':
        return data.color || '#EA2B06'
      default:
        return '#EA2B06'
    }
  }, [activeVendor, colors, fill, isGradient, gradientData])

  const handleSetColor = (hex: string) => {
    if (!activeVendor) {
      return
    }

    const data = { ...colors[activeVendor] }

    if (fill === 'bg' && isGradient) {
      const newGradient = { ...gradientData, startColor: hex }
      setGradientData(newGradient)
      data.backgroundColor = generateGradient(newGradient)
    } else {
      switch (fill) {
        case 'both':
          data.color = hex
          data.borderColor = hex
          break
        case 'color':
          data.color = hex
          break
        case 'bg':
          data.backgroundColor = hex
          break
        case 'borderColor':
          data.borderColor = hex
          break
      }
    }

    setColors((value) => ({ ...value, [activeVendor]: data }))
  }

  const handleSetEndColor = (hex: string) => {
    if (!activeVendor || !isGradient) {
      return
    }
    const newGradient = { ...gradientData, endColor: hex }
    setGradientData(newGradient)
    const data = { ...colors[activeVendor], backgroundColor: generateGradient(newGradient) }
    setColors((value) => ({ ...value, [activeVendor]: data }))
  }

  const handleGradientToggle = (checked: boolean) => {
    if (!activeVendor) {
      return
    }
    setIsGradient(checked)
    const data = { ...colors[activeVendor] }
    if (checked) {
      data.backgroundColor = generateGradient(gradientData)
    } else {
      data.backgroundColor = gradientData.startColor
    }
    setColors((value) => ({ ...value, [activeVendor]: data }))
  }

  const handleAngleChange = (_: any, value: number | number[]) => {
    if (!activeVendor || !isGradient) {
      return
    }
    const angle = value as number
    const newGradient = { ...gradientData, angle }
    setGradientData(newGradient)
    const data = { ...colors[activeVendor], backgroundColor: generateGradient(newGradient) }
    setColors((value) => ({ ...value, [activeVendor]: data }))
  }

  const handleResetColor = () => {
    if (activeVendor) {
      setColors(({ [activeVendor]: _, ...value }) => value)
      setIsGradient(false)
    }
  }

  const handleSave = () => {
    mutate({ currentColors, colors })
    return navigate({ to: '/list' })
  }

  const handleClose = () => navigate({ to: '/list' })

  return (
    <Modal
      open
      title=""
      onSave={handleSave}
      onClose={handleClose}
      actions={
        <DialogActions sx={{ p: 3, pt: 1, width: '100%', justifyContent: 'center' }}>
          <LinkedButton
            to="/list"
            fullWidth
            variant="contained"
            sx={{ borderRadius: '16px', height: '54px', fontSize: '1.1rem' }}
          >
            <HouseIcon sx={{ mr: 1 }} /> Повернутись
          </LinkedButton>
        </DialogActions>
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          p: { xs: 2, md: 4 },
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Workspace Layout */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ width: '100%' }}>
          {/* Left: Hero Preview */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '220px',
              borderRadius: '40px',
              background: isDark
                ? 'radial-gradient(circle at center, rgba(234, 43, 6, 0.15), transparent 70%)'
                : 'radial-gradient(circle at center, rgba(234, 43, 6, 0.05), transparent 70%)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`,
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVendor}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <VendorChip
                  source="preview"
                  vendor={activeVendor || '...'}
                  color={activeVendor ? colors[activeVendor]?.color : undefined}
                  borderColor={activeVendor ? colors[activeVendor]?.borderColor : undefined}
                  backgroundColor={activeVendor ? colors[activeVendor]?.backgroundColor : undefined}
                />
              </motion.div>
            </AnimatePresence>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 1 }}>
                {activeVendor}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.7 }}>
                Artisan Styling
              </Typography>
            </Box>

            <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
              <Tooltip title="Скинути до початкових налаштувань">
                <IconButton onClick={handleResetColor} color="error" sx={{ backgroundColor: 'rgba(234, 43, 6, 0.1)' }}>
                  <RestoreIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Right: Controls Panel */}
          <Box sx={{ flex: 1.2 }}>
            <Paper
              elevation={0}
              className="glass-panel"
              sx={{
                p: 4,
                borderRadius: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: 'Outfit',
                    mb: 2,
                    ml: 1,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    opacity: 0.6,
                  }}
                >
                  Оберіть елемент
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  value={fill}
                  onChange={(_, v) => v && setFill(v)}
                  fullWidth
                  size="small"
                  sx={{
                    'backgroundColor': isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)',
                    'borderRadius': '16px',
                    'p': '4px',
                    '& .MuiToggleButton-root': {
                      'border': 'none',
                      'borderRadius': '12px !important',
                      'm': '2px',
                      'textTransform': 'none',
                      'fontWeight': 700,
                      'fontFamily': 'Outfit',
                      'color': 'text.secondary',
                      '&.Mui-selected': {
                        backgroundColor: isDark ? '#334155' : 'white',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <ToggleButton value="both">Все</ToggleButton>
                  <ToggleButton value="color">Текст</ToggleButton>
                  <ToggleButton value="borderColor">Межа</ToggleButton>
                  <ToggleButton value="bg">Фон</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="center">
                <Box
                  sx={{
                    'width': '240px',
                    '& .react-colorful': { width: '100%', height: '240px', borderRadius: '24px' },
                    '& .react-colorful__pointer': {
                      width: '32px',
                      height: '32px',
                      border: '3px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <HexColorPicker color={currentColor} onChange={handleSetColor} />
                </Box>

                <Stack spacing={3} sx={{ flex: 1, width: '100%' }}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 1, display: 'block', opacity: 0.6 }}
                    >
                      HEX КОД
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)',
                        p: '8px 16px',
                        borderRadius: '12px',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 900, color: 'primary.main' }}>
                        #
                      </Typography>
                      <HexColorInput
                        color={currentColor}
                        onChange={handleSetColor}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: isDark ? 'white' : 'black',
                          fontFamily: 'Outfit',
                          fontWeight: 700,
                          fontSize: '1.2rem',
                          outline: 'none',
                          width: '100%',
                        }}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 1, display: 'block', opacity: 0.6 }}
                    >
                      ШВИДКІ ПРЕСЕТИ
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 1 }}>
                      {PRESET_COLORS.map((c) => (
                        <Box
                          key={c}
                          onClick={() => handleSetColor(c)}
                          component={motion.div}
                          whileTap={{ scale: 0.9 }}
                          sx={{
                            aspectRatio: '1',
                            borderRadius: '8px',
                            backgroundColor: c,
                            cursor: 'pointer',
                            border:
                              currentColor.toLowerCase() === c.toLowerCase()
                                ? '2px solid white'
                                : '1px solid rgba(0,0,0,0.1)',
                            boxShadow: currentColor.toLowerCase() === c.toLowerCase() ? `0 0 0 2px ${c}` : 'none',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Stack>
              </Stack>

              {fill === 'bg' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Divider sx={{ mb: 3 }} />
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontFamily: 'Outfit', fontWeight: 700 }}>
                        Градієнтний режим
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        Для фону постачальника
                      </Typography>
                    </Box>
                    <Switch checked={isGradient} onChange={(e) => handleGradientToggle(e.target.checked)} />
                  </Stack>

                  {isGradient && (
                    <Stack spacing={3}>
                      <Stack direction="row" spacing={3} alignItems="center">
                        <Box
                          sx={{
                            'width': '120px',
                            '& .react-colorful': { width: '100%', height: '120px', borderRadius: '16px' },
                          }}
                        >
                          <HexColorPicker color={gradientData.endColor} onChange={handleSetEndColor} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="caption"
                            sx={{ fontFamily: 'Outfit', fontWeight: 700, mb: 1, display: 'block' }}
                          >
                            КУТ НАХИЛУ: {gradientData.angle}°
                          </Typography>
                          <Slider
                            value={gradientData.angle}
                            min={0}
                            max={360}
                            onChange={handleAngleChange}
                            size="small"
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  )}
                </motion.div>
              )}
            </Paper>
          </Box>
        </Stack>

        {/* Gallery Shelf */}
        <Box sx={{ mt: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: '32px',
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255,255,255,0.4)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '20px',
              }}
            >
              {vendors.map((vendor) => {
                const isSelected = activeVendor === vendor
                return (
                  <Box
                    key={vendor}
                    component={motion.div}
                    layoutId={`vendor-${vendor}`}
                    onClick={() => setActiveVendor(vendor)}
                    sx={{
                      cursor: 'pointer',
                      p: '4px',
                      borderRadius: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1.5,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: isSelected
                        ? isDark
                          ? 'rgba(234, 43, 6, 0.1)'
                          : 'rgba(234, 43, 6, 0.05)'
                        : 'transparent',
                      border: `1px solid ${isSelected ? 'rgba(234, 43, 6, 0.3)' : 'transparent'}`,
                      position: 'relative',
                    }}
                  >
                    <VendorChip
                      source="preview"
                      vendor={vendor}
                      color={currentColors[vendor]?.color}
                      borderColor={currentColors[vendor]?.borderColor}
                      backgroundColor={currentColors[vendor]?.backgroundColor}
                    />
                    {isSelected && (
                      <motion.div
                        layoutId="active-indicator"
                        style={{
                          position: 'absolute',
                          bottom: -6,
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          backgroundColor: '#ea2b06',
                          boxShadow: '0 0 8px #ea2b06',
                        }}
                      />
                    )}
                  </Box>
                )
              })}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Modal>
  )
}
