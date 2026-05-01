/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from '@tanstack/react-router'
import { DetailTerm, Icon, MapaCAD } from '../../cemetery-components'
import { encontrarFalecido } from '../../cemetery-data'

export const Route = createFileRoute('/falecidos/$falecidoId')({
  component: FalecidoDetail,
})

function FalecidoDetail() {
  const { falecidoId } = Route.useParams()
  const falecido = encontrarFalecido(falecidoId)

  if (!falecido) {
    return (
      <div className="page page-empty">
        <section className="empty-state">
          <p className="eyebrow">Registro indisponível</p>
          <h1>Não encontramos este sepultamento.</h1>
          <p>Volte à busca e selecione outro resultado cadastrado.</p>
          <Link className="button button-primary" to="/falecidos" search={{ q: '' }}>
            <Icon name="arrow-left" />
            Voltar para busca
          </Link>
        </section>
      </div>
    )
  }

  async function handleShare() {
    if (!falecido) {
      return
    }

    const shareData = {
      title: falecido.nome,
      text: `${falecido.nome} · Setor ${falecido.setor}, Quadra ${falecido.quadra}`,
      url: window.location.href,
    }

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined)
      return
    }

    await navigator.clipboard?.writeText(shareData.url)
  }

  return (
    <div className="page page-detail">
      <Link className="back-link" to="/falecidos" search={{ q: '' }}>
        <Icon name="arrow-left" />
        Voltar para resultados
      </Link>

      <section className="detail-layout">
        <div className="detail-copy">
          <p className="detail-kicker">em memória de</p>
          <h1>{falecido.nome}</h1>
          <p className="detail-dates">
            {falecido.nascimento} · {falecido.falecimento}
          </p>

          <article className="location-card">
            <p>
              Setor {falecido.setor} · Quadra {falecido.quadra}
            </p>
            <dl>
              <DetailTerm label="Rua" value={falecido.rua} />
              <DetailTerm label="Jazigo" value={falecido.jazigo} />
              <DetailTerm label="Gaveta" value={falecido.gaveta} />
              <DetailTerm label="Sepultamento" value={falecido.sepultamento} />
            </dl>
          </article>

          <div className="action-row">
            <button className="button button-secondary" type="button" onClick={() => window.print()}>
              <Icon name="print" />
              Imprimir
            </button>
            <button className="button button-secondary" type="button" onClick={handleShare}>
              <Icon name="share" />
              Compartilhar
            </button>
          </div>
        </div>

        <aside className="detail-map" aria-label="Mapa com rota até a quadra">
          <div className="map-header">
            <div>
              <p className="eyebrow">Rota sugerida</p>
              <h2>Entrada principal até a quadra</h2>
            </div>
            <span className="status-pill">{falecido.status}</span>
          </div>
          <MapaCAD destacar={falecido} rota />
        </aside>
      </section>
    </div>
  )
}
