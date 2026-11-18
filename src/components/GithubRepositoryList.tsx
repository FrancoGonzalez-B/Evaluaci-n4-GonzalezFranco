import { useState } from 'react'
import { useGithubRepositories } from '../hooks/useGithubRepositories'
import type { GithubRepository, InputChangeEvent } from '../types'
import { RepositoryCard } from './RepositoryCard'
import './GithubRepositoryList.css'

export function GithubRepositoryList() {
  const { state, retry } = useGithubRepositories()
  const [query, setQuery] = useState<string>('')
  const normalizedQuery: string = query.trim().toLocaleLowerCase('es-CL')
  const visibleRepositories: GithubRepository[] =
    state.status === 'success'
      ? state.repositories.filter((repository) =>
          [repository.name, repository.description ?? '', repository.language ?? '']
            .join(' ')
            .toLocaleLowerCase('es-CL')
            .includes(normalizedQuery),
        )
      : []

  function updateQuery(event: InputChangeEvent): void {
    setQuery(event.currentTarget.value)
  }

  return (
    <section aria-labelledby="github-title" className="github-section">
      <div className="github-section__heading">
        <p className="github-section__eyebrow">DATOS EN VIVO · API PÚBLICA</p>
        <h2 className="github-section__title" id="github-title">Proyectos en GitHub</h2>
        <p className="github-section__intro">Repositorios públicos cargados desde mi cuenta de GitHub.</p>
      </div>
      {state.status === 'loading' && (
        <p className="status-message" role="status">Cargando mis repositorios…</p>
      )}
      {state.status === 'error' && (
        <div className="status-message status-message--error" role="alert">
          <p className="status-message__text">{state.message}</p>
          <button className="button button--outline" onClick={retry} type="button">Intentar otra vez</button>
        </div>
      )}
      {state.status === 'success' && (
        <>
          <div className="github-section__search">
            <label className="github-section__label" htmlFor="repo-search">Filtrar repositorios</label>
            <input
              className="github-section__input"
              autoComplete="off"
              id="repo-search"
              onChange={updateQuery}
              placeholder="Busca por nombre o lenguaje"
              type="search"
              value={query}
            />
          </div>
          <p className="github-section__count" role="status" aria-live="polite">
            {visibleRepositories.length} repositorios encontrados.
          </p>
          {visibleRepositories.length > 0 ? (
            <div className="github-section__grid">
              {visibleRepositories.map((repository) => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
            </div>
          ) : (
            <p className="status-message" role="status">
              {state.repositories.length === 0
                ? 'Todavía no hay repositorios públicos para mostrar.'
                : 'No encontré repositorios con ese filtro.'}
            </p>
          )}
        </>
      )}
    </section>
  )
}
