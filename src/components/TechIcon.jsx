import { Code2 } from 'lucide-react'
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact
} from 'react-icons/si'

const icons = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  'React.js': SiReact,
  React: SiReact,
  C: SiC,
  'C++': SiCplusplus,
  GitHub: SiGithub,
  Git: SiGit,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  'VS Code': Code2
}

export default function TechIcon({ name, size = 20, ...props }) {
  const Component = icons[name] || Code2
  return <Component size={size} aria-hidden="true" {...props} />
}
