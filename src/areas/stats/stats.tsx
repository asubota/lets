import { FC } from 'react'
import { useAllData, useAllVendors, useIsLoading } from '../../use-data.ts'
import { Box, Button, CircularProgress } from '@mui/material'
import { VendorChip } from '../../components/vendor-chip.tsx'
import { groupByVendor } from '../../tools.tsx'
import Grid from '@mui/material/Grid2'
import HouseIcon from '@mui/icons-material/House'
import { createLink } from '@tanstack/react-router'

const LinkedButton = createLink(Button)

export const Stats: FC = () => {
  const allData = useAllData()
  const vendors = useAllVendors()
  const loading = useIsLoading()

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
    <>
      <Box sx={{ pl: 3, pr: 3, pt: 3 }}>
        <LinkedButton
          to="/list"
          fullWidth
          variant="contained"
          color="secondary"
        >
          <HouseIcon color="primary" />
        </LinkedButton>
      </Box>

      <Grid container spacing={2} sx={{ p: 3 }}>
        {vendors.sort().map((vendor) => {
          return (
            <Grid
              size={{ xs: 6, md: 4 }}
              key={vendor}
              sx={{ p: 1, display: 'flex', justifyContent: 'flex-start' }}
            >
              <VendorChip source="live" vendor={vendor} />
              <Box sx={{ pl: 2, fontWeight: 'bold' }} component="span">
                {countByVendor[vendor]}
              </Box>
            </Grid>
          )
        })}
      </Grid>

      <Box sx={{ textAlign: 'center', m: 2, mt: 0 }}>
        Total:{' '}
        <Box sx={{ fontWeight: 'bold' }} component="span">
          {allData.length}
        </Box>
      </Box>

      <Box sx={{ pl: 3, pr: 3 }}>
        <LinkedButton to="/list" fullWidth variant="contained">
          <HouseIcon color="secondary" />
        </LinkedButton>
      </Box>
    </>
  )
}
