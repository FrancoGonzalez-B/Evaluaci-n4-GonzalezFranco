import type { GithubRepository } from '../types/github'

type RepositoryCardProps = {
  repository: GithubRepository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <article className="repository-card">
      <p className="project-type">
        {repository.language ?? 'Repositorio'} · GitHub
      </p>
      <h3>{repository.name}</h3>
      <p className="project-description">
        {repository.description || 'Este repositorio todavía no tiene descripción.'}
      </p>
      <div className="repository-meta">
        <span>{repository.stargazers_count} estrellas</span>
        <span>
          Actualizado {new Date(repository.updated_at).toLocaleDateString('es-CL')}
        </span>
      </div>
      <a
        className="text-link"
        href={repository.html_url}
        rel="noreferrer"
        target="_blank"
      >
        Ver repositorio <span aria-hidden="true">↗</span>
      </a>
    </article>
  )
}
