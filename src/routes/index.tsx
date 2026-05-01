/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { Icon, Monograma } from '../cemetery-components'
import { buscasRecentes, type Falecido } from '../cemetery-data'

export const Route = createFileRoute('/')({
  component: Home,
})

const setores = ['A', 'B', 'C', 'D'] as const

function Home() {
  const navigate = Route.useNavigate()
  const [query, setQuery] = useState('')
  const [setor, setSetor] = useState<Falecido['setor'] | ''>('')
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    void navigate({
      to: '/falecidos',
      search: {
        q: query.trim(),
        setor: setor || undefined,
      },
    })
  }

  return (
    <div className="page page-home">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <div className="eyebrow-row">
            <span>Consulta de sepultamento</span>
            <i />
          </div>

          <h1 id="home-title">
            Encontre quem <em>você ama</em>, com calma.
          </h1>
        </div>

        <div className="hero-aside">
          <p>
            Informe o nome de uma pessoa sepultada para localizar setor, quadra,
            rua, jazigo e gaveta com orientação visual pelo mapa.
          </p>
        </div>

        <form className="search-card" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="home-search">
            Nome da pessoa sepultada
          </label>
          <div className="search-pill">
            <Icon name="search" />
            <input
              id="home-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Digite um nome"
            />
            <button
              className="button button-secondary"
              type="button"
              aria-pressed={filtrosAbertos}
              onClick={() => setFiltrosAbertos((aberto) => !aberto)}
            >
              <Icon name="filters" />
              Filtros
            </button>
            <button className="button button-primary" type="submit">
              Buscar
              <Icon name="arrow-right" />
            </button>
          </div>

          {filtrosAbertos ? (
            <div className="filter-strip" aria-label="Filtrar por setor">
              <span>Setor</span>
              {setores.map((item) => (
                <button
                  key={item}
                  className={setor === item ? 'chip is-active' : 'chip'}
                  type="button"
                  onClick={() => setSetor((atual) => (atual === item ? '' : item))}
                >
                  {item}
                </button>
              ))}
            </div>
          ) : null}
        </form>
      </section>

      <section className="home-panels" aria-label="Orientações e buscas recentes">
        <article className="guide-card">
          <Monograma className="guide-mark" />
          <p className="eyebrow">Como encontrar o túmulo?</p>
          <ol>
            <li>
              <span>01</span>
              <p>Digite o nome completo ou parte do nome.</p>
            </li>
            <li>
              <span>02</span>
              <p>Abra o resultado correspondente à pessoa buscada.</p>
            </li>
            <li>
              <span>03</span>
              <p>Siga a rota indicada no mapa até a quadra.</p>
            </li>
          </ol>
        </article>

        <article className="recent-card">
          <div className="section-heading">
            <p className="eyebrow">Buscas recentes</p>
            <Link to="/falecidos" search={{ q: '' }}>
              Ver busca
            </Link>
          </div>

          <div className="recent-list">
            {buscasRecentes.map((falecido) => (
              <Link
                key={falecido.id}
                className="recent-item"
                to="/falecidos/$falecidoId"
                params={{ falecidoId: falecido.id }}
              >
                <strong>{falecido.nome}</strong>
                <span>
                  Setor {falecido.setor} · Quadra {falecido.quadra} · {falecido.rua}
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
