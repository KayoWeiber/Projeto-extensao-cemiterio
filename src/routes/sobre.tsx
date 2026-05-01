import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sobre')({
  component: Sobre,
})

function Sobre() {
  return (
    <div className="page">
      <h1>Sobre</h1>
      <p>Projeto de extensão universitária — Cemitério Municipal.</p>
    </div>
  )
}
