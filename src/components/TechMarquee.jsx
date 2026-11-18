import portfolio from '../data/portfolio.json'
import TechIcon from './TechIcon'

const marqueeItems = [
  ...portfolio.skills.map((skill) => ({
    name: skill.name,
    category: skill.category,
    icons: [skill.name]
  })),
  {
    name: 'MERN Stack',
    category: 'Certification',
    icons: ['MongoDB', 'Node.js', 'Express.js', 'React']
  }
]

export default function TechMarquee() {
  return (
    <section className="tech-band" aria-label="Technology stack">
      <div className="container-wide tech-band-head">
        <span className="section-kicker">
          <span className="section-index">STACK</span>
          <span className="kicker-line" aria-hidden="true" />
          MY DIGITAL TOOLKIT
        </span>
        <p>
          The tools I use to turn ideas into interfaces — and the MERN
          foundation behind them.
        </p>
      </div>

      <div className="tech-marquee">
        <div className="tech-marquee-track">
          {marqueeItems.map((item, index) => (
            <span className="tech-pill" key={`${item.name}-${index}`}>
              <span className="tech-pill-icons">
                {item.icons.map((icon) => (
                  <TechIcon key={icon} name={icon} size={19} />
                ))}
              </span>
              <span className="tech-pill-name">{item.name}</span>
              <span className="tech-pill-category">{item.category}</span>
            </span>
          ))}
        </div>
        <div className="tech-marquee-track" aria-hidden="true">
          {marqueeItems.map((item, index) => (
            <span className="tech-pill" key={`${item.name}-dup-${index}`}>
              <span className="tech-pill-icons">
                {item.icons.map((icon) => (
                  <TechIcon key={icon} name={icon} size={19} />
                ))}
              </span>
              <span className="tech-pill-name">{item.name}</span>
              <span className="tech-pill-category">{item.category}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
