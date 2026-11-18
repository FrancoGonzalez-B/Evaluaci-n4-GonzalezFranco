export type PortfolioProject = {
  id: string
  category: string
  name: string
  description: string
  technologies: string[]
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'calculadora-limites',
    category: 'PROYECTO PERSONAL',
    name: 'Calculadora Gráfica de Límites',
    description:
      'Una herramienta para representar límites en el plano cartesiano y explorar su comportamiento.',
    technologies: ['Gráficos', 'Matemática'],
  },
  {
    id: 'the-elea',
    category: 'FRONT-END',
    name: 'The ELEA',
    description:
      'Interfaz de una tienda en línea, organizada para presentar productos y facilitar la navegación.',
    technologies: ['HTML', 'CSS'],
  },
  {
    id: 'backend-tienda',
    category: 'BACK-END',
    name: 'Backend de tienda online',
    description:
      'Proyecto de backend para una tienda en línea, como parte del aprendizaje de desarrollo web.',
    technologies: ['API', 'Backend'],
  },
]
