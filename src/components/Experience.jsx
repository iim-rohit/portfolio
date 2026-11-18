import { ArrowUpRight, Check, MapPin } from 'lucide-react'
import { useEffect, useRef } from 'react'
import portfolio from '../data/portfolio.json'
import { gsap } from '../lib/gsap'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const timelineItems = [
  ...portfolio.education.map((item) => ({
    type: 'Education',
    marker: item.period,
    icon: item.icon,
    title: item.degree,
    meta: `${item.institution} · ${item.location}`,
    detail: item.score
      ? `Completed with a score of ${item.score}.`
      : 'Building a strong foundation in information technology, programming and web development.',
    badge: item.status
  })),
  {
    type: 'Certification',
    marker: 'MERN',
    icon: 'BadgeCheck',
    title: portfolio.certification.title,
    meta: `${portfolio.certification.institute} · ${portfolio.certification.provider}`,
    detail: portfolio.certification.note,
    badge: 'Certified'
  },
  {
    type: 'Academic work',
    marker: 'BUILD',
    icon: 'Code2',
    title: 'Projects with a purpose',
    meta: 'Buzz Chat · Smart Electricity Billing System',
    detail:
      'Two academic projects built to solve everyday problems — one makes conversation easier, the other makes essential services more accessible.',
    badge: '2 projects',
    tags: ['Chat application', 'Billing platform']
  }
]

export default function Experience() {
  const timelineRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(progressRef.current, { scaleY: 1 })
      return undefined
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 78%',
            end: 'bottom 64%',
            scrub: 0.8
          }
        }
      )
    }, timelineRef)

    return () => context.revert()
  }, [])

  return (
    <section
      id="experience"
      className="section experience"
      aria-labelledby="experience-title"
    >
      <div className="container-wide">
        <div className="experience-head">
          <SectionHeading
            index={portfolio.sections.education.index}
            eyebrow={portfolio.sections.education.eyebrow}
            id="experience-title"
            title={portfolio.sections.education.title}
            accent={portfolio.sections.education.accent}
            description={portfolio.sections.education.description}
          />

          <Reveal className="experience-status" delay={0.12}>
            <span className="experience-status-top">
              <span className="status-dot" aria-hidden="true" />
              CURRENTLY OPEN TO
            </span>
            <strong>Internships &amp; entry-level roles</strong>
            <span>Frontend · MERN · Full-stack foundations</span>
          </Reveal>
        </div>

        <div className="experience-grid">
          <aside className="experience-aside" aria-label="Experience summary">
            <Reveal className="experience-current">
              <span className="section-kicker">
                <span className="section-index">NOW</span>
                <span className="kicker-line" aria-hidden="true" />
                CURRENT CHAPTER
              </span>
              <h3>{portfolio.person.degree}</h3>
              <p>
                {portfolio.person.college}
                <span className="experience-current-location">
                  <MapPin size={13} aria-hidden="true" />
                  {portfolio.person.collegeLocation}
                </span>
              </p>
              <span className="experience-current-period">
                {portfolio.person.graduation} · Currently pursuing
              </span>
            </Reveal>

            <Reveal className="experience-honest" delay={0.08}>
              <p>
                No professional experience yet. My foundation comes from
                education, a MERN stack certification and hands-on academic
                projects.
              </p>
            </Reveal>

            <Reveal className="experience-looking" delay={0.12}>
              <h4>What I&apos;m looking for</h4>
              <ul>
                <li>
                  <Check size={13} aria-hidden="true" />
                  A team that values learning
                </li>
                <li>
                  <Check size={13} aria-hidden="true" />
                  Real product work to grow into
                </li>
                <li>
                  <Check size={13} aria-hidden="true" />
                  Frontend or MERN-focused roles
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <a
                href={portfolio.person.resumeUrl}
                download
                className="experience-resume"
              >
                <span>
                  <span className="experience-resume-label">FULL STORY</span>
                  Download my resume
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Reveal>
          </aside>

          <div className="timeline" ref={timelineRef}>
            <span className="timeline-rail" aria-hidden="true" />
            <span
              className="timeline-progress"
              ref={progressRef}
              aria-hidden="true"
            />

            {timelineItems.map((item, index) => (
              <Reveal
                key={`${item.type}-${item.title}`}
                className="timeline-item"
                delay={index * 0.04}
              >
                <div className="timeline-marker">
                  <span className="timeline-node">
                    <Icon name={item.icon} size={15} />
                  </span>
                  <span className="timeline-period">{item.marker}</span>
                </div>

                <div className="timeline-card">
                  <div className="timeline-card-top">
                    <span className="timeline-type">{item.type}</span>
                    {item.badge ? (
                      <span className="timeline-badge">{item.badge}</span>
                    ) : null}
                  </div>

                  <h3>{item.title}</h3>
                  <p className="timeline-meta">{item.meta}</p>
                  <p className="timeline-detail">{item.detail}</p>

                  {item.tags ? (
                    <div className="timeline-tags">
                      {item.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
