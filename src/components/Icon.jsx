import {
  Atom,
  BadgeCheck,
  Bike,
  BookOpen,
  Braces,
  CarFront,
  Clapperboard,
  Code2,
  Cpu,
  Database,
  FileCode2,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  Lightbulb,
  Mail,
  MonitorSmartphone,
  Paintbrush,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Trophy,
  Wrench
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const iconMap = {
  Atom,
  BadgeCheck,
  Bike,
  BookOpen,
  Braces,
  CarFront,
  Clapperboard,
  Code2,
  Cpu,
  Database,
  FileCode2,
  Github: GithubIcon,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  Lightbulb,
  Linkedin: LinkedinIcon,
  Mail,
  MonitorSmartphone,
  Paintbrush,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Trophy,
  Wrench
}

export default function Icon({ name, size = 24, ...props }) {
  const Component = iconMap[name] || Sparkles
  return <Component size={size} aria-hidden="true" {...props} />
}
