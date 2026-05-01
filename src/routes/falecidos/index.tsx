import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/falecidos/')({
  component: FalecidosList,
})

function FalecidosList() {
  return (
    <div className="page">
      <h1>Falecidos</h1>
      <p>Lista de falecidos cadastrados.</p>
    </div>
  )
}
