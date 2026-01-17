import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, CircularProgress, Typography, Divider } from '@mui/material'
import { Grid } from '@mui/material'
import { yellow } from '@mui/material/colors'

import { ResetCacheButton } from '../../components/reset-cache-button.tsx'
import { TopBottomHome } from '../../components/top-botton-home.tsx'
import { VendorChip } from '../../components/vendor-chip.tsx'
import { useMeta } from '../../store'
import { useAppliedFilters, useAppliedFiltersActions } from '../../store/appliedFilters'
import { groupByVendor } from '../../tools.tsx'
import { useAllData, useAllVendors, useIsLoading } from '../../use-data.ts'

export const Stats = () => {
  const allData = useAllData()
  const vendors = useAllVendors()
  const loading = useIsLoading()
  const { created } = useMeta()

  const appliedFilters = useAppliedFilters()
  const { toggleVendor } = useAppliedFiltersActions()

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 6,
          gap: 6,
          flexDirection: 'column',
        }}
      >
        <CircularProgress color="primary" size={70} />
        <CircularProgress color="secondary" size={20} />
        <CircularProgress color="primary" size={50} />
      </Box>
    )
  }

  const countByVendor = groupByVendor(allData)

  return (
    <TopBottomHome>
      <Grid container columnSpacing={2} rowSpacing={1.5} sx={{ pl: 3, pr: 3 }}>
        {vendors.sort().map((vendor) => {
          const isSelected = appliedFilters.includes(vendor)

          return (
            <Grid
              size={{ xs: 6, md: 4 }}
              key={vendor}
              sx={{
                py: 1,
                display: 'grid',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 1,
                gridTemplateColumns: '96px auto auto 1fr',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <VendorChip source="live" vendor={vendor} onClick={toggleVendor} />
              </Box>
              <Box
                sx={{ fontWeight: 'bold', fontSize: '14px', color: isSelected ? yellow[500] : 'white' }}
                component="span"
              >
                {countByVendor[vendor]}
              </Box>
              {isSelected ? <CheckCircleIcon sx={{ fontSize: 12, color: yellow[500] }} /> : <div />}
              <Box />
            </Grid>
          )
        })}
      </Grid>

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
    </TopBottomHome>
  )
}
