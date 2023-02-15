import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'
import { TopBar } from '../../components/Topbar'

import { Container, Container2, Container3 } from './styles'

export default function Main() {
  return (
    <Container>
      <TopBar />
        <Container2>
          <Sidebar />
          <section>
            <Outlet />
            <Container3 />
          </section>
        </Container2>
    </Container>
  )
}
