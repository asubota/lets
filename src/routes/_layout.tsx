import { Container } from '@mui/material'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { AppBar } from '../components/app-bar.tsx'

const RouteComponent = () => {
  return (
    <Container sx={{ pl: 1, pr: 1, pb: 1 }}>
      <AppBar />
      <Outlet />
    </Container>
  )
}

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
})
