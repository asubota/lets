import { useMemo } from 'react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { alpha, Box, Divider, Grid, Paper, Typography, useTheme } from '@mui/material'

import { ResetCacheButton } from '../../components/reset-cache-button.tsx'
import { TopBottomHome } from '../../components/top-botton-home.tsx'
import { VendorChip } from '../../components/vendor-chip.tsx'
import { useMeta } from '../../store'
import { useAppliedFilters, useAppliedFiltersActions } from '../../store/appliedFilters'
import { groupByVendor } from '../../tools.tsx'
import { useAllData, useAllVendors } from '../../use-data.ts'

export const Stats = () => {
  const theme = useTheme()
  const allData = useAllData()
  const vendors = useAllVendors()
  const { created } = useMeta()

  const appliedFilters = useAppliedFilters()
  const { toggleVendor } = useAppliedFiltersActions()

  const countByVendor = useMemo(() => groupByVendor(allData), [allData])
  const sortedVendors = useMemo(() => [...vendors].sort(), [vendors])

  return (
    <TopBottomHome>
      <Box sx={{ px: 3 }}>
        <Paper
          elevation={0}
          variant="outlined"
          sx={{
            p: 2,
            mb: 4,
            borderRadius: '12px',
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

        <Divider sx={{ ml: 3, mr: 3, mt: 1, mb: 1 }} />

        <Box sx={{ textAlign: 'center' }}>
          Total:{' '}
          <Box sx={{ fontWeight: 'bold' }} component="span">
            {allData.length}
          </Box>
          {created && (
            <Typography
              component="div"
              variant="body2"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                fontSize: '12px',
                fontStyle: 'italic',
              }}
            >
              {created}
            </Typography>
          )}
          <ResetCacheButton />
        </Box>
      </Box>
    </TopBottomHome>
  )
}
