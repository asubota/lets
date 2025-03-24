import { Box, Button, TextField, Typography } from '@mui/material'
import HouseIcon from '@mui/icons-material/House'
import { createLink } from '@tanstack/react-router'
import { setApiPwd, setApiUser } from '../../secrets.ts'
const LinkedButton = createLink(Button)
import SmsFailedIcon from '@mui/icons-material/SmsFailed'

// const user = getApiUser()
// const pwd = getApiPwd()

const test = false

export const Orders = () => {
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

        <Box
          sx={{
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            rowGap: '40px',
          }}
        >
          <SmsFailedIcon sx={{ fontSize: '44px', color: '#e4bb1e' }} />
          <Typography variant="h5" component="div">
            <b>horoshop</b> має кастрований обмежений API
          </Typography>
        </Box>
      </Box>
      {test && (
        <Box sx={{ p: 3 }}>
          <TextField
            label="user"
            variant="outlined"
            onBlur={(e) => setApiUser(e.target.value.trim())}
          />
          <TextField
            label="pwd"
            variant="outlined"
            onBlur={(e) => setApiPwd(e.target.value.trim())}
          />
        </Box>
      )}
    </>
  )
}
