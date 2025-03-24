import { Box, Button, TextField } from '@mui/material'
import HouseIcon from '@mui/icons-material/House'
import { createLink } from '@tanstack/react-router'
import { setApiPwd, setApiUser } from '../../secrets.ts'
import { useOrders } from '../../lb-api.ts'

const LinkedButton = createLink(Button)

// const user = getApiUser()
// const pwd = getApiPwd()

const test = true

export const Orders = () => {
  // const noData = !user || !pwd

  const data = useOrders()

  console.log(data)

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
