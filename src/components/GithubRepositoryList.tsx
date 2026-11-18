import { useMemo, useState } from 'react'
import { useGithubRepositories } from '../hooks/useGithubRepositories'
import { RepositoryCard } from './RepositoryCard'

export function GithubRepositoryList() {
  const { state, retry } = useGithubRepositories()
  const [query, setQuery] = useState('')

  const visibleRepositories = useMemo(() => {
    if (state.status !== 'success') return []
    const normalizedQuery = query.trim().toLocaleLowerCase('es-CL')
    if (!normalizedQuery) return state.repositories

    return state.repositories.filter((repository) =>
      [repository.name, repository.description ?? '', repository.language ?? '']
        .join(' ')
        .toLocaleLowerCase('es-CL')
        .includes(normalizedQuery),
    )
  }, [query, state])

  return (
    <section aria-labelledby="github-title" className="github-section">
      <div className="section-heading">
        <p className="eyebrow">DATOS EN VIVO · API PÚBLICA</p>
        <h2 id="github-title">Proyectos en GitHub</h2>
        <p className="section-intro">
          Repositorios públicos cargados desde mi cuenta de GitHub.
        </p>
      </div>

      {state.status === 'loading' && (
        <p className="notice" role="status">
          Cargando mis repositorios…
        </p>
      )}

      {state.status === 'error' && (
        <div className="notice notice-error" role="alert">
          <p>{state.message}</p>
          <button className="button button-outline" onClick={retry} type="button">
            Intentar otra vez
          </button>
        </div>
      )}

      {state.status === 'success' && (
        <>
          <div className="search-field">
            <label htmlFor="repo-search">Filtrar repositorios</label>
            <input
              autoComplete="off"
              id="repo-search"
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Busca por nombre o lenguaje"
              type="search"
              value={query}
            />
          </div>

          {visibleRepositories.length > 0 ? (
            <div className="repository-grid">
              {visibleRepositories.map((repository) => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
            </div>
          ) : (
            <p className="notice" role="status">
              {state.repositories.length === 0
                ? 'Todavía no hay repositorios públicos con contenido para mostrar.'
                : 'No encontré repositorios con ese filtro.'}
            </p>
          )}
        </>
      )}
    </section>
  )
}
