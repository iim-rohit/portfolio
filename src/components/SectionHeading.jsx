import Reveal from './Reveal'

export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  align = 'left',
  id
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <Reveal className="section-kicker">
        <span className="section-index">{index}</span>
        <span className="section-kicker-line" aria-hidden="true" />
        <span>{eyebrow}</span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="section-title" id={id}>
          {title}
          {accent ? (
            <>
              {' '}
              <span className="gradient-text">{accent}</span>
            </>
          ) : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p className="section-description">{description}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
