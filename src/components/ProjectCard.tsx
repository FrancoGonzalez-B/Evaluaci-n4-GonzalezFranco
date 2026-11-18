import type { PortfolioProject } from '../data/projects'

type ProjectCardProps = {
  project: PortfolioProject
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card">
      <p className="project-type">
        {String(index + 1).padStart(2, '0')} / {project.category}
      </p>
      <h3>{project.name}</h3>
      <p className="project-description">{project.description}</p>
      <ul aria-label={`Tecnologías de ${project.name}`} className="tag-list">
        {project.technologies.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
    </article>
  )
}
