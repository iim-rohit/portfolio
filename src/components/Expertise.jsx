import { ArrowUpRight, BadgeCheck, Sparkles } from 'lucide-react'
import portfolio from '../data/portfolio.json'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechIcon from './TechIcon'
import TiltCard from './TiltCard'

export default function Expertise() {
  const { sections, certification } = portfolio

  return (
    <section
      id="skills"
      className="section expertise"
      aria-labelledby="skills-title"
    >
      <div className="container-wide">
        <div className="expertise-head">
          <SectionHeading
            index={sections.skills.index}
            eyebrow={sections.skills.eyebrow}
            id="skills-title"
            title={sections.skills.title}
            accent={sections.skills.accent}
            description={sections.skills.description}
          />

          <Reveal className="cert-mini" delay={0.12}>
            <span className="cert-mini-seal" aria-hidden="true">
              <BadgeCheck size={23} />
            </span>
            <div>
              <span className="cert-mini-label">CERTIFIED</span>
              <h3>{certification.title}</h3>
              <p>
                {certification.institute} · {certification.provider}
              </p>
            </div>
            <a
              href={portfolio.person.resumeUrl}
              download
              className="cert-mini-link"
              aria-label="View certification details in resume"
            >
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <div className="expertise-grid">
          {portfolio.expertise.map((group, index) => (
            <Reveal
              key={group.title}
              className={`expertise-reveal expertise-reveal--${index + 1}`}
              delay={0.05 + index * 0.05}
            >
              <TiltCard
                as="article"
                className={`expertise-card ${
                  group.tag ? 'expertise-card--tagged' : ''
                }`}
                max={4}
              >
                <div className="expertise-card-glow" aria-hidden="true" />
                <div className="expertise-card-top">
                  <span className="expertise-icon">
                    <Icon name={group.icon} size={21} />
                  </span>
                  <span className="expertise-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="expertise-content">
                  <h3>{group.title}</h3>
                  <p>{group.note}</p>
                </div>

                <div className="expertise-items">
                  {group.items.map((item) => (
                    <span className="expertise-item" key={item}>
                      <TechIcon name={item} size={15} />
                      {item}
                    </span>
                  ))}
                </div>

                {group.tag ? (
                  <span className="expertise-tag">
                    <Sparkles size={11} aria-hidden="true" />
                    {group.tag}
                  </span>
                ) : null}

                <span className="expertise-watermark" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="expertise-note" delay={0.1}>
          <span className="expertise-note-line" aria-hidden="true" />
          <p>
            Currently going deeper into React patterns, responsive systems and
            the MERN stack — one build at a time.
          </p>
          <span className="expertise-note-tag">ALWAYS LEARNING</span>
        </Reveal>
      </div>
    </section>
  )
}
