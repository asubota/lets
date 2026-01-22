import { startTransition, useMemo } from 'react'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import { alpha, Box, Button, Chip, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'

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
      <Box sx={{ p: 2 }}>
        {/* Vendors Section */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, ml: 1, fontWeight: 'bold' }}>
          Хто барижить:
        </Typography>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 3,
            borderColor: theme.palette.divider,
          }}
        >
          <Grid container columnSpacing={1.5} rowSpacing={1.5}>
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
                    'p': 1,
                    'borderRadius': 2,
                    'border': '1px solid',
                    'borderColor': isSelected ? theme.palette.primary.main : 'transparent',
                    'backgroundColor': isSelected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    'transition': 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: isSelected
                        ? alpha(theme.palette.primary.main, 0.12)
                        : theme.palette.action.hover,
                    },
                  }}
                  onClick={() => toggleVendor(vendor)}
                >
                  <Box sx={{ position: 'relative', display: 'inline-flex', mr: 1.5 }}>
                    <VendorChip source="live" vendor={vendor} />
                    {isSelected && (
                      <CheckCircleIcon
                        sx={{
                          fontSize: 18,
                          color: theme.palette.primary.main,
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '50%',
                          zIndex: 1,
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isSelected ? 'bold' : 'normal',
                      color: isSelected ? 'text.primary' : 'text.secondary',
                    }}
                  >
                    {countByVendor[vendor] ?? 0}
                  </Typography>
                </Grid>
              )
            })}
          </Grid>
        </Paper>

        {/* Sorting Section */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, ml: 1, fontWeight: 'bold' }}>
          Як сортувати:
        </Typography>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 3,
            borderColor: theme.palette.divider,
          }}
        >
          <Grid container spacing={3}>
            {/* Price Sorting */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack direction="row" alignItems="center" gap={1} mb={1.5} justifyContent="center">
                <AttachMoneyIcon color="primary" fontSize="small" />
                <Typography variant="subtitle2" fontWeight="bold">
                  Ціна питання
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Chip
                  icon={<ArrowUpwardIcon fontSize="small" />}
                  label="Від дешевих"
                  onClick={() => handlePriceSort('asc')}
                  color={field === 'price' && order === 'asc' ? 'primary' : 'default'}
                  variant={field === 'price' && order === 'asc' ? 'filled' : 'outlined'}
                  clickable
                />
                <Chip
                  icon={<ArrowDownwardIcon fontSize="small" />}
                  label="Від дорогих"
                  onClick={() => handlePriceSort('desc')}
                  color={field === 'price' && order === 'desc' ? 'primary' : 'default'}
                  variant={field === 'price' && order === 'desc' ? 'filled' : 'outlined'}
                  clickable
                />
              </Stack>
            </Grid>

            {/* Name Sorting */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack direction="row" alignItems="center" gap={1} mb={1.5} justifyContent="center">
                <SortByAlphaIcon color="primary" fontSize="small" />
                <Typography variant="subtitle2" fontWeight="bold">
                  По назві
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Chip
                  icon={<ArrowUpwardIcon fontSize="small" />}
                  label="А - Я"
                  onClick={() => handleNameSort('asc')}
                  color={field === 'name' && order === 'asc' ? 'primary' : 'default'}
                  variant={field === 'name' && order === 'asc' ? 'filled' : 'outlined'}
                  clickable
                />
                <Chip
                  icon={<ArrowDownwardIcon fontSize="small" />}
                  label="Я - А"
                  onClick={() => handleNameSort('desc')}
                  color={field === 'name' && order === 'desc' ? 'primary' : 'default'}
                  variant={field === 'name' && order === 'desc' ? 'filled' : 'outlined'}
                  clickable
                />
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  )
}
