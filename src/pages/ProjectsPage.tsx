import { GithubRepositoryList } from '../components/GithubRepositoryList'
import { ProjectCard } from '../components/ProjectCard'
import { portfolioProjects } from '../data/projects'

export function ProjectsPage() {
  return (
    <div className="page-shell page-section">
      <section aria-labelledby="projects-title">
        <div className="work-heading">
          <div className="section-heading">
            <p className="eyebrow">02 / SELECCIÓN DE TRABAJOS</p>
            <h1 className="page-title" id="projects-title">
              Práctica que se <em>vuelve experiencia.</em>
            </h1>
          </div>
          <p className="work-aside">
            Una muestra de lo que estoy explorando en desarrollo de software.
          </p>
        </div>

        <div className="project-grid">
          {portfolioProjects.map((project, index) => (
            <ProjectCard index={index} key={project.id} project={project} />
          ))}
        </div>
      </section>

      <GithubRepositoryList />
    </div>
  )
}
