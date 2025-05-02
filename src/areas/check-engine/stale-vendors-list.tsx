import { Box, Alert, Stack, AlertTitle, Typography } from '@mui/material'

import { VendorChip } from '../../components/vendor-chip.tsx'
import { useStaleVendors } from '../../store'

export const StaleVendorsList = () => {
  const staleVendors = useStaleVendors()

  if (staleVendors.length === 0) {
    return null
  }

  return (
    <Box sx={{ pl: 3, pr: 3 }}>
      <Stack spacing={1}>
        {staleVendors.map((v) => (
          <Alert severity="error" key={v.vendor} variant="outlined">
            <AlertTitle>
              <VendorChip source="live" vendor={v.vendor} />
            </AlertTitle>
            <Typography variant="caption" color="text.secondary">
              Завантажено: <strong>{v.load_str || '—'}</strong>
            </Typography>
            <br />
            <Typography variant="caption" color="text.secondary">
              Останнє оновлення: <strong>{v.parse_str || '—'}</strong>
            </Typography>
          </Alert>
        ))}
      </Stack>
    </Box>
  )
}
