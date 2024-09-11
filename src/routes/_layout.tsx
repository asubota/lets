import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Container } from '@mui/material'
import { AppBar } from '../components/app-bar.tsx'

export const Route = createFileRoute('/_layout')({
  component: () => (
    <Container sx={{ pl: 1, pr: 1, pb: 1 }}>
      <AppBar />
      <Outlet />
    </Container>
  ),
})
