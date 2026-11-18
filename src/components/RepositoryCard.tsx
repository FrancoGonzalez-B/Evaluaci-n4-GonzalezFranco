import type { RepositoryCardProps } from '../types'
import './RepositoryCard.css'

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <article className="repository-card">
      <p className="repository-card__category">{repository.language ?? 'Repositorio'} · GitHub</p>
      <h3 className="repository-card__title">{repository.name}</h3>
      <p className="repository-card__description">
        {repository.description || 'Este repositorio todavía no tiene descripción.'}
      </p>
      <div className="repository-card__meta">
        <span>{repository.stargazers_count} estrellas</span>
        <span>Actualizado {new Date(repository.updated_at).toLocaleDateString('es-CL')}</span>
      </div>
      <a
        className="repository-card__link text-link"
        href={repository.html_url}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={`Ver código de ${repository.name} en GitHub (abre otra pestaña)`}
      >
        Ver repositorio <span aria-hidden="true">↗</span>
      </a>
    </article>
  )
}
