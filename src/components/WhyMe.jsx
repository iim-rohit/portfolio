import { ArrowUpRight } from 'lucide-react'
import portfolio from '../data/portfolio.json'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TiltCard from './TiltCard'
import { scrollToSection } from '../lib/scroll'

export default function WhyMe() {
  const { sections } = portfolio

  return (
    <section
      id="why"
      className="section why"
      aria-labelledby="why-title"
    >
      <div className="container-wide">
        <div className="why-head">
          <SectionHeading
            index={sections.why.index}
            eyebrow={sections.why.eyebrow}
            id="why-title"
            title={sections.why.title}
            accent={sections.why.accent}
            description={sections.why.description}
          />

          <Reveal className="why-head-mark" delay={0.12}>
            <span className="why-head-mark-number">04</span>
            <span className="why-head-mark-label">
              REASONS TO
              <br />
              BUILD TOGETHER
            </span>
          </Reveal>
        </div>

        <div className="why-grid">
          {portfolio.whyMe.map((card, index) => (
            <Reveal key={card.title} delay={0.06 + index * 0.06}>
              <TiltCard as="article" className="why-card" max={4}>
                <span className="why-card-number">{card.number}</span>
                <span className="why-card-art" aria-hidden="true">
                  <Icon name={card.icon} size={126} strokeWidth={0.55} />
                </span>

                <div className="why-card-top">
                  <span className="why-card-icon">
                    <Icon name={card.icon} size={20} />
                  </span>
                  <span className="why-card-line" aria-hidden="true" />
                </div>

                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className="why-card-hover-label">
                  THE APPROACH
                  <span aria-hidden="true">/</span>
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="why-cta" delay={0.08}>
          <p>
            Good work starts with a good conversation.
            <span> Let&apos;s see if we&apos;re a fit.</span>
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => scrollToSection('#contact')}
          >
            Start a conversation
            <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
