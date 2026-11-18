import type { NavigationItem, Profile } from '../types'

export const profile: Profile = {
  name: 'Franco González',
  degree: 'Ingeniería Civil en Informática',
  university: 'Universidad Católica de Temuco',
  city: 'Temuco, Chile',
  email: 'franco.gonzalez2026@alu.uct.cl',
  githubUrl: 'https://github.com/FrancoGonzalez-B',
  photoPath: 'images/franco-gonzalez.jpeg',
  intro: 'Me interesa crear interfaces web claras y fáciles de usar.',
  note: 'En formación · Ingeniería Civil en Informática',
  heroTitle: ['Ideas claras,', 'experiencias', 'que conectan.'],
  contactTitle: '¿Creamos algo',
  contactHighlight: 'con intención?',
  contactIntro: 'Estoy empezando mi camino en tecnología y siempre tengo ganas de conversar, colaborar y aprender.',
  projectsTitle: 'Práctica que se',
  projectsHighlight: 'vuelve experiencia.',
  projectsIntro: 'Una muestra de lo que estoy explorando en el bloque de desarrollo frontend.',
}
export const navigation: NavigationItem[] = [
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/contacto', label: 'Contacto' },
]
