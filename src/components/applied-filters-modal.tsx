import { type MouseEvent, startTransition, useMemo } from 'react'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import {
  alpha,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material'

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

  const handlePriceSort = (_: MouseEvent<HTMLElement>, newOrder: SortOrder) => {
    startTransition(() => {
      if (newOrder) {
        setSort('price', newOrder)
      } else {
        setSort(undefined, undefined)
      }
    })
  }

  const handleNameSort = (_: MouseEvent<HTMLElement>, newOrder: SortOrder) => {
    startTransition(() => {
      if (newOrder) {
        setSort('name', newOrder)
      } else {
        setSort(undefined, undefined)
      }
    })
  }

  return (
    <Modal
      open={open}
      onClose={toggleAppliedFiltersModal}
      title="Фільтри та Сортування"
      onSave={toggleAppliedFiltersModal}
      actions={
        <Box sx={{ p: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            fullWidth
            sx={{ maxWidth: '300px', borderRadius: '20px' }}
          >
            Знести всі налаштування
          </Button>
        </Box>
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
            mb: 3,
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
                    <VendorChip source="live" vendor={vendor} onClick={() => {}} />
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
                    {countByVendor[vendor]}
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
                <AttachMoneyIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Ціна питання
                </Typography>
              </Stack>
              <ToggleButtonGroup
                value={field === 'price' ? order : null}
                exclusive
                onChange={handlePriceSort}
                aria-label="price sort"
                fullWidth
                color="primary"
              >
                <ToggleButton value="asc" sx={{ py: 1.5 }}>
                  <ArrowUpwardIcon sx={{ mr: 1 }} />
                  Від дешевих
                </ToggleButton>
                <ToggleButton value="desc" sx={{ py: 1.5 }}>
                  <ArrowDownwardIcon sx={{ mr: 1 }} />
                  Від дорогих
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            {/* Name Sorting */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack direction="row" alignItems="center" gap={1} mb={1.5} justifyContent="center">
                <SortByAlphaIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="bold">
                  По назві
                </Typography>
              </Stack>
              <ToggleButtonGroup
                value={field === 'name' ? order : null}
                exclusive
                onChange={handleNameSort}
                aria-label="name sort"
                fullWidth
                color="primary"
              >
                <ToggleButton value="asc" sx={{ py: 1.5 }}>
                  <ArrowDownwardIcon sx={{ mr: 1 }} />A - Я
                </ToggleButton>
                <ToggleButton value="desc" sx={{ py: 1.5 }}>
                  <ArrowUpwardIcon sx={{ mr: 1 }} />Я - А
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  )
}
