import {
  ArrowUpRight,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles
} from 'lucide-react'
import portfolio from '../data/portfolio.json'
import CountUp from './CountUp'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

export default function About() {
  const { person, sections } = portfolio

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container-wide">
        <div className="about-head">
          <SectionHeading
            index={sections.about.index}
            eyebrow={sections.about.eyebrow}
            id="about-title"
            title={sections.about.title}
            accent={sections.about.accent}
          />
          <Reveal className="about-head-note" delay={0.1}>
            <span className="about-head-note-line" aria-hidden="true" />
            <span>
              Still early in the journey.
              <br />
              Already building with intent.
            </span>
          </Reveal>
        </div>

        <div className="about-grid">
          <div className="about-main">
            <Reveal className="about-copy" delay={0.08}>
              <p>{person.aboutBody}</p>
              <p>{person.aboutSecondary}</p>
            </Reveal>

            <div className="about-highlights">
              {portfolio.aboutCards.map((card, index) => (
                <Reveal
                  key={card.title}
                  className="highlight-card"
                  delay={0.08 + index * 0.07}
                >
                  <span className="highlight-icon">
                    <Icon name={card.icon} size={19} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.detail}</p>
                  <span className="highlight-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal className="journey" delay={0.08}>
              <div className="journey-head">
                <span className="section-kicker">
                  <span className="section-index">PATH</span>
                  <span className="kicker-line" aria-hidden="true" />
                  THE JOURNEY SO FAR
                </span>
              </div>

              <div className="journey-list">
                {portfolio.journey.map((item) => (
                  <div className="journey-item" key={item.marker}>
                    <span className="journey-marker">{item.marker}</span>
                    <span className="journey-dot" aria-hidden="true" />
                    <div className="journey-copy">
                      <h4>{item.title}</h4>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="interests" delay={0.1}>
              <div className="journey-head">
                <span className="section-kicker">
                  <span className="section-index">OFFLINE</span>
                  <span className="kicker-line" aria-hidden="true" />
                  WHAT KEEPS ME CURIOUS
                </span>
              </div>

              <div className="interest-chips">
                {portfolio.interests.map((interest) => (
                  <span className="interest-chip" key={interest.name}>
                    <Icon name={interest.icon} size={15} />
                    {interest.name}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="about-aside" aria-label="Profile summary">
            <Reveal delay={0.06}>
              <TiltCard className="dossier-card" max={4}>
                <div className="dossier-glow" aria-hidden="true" />
                <div className="dossier-top">
                  <span>PROFILE / 01</span>
                  <span className="dossier-status">
                    <span className="status-dot" aria-hidden="true" />
                    AVAILABLE
                  </span>
                </div>

                <div className="dossier-avatar" aria-hidden="true">
                  <span className="dossier-orbit dossier-orbit--one" />
                  <span className="dossier-orbit dossier-orbit--two" />
                  <span className="dossier-initials">{person.initials}</span>
                </div>

                <div className="dossier-identity">
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>

                <div className="dossier-details">
                  <div className="dossier-detail">
                    <GraduationCap size={16} aria-hidden="true" />
                    <div>
                      <span>EDUCATION</span>
                      <strong>{person.degree}</strong>
                    </div>
                  </div>
                  <div className="dossier-detail">
                    <MapPin size={16} aria-hidden="true" />
                    <div>
                      <span>BASED IN</span>
                      <strong>{person.location}</strong>
                    </div>
                  </div>
                  <div className="dossier-detail">
                    <Mail size={16} aria-hidden="true" />
                    <div>
                      <span>EMAIL</span>
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                    </div>
                  </div>
                </div>

                <div className="dossier-stats">
                  {portfolio.stats.map((stat) => (
                    <div className="dossier-stat" key={stat.label}>
                      <span className="dossier-stat-value">
                        <CountUp value={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="dossier-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <a
                  className="dossier-link"
                  href={person.resumeUrl}
                  download
                >
                  View full resume
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </TiltCard>
            </Reveal>

            <Reveal className="about-note-card" delay={0.14}>
              <span className="about-note-icon" aria-hidden="true">
                <Sparkles size={18} />
              </span>
              <p>
                Learning in public, shipping side projects and looking for the
                right team to grow with.
              </p>
              <span className="about-note-label">CURRENT FOCUS</span>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
