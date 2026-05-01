/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Monograma } from '../cemetery-components'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand-link" activeOptions={{ exact: true }}>
          <Monograma />
          <span>
            <strong>Cemitério Municipal</strong>
            <em>Sistema de consulta</em>
          </span>
        </Link>

        <nav className="nav-pill" aria-label="Navegação principal">
          <Link to="/" activeOptions={{ exact: true }}>
            Início
          </Link>
          <Link to="/falecidos" search={{ q: '' }}>
            Buscar
          </Link>
          <Link to="/sobre">Mapa</Link>
          <a href="/sobre#ajuda">Ajuda</a>
          <a href="/sobre#contato">Contato</a>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  )
}
