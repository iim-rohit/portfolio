import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react'
import portfolio from '../data/portfolio.json'
import { GithubIcon } from './BrandIcons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'

export default function Projects() {
  const { sections } = portfolio

  return (
    <section
      id="projects"
      className="section projects"
      aria-labelledby="projects-title"
    >
      <div className="container-wide">
        <div className="projects-head">
          <SectionHeading
            index={sections.projects.index}
            eyebrow={sections.projects.eyebrow}
            id="projects-title"
            title={sections.projects.title}
            accent={sections.projects.accent}
            description={sections.projects.description}
          />

          <Reveal className="projects-head-card" delay={0.12}>
            <span className="projects-head-card-icon" aria-hidden="true">
              <Sparkles size={17} />
            </span>
            <p>
              Designed, built and refined as part of my B.Tech journey — each
              project starts with a real problem.
            </p>
          </Reveal>
        </div>

        <div className="projects-grid">
          {portfolio.projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={0.06 + index * 0.08}
              className={`project-reveal ${
                index % 2 === 1 ? 'project-reveal--offset' : ''
              }`}
            >
              <TiltCard as="article" className="project-card" max={2.6}>
                <div className="project-visual">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    width="1200"
                    height="800"
                  />
                  <span className="project-visual-overlay" aria-hidden="true" />
                  <span className="project-visual-grid" aria-hidden="true" />

                  <div className="project-visual-top">
                    <span className="project-visual-label">ACADEMIC PROJECT</span>
                    <span className="project-visual-index">{project.index}</span>
                  </div>

                  <div className="project-visual-bottom">
                    <span>CONCEPT PREVIEW</span>
                    <span className="project-visual-arrow">
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <div className="project-body">
                  <div className="project-eyebrow">
                    <span className="project-eyebrow-index">
                      {project.index}
                    </span>
                    <span className="project-eyebrow-line" aria-hidden="true" />
                    <span>{project.eyebrow.toUpperCase()}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-footer">
                    <div className="project-meta">
                      <span className="project-meta-label">TOOLS</span>
                      <span>{project.tools.join(', ')}</span>
                    </div>

                    <div className="project-actions">
                      <button
                        type="button"
                        className="project-action project-action--primary"
                        disabled
                        title="Live demo coming soon"
                      >
                        Live Demo
                        <ExternalLink size={14} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="project-action"
                        disabled
                        title="GitHub repository coming soon"
                      >
                        GitHub
                        <GithubIcon size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="project-note">
                    Live demo and repository links are coming soon.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="projects-more" delay={0.08}>
          <p>More work is being built and documented.</p>
          <a
            href="https://github.com/iim-rohit"
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
          >
            Visit GitHub
            <GithubIcon size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
