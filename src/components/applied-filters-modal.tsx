import { startTransition, useMemo } from 'react'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import { alpha, Box, Button, Chip, Grid, Stack, Typography, useTheme } from '@mui/material'

import { Modal } from './modal.tsx'
import { VendorChip } from './vendor-chip.tsx'
import { type SortOrder, useAppliedFilters, useAppliedFiltersActions, useSortConfig } from '../store/appliedFilters.ts'
import { useSearchActions, useShowAppliedFiltersModal } from '../store/search.ts'
import { groupByVendor } from '../tools.tsx'
import { useAllData, useAllVendors } from '../use-data.ts'

export const AppliedFiltersModal = () => {
  const theme = useTheme()
  const vendors = useAllVendors()
  const allData = useAllData()
  const countByVendor = useMemo(() => groupByVendor(allData), [allData])

  const { toggleAppliedFiltersModal } = useSearchActions()
  const open = useShowAppliedFiltersModal()

  const appliedFilters = useAppliedFilters()
  const { field, order } = useSortConfig()
  const { toggleVendor, reset, setSort } = useAppliedFiltersActions()

  const sortedVendors = useMemo(() => [...vendors].sort(), [vendors])

  const handleReset = () => {
    reset()
    toggleAppliedFiltersModal()
  }

  const handlePriceSort = (newOrder: SortOrder) => {
    startTransition(() => {
      if (field === 'price' && order === newOrder) {
        setSort(undefined, undefined)
      } else {
        setSort('price', newOrder)
      }
    })
  }

  const handleNameSort = (newOrder: SortOrder) => {
    startTransition(() => {
      if (field === 'name' && order === newOrder) {
        setSort(undefined, undefined)
      } else {
        setSort('name', newOrder)
      }
    })
  }

  return (
    <Modal
      open={open}
      onClose={toggleAppliedFiltersModal}
      title="Фільтри та Сортування"
      onSave={toggleAppliedFiltersModal}
      hasSave={false}
      actions={
        <Stack direction="row" spacing={2} sx={{ p: 2, width: '100%', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            sx={{ borderRadius: '20px', flex: 1, maxWidth: '200px' }}
          >
            Знести все
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleAppliedFiltersModal}
            sx={{ borderRadius: '20px', flex: 1, maxWidth: '200px' }}
          >
            Закрити
          </Button>
        </Stack>
      }
    >
      <Box sx={{ p: 2.5 }}>
        {/* Vendors Section */}
        <Typography 
          variant="subtitle1" 
          color="text.primary" 
          sx={{ mb: 2, ml: 1, fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}
        >
          Хто барижить:
        </Typography>
        <Box
          className="glass-panel"
          sx={{
            p: 2.5,
            mb: 4,
            borderRadius: '24px',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <Grid container columnSpacing={2} rowSpacing={2}>
            {sortedVendors.map((vendor) => {
              const isSelected = appliedFilters.includes(vendor)

              return (
                <Grid
                  size={{ xs: 6, sm: 4 }}
                  key={vendor}
                  sx={{
                    'display': 'flex',
                    'alignItems': 'center',
                    'cursor': 'pointer',
                    'p': 1.25,
                    'borderRadius': '16px',
                    'border': '1px solid',
                    'borderColor': isSelected ? theme.palette.primary.main : 'transparent',
                    'backgroundColor': isSelected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: isSelected
                        ? alpha(theme.palette.primary.main, 0.12)
                        : theme.palette.action.hover,
                      transform: 'translateY(-2px)',
                    },
                  }}
                  onClick={() => toggleVendor(vendor)}
                >
                  <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
                    <VendorChip source="live" vendor={vendor} />
                    {isSelected && (
                      <CheckCircleIcon
                        sx={{
                          fontSize: 20,
                          color: theme.palette.primary.main,
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '50%',
                          zIndex: 1,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isSelected ? 800 : 600,
                      fontFamily: '"Outfit", sans-serif',
                      color: isSelected ? 'text.primary' : 'text.secondary',
                      fontSize: '14px',
                    }}
                  >
                    {countByVendor[vendor]}
                  </Typography>
                </Grid>
              )
            })}
          </Grid>
        </Box>

        {/* Sorting Section */}
        <Typography 
          variant="subtitle1" 
          color="text.primary" 
          sx={{ mb: 2, ml: 1, fontWeight: 800, fontFamily: '"Outfit", sans-serif' }}
        >
          Як сортувати:
        </Typography>
        <Box
          className="glass-panel"
          sx={{
            p: 3,
            borderRadius: '24px',
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <Grid container spacing={4}>
            {/* Price Sorting */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack direction="row" alignItems="center" gap={1.5} mb={2} justifyContent="center">
                <AttachMoneyIcon color="primary" sx={{ fontSize: '24px' }} />
                <Typography variant="subtitle1" fontWeight={800} sx={{ fontFamily: '"Outfit", sans-serif' }}>
                  Ціна питання
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} justifyContent="center">
                <Chip
                  icon={<ArrowUpwardIcon />}
                  label="Дешевші"
                  onClick={() => handlePriceSort('asc')}
                  color={field === 'price' && order === 'asc' ? 'primary' : 'default'}
                  variant={field === 'price' && order === 'asc' ? 'filled' : 'outlined'}
                  sx={{ 
                    borderRadius: '12px', 
                    fontWeight: 700,
                    height: '36px',
                    px: 1
                  }}
                  clickable
                />
                <Chip
                  icon={<ArrowDownwardIcon />}
                  label="Дорожчі"
                  onClick={() => handlePriceSort('desc')}
                  color={field === 'price' && order === 'desc' ? 'primary' : 'default'}
                  variant={field === 'price' && order === 'desc' ? 'filled' : 'outlined'}
                  sx={{ 
                    borderRadius: '12px', 
                    fontWeight: 700,
                    height: '36px',
                    px: 1
                  }}
                  clickable
                />
              </Stack>
            </Grid>

            {/* Name Sorting */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack direction="row" alignItems="center" gap={1.5} mb={2} justifyContent="center">
                <SortByAlphaIcon color="primary" sx={{ fontSize: '24px' }} />
                <Typography variant="subtitle1" fontWeight={800} sx={{ fontFamily: '"Outfit", sans-serif' }}>
                  По назві
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} justifyContent="center">
                <Chip
                  icon={<ArrowUpwardIcon />}
                  label="А - Я"
                  onClick={() => handleNameSort('asc')}
                  color={field === 'name' && order === 'asc' ? 'primary' : 'default'}
                  variant={field === 'name' && order === 'asc' ? 'filled' : 'outlined'}
                  sx={{ 
                    borderRadius: '12px', 
                    fontWeight: 700,
                    height: '36px',
                    px: 1
                  }}
                  clickable
                />
                <Chip
                  icon={<ArrowDownwardIcon />}
                  label="Я - А"
                  onClick={() => handleNameSort('desc')}
                  color={field === 'name' && order === 'desc' ? 'primary' : 'default'}
                  variant={field === 'name' && order === 'desc' ? 'filled' : 'outlined'}
                  sx={{ 
                    borderRadius: '12px', 
                    fontWeight: 700,
                    height: '36px',
                    px: 1
                  }}
                  clickable
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  )
}
