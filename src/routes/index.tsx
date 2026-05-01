import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="page">
      <h1>Cemitério Municipal</h1>
      <p>Bem-vindo ao sistema de consulta e gestão do cemitério.</p>
    </div>
  )
}
