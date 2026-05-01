import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="navbar">
        <span className="nav-brand">Cemitério Municipal</span>
        <div className="nav-links">
          <Link to="/" activeOptions={{ exact: true }}>
            Início
          </Link>
          <Link to="/falecidos">Falecidos</Link>
          <Link to="/sobre">Sobre</Link>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
})
