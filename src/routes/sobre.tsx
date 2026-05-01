/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from '@tanstack/react-router'
import { Icon, MapaCAD } from '../cemetery-components'

export const Route = createFileRoute('/sobre')({
  component: Sobre,
})

function Sobre() {
  return (
    <div className="page page-map">
      <section className="map-title">
        <div>
          <p className="eyebrow">Orientação no espaço</p>
          <h1>Mapa do cemitério</h1>
        </div>
        <Link className="button button-primary" to="/falecidos" search={{ q: '' }}>
          Buscar sepultamento
          <Icon name="arrow-right" />
        </Link>
      </section>

      <section className="map-layout">
        <div className="map-frame">
          <MapaCAD />
        </div>

        <aside className="map-sidebar">
          <p className="eyebrow">Legenda</p>
          <ul className="legend-list">
            <li>
              <span className="legend-swatch legend-sector" />
              Setores e quadras numeradas
            </li>
            <li>
              <span className="legend-swatch legend-accent" />
              Quadra destacada na consulta
            </li>
            <li>
              <span className="legend-swatch legend-route" />
              Rota a partir da entrada principal
            </li>
            <li>
              <span className="legend-swatch legend-poi" />
              Pontos de apoio e atendimento
            </li>
          </ul>

          <div className="sidebar-note">
            <Icon name="compass" />
            <p>
              O mapa é esquemático e prioriza a orientação por setor, quadra e
              pontos de referência.
            </p>
          </div>
        </aside>
      </section>

      <section id="ajuda" className="info-band">
        <p className="eyebrow">Ajuda</p>
        <h2>Como usar a consulta</h2>
        <div className="info-grid">
          <article>
            <span>01</span>
            <h3>Busque pelo nome</h3>
            <p>Use nome completo, primeiro nome ou sobrenome da pessoa.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Confira a localização</h3>
            <p>O sistema mostra setor, quadra, rua, jazigo e gaveta.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Siga pelo mapa</h3>
            <p>A rota indica o caminho principal até a quadra selecionada.</p>
          </article>
        </div>
      </section>

      <section id="contato" className="contact-band">
        <div>
          <p className="eyebrow">Contato</p>
          <h2>Atendimento do Cemitério Municipal</h2>
          <p>
            Para nomes com grafia incerta ou registros antigos, a equipe pode
            auxiliar com uma busca manual.
          </p>
        </div>
        <a className="button button-secondary" href="tel:+5511999990000">
          <Icon name="phone" />
          (11) 99999-0000
        </a>
      </section>
    </div>
  )
}
