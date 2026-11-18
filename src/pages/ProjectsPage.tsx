import { GithubRepositoryList } from '../components/GithubRepositoryList'
import { ProjectCard } from '../components/ProjectCard'
import { profile } from '../data/portfolio'
import { portfolioProjects } from '../data/projects'
import './ProjectsPage.css'

export function ProjectsPage() {
  return (
    <div className="projects-page page-shell">
      <section aria-labelledby="projects-title">
        <div className="projects-page__heading">
          <div>
            <p className="projects-page__eyebrow">02 / SELECCIÓN DE TRABAJOS</p>
            <h1 className="projects-page__title" id="projects-title">
              {profile.projectsTitle}<br /><em className="projects-page__highlight">{profile.projectsHighlight}</em>
            </h1>
          </div>
          <p className="projects-page__intro">{profile.projectsIntro}</p>
        </div>
        <div className="projects-page__grid">
          {portfolioProjects.map((project, index) => (
            <ProjectCard index={index} key={project.id} project={project} />
          ))}
        </div>
      </section>
      <GithubRepositoryList />
    </div>
  )
}
