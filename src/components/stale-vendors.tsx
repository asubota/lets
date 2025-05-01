import { Box, Alert , Stack, AlertTitle, Typography} from '@mui/material'
import { useMeta } from '../store'



export const StaleVendors = () => {
 const {vendors} = useMeta()
 const staleList = vendors.filter(v => v.stale)

 if (staleList.length ===0) {
     return null
     }

  return (
  <Box sx={{ px: { xs: 2, md: 4 } }}>
    <Stack spacing={0.5}>
      {staleList.map(v => (
        <Alert
          severity="error"
          key={v.vendor}
          variant="outlined"
        >
          <AlertTitle>
            <Typography variant="subtitle2" fontWeight={600}>
              {v.vendor}
            </Typography>
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
