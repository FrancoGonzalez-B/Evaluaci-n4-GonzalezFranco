import type { ProjectCardProps } from '../types'
import './ProjectCard.css'

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card" aria-labelledby={`project-${index}`}>
      <p className="project-card__category">{project.category}</p>
      <h2 className="project-card__title" id={`project-${index}`}>{project.name}</h2>
      <p className="project-card__description">{project.description}</p>
      <ul aria-label={`Tecnologías de ${project.name}`} className="project-card__tags">
        {project.technologies.map((technology) => (
          <li className="project-card__tag" key={technology}>{technology}</li>
        ))}
      </ul>
    </article>
  )
}
