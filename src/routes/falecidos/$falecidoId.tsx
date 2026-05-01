import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/falecidos/$falecidoId')({
  component: FalecidoDetail,
})

function FalecidoDetail() {
  const { falecidoId } = Route.useParams()

  return (
    <div className="page">
      <h1>Detalhes do Falecido</h1>
      <p>ID: {falecidoId}</p>
    </div>
  )
}
