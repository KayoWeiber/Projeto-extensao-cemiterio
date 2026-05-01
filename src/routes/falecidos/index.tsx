/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { DetailTerm, Icon } from '../../cemetery-components'
import {
  buscarFalecidos,
  falecidos,
  type Falecido,
} from '../../cemetery-data'

type FalecidosSearch = {
  q: string
  setor?: Falecido['setor']
}

const setores = ['A', 'B', 'C', 'D'] as const

export const Route = createFileRoute('/falecidos/')({
  validateSearch: (search: Record<string, unknown>): FalecidosSearch => {
    const q = typeof search.q === 'string' ? search.q : ''
    const setor = setores.find((item) => item === search.setor)

    return {
      q,
      setor,
    }
  },
  component: FalecidosList,
})

function FalecidosList() {
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  function handleSearch(nextSearch: FalecidosSearch) {
    void navigate({
      to: '/falecidos',
      search: nextSearch,
    })
  }

  return (
    <FalecidosContent
      key={`${search.q}-${search.setor ?? ''}`}
      search={search}
      onSearch={handleSearch}
    />
  )
}

function FalecidosContent({
  search,
  onSearch,
}: {
  search: FalecidosSearch
  onSearch: (search: FalecidosSearch) => void
}) {
  const [query, setQuery] = useState(search.q)
  const [setor, setSetor] = useState<Falecido['setor'] | ''>(search.setor ?? '')
  const temBusca = Boolean(search.q.trim() || search.setor)
  const base = search.q.trim() ? buscarFalecidos(search.q) : falecidos
  const resultados = search.setor
    ? base.filter((falecido) => falecido.setor === search.setor)
    : base

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSearch({
      q: query.trim(),
      setor: setor || undefined,
    })
  }

  function handleClear() {
    setQuery('')
    setSetor('')
    onSearch({ q: '' })
  }

  if (!temBusca) {
    return (
      <div className="page page-search">
        <section className="search-intro">
          <p className="eyebrow">Busca</p>
          <h1>Localize um sepultamento pelo nome.</h1>
          <p>
            A consulta retorna a localização completa e uma rota esquemática a
            partir da entrada principal.
          </p>
        </section>

        <SearchPanel
          query={query}
          setor={setor}
          onQueryChange={setQuery}
          onSetorChange={setSetor}
          onSubmit={handleSubmit}
        />
      </div>
    )
  }

  if (resultados.length === 0) {
    return (
      <div className="page page-empty">
        <SearchPanel
          query={query}
          setor={setor}
          onQueryChange={setQuery}
          onSetorChange={setSetor}
          onSubmit={handleSubmit}
        />

        <section className="empty-state">
          <p className="eyebrow">Nenhum registro localizado</p>
          <h1>
            Não encontramos <em>"{search.q}"</em>
          </h1>
          <p>
            Verifique a grafia, tente apenas um sobrenome ou entre em contato
            com o atendimento para uma busca assistida.
          </p>
          <div className="action-row">
            <button className="button button-primary" type="button" onClick={handleClear}>
              Tentar outra busca
            </button>
            <a className="button button-secondary" href="/sobre#contato">
              <Icon name="phone" />
              Falar com atendimento
            </a>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page page-results">
      <SearchPanel
        query={query}
        setor={setor}
        onQueryChange={setQuery}
        onSetorChange={setSetor}
        onSubmit={handleSubmit}
      />

      <section className="results-heading">
        <p className="eyebrow">
          {resultados.length} {resultados.length === 1 ? 'registro' : 'registros'}
        </p>
        <h1>
          resultados para <em>"{search.q || `setor ${search.setor}`}"</em>
        </h1>
      </section>

      <section className="result-list" aria-label="Resultados encontrados">
        {resultados.map((falecido) => (
          <article key={falecido.id} className="result-card">
            <div className="result-person">
              <h2>{falecido.nome}</h2>
              <p>
                {falecido.nascimento} · {falecido.falecimento}
              </p>
            </div>

            <dl className="result-location">
              <DetailTerm label="Setor" value={falecido.setor} />
              <DetailTerm label="Quadra" value={falecido.quadra} />
              <DetailTerm label="Jazigo" value={falecido.jazigo} />
              <DetailTerm label="Gaveta" value={falecido.gaveta} />
            </dl>

            <div className="result-actions">
              <span className="status-pill">{falecido.status}</span>
              <Link
                className="circle-button"
                to="/falecidos/$falecidoId"
                params={{ falecidoId: falecido.id }}
                aria-label={`Abrir detalhes de ${falecido.nome}`}
              >
                <Icon name="arrow-right" />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function SearchPanel({
  query,
  setor,
  onQueryChange,
  onSetorChange,
  onSubmit,
}: {
  query: string
  setor: Falecido['setor'] | ''
  onQueryChange: (query: string) => void
  onSetorChange: (setor: Falecido['setor'] | '') => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form className="search-card search-card-compact" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="results-search">
        Nome da pessoa sepultada
      </label>
      <div className="search-pill">
        <Icon name="search" />
        <input
          id="results-search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Digite um nome"
        />
        <button className="button button-primary" type="submit">
          Buscar
          <Icon name="arrow-right" />
        </button>
      </div>

      <div className="filter-strip" aria-label="Filtrar por setor">
        <span>Setor</span>
        {setores.map((item) => (
          <button
            key={item}
            className={setor === item ? 'chip is-active' : 'chip'}
            type="button"
            onClick={() => onSetorChange(setor === item ? '' : item)}
          >
            {item}
          </button>
        ))}
      </div>
    </form>
  )
}
