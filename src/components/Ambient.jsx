const particles = [
  { left: '8%', top: '22%', delay: '-1s', duration: '13s', size: 2 },
  { left: '17%', top: '72%', delay: '-6s', duration: '16s', size: 3 },
  { left: '26%', top: '38%', delay: '-3s', duration: '11s', size: 2 },
  { left: '38%', top: '84%', delay: '-8s', duration: '18s', size: 2 },
  { left: '49%', top: '16%', delay: '-5s', duration: '14s', size: 3 },
  { left: '61%', top: '63%', delay: '-2s', duration: '12s', size: 2 },
  { left: '72%', top: '29%', delay: '-9s', duration: '17s', size: 2 },
  { left: '83%', top: '78%', delay: '-4s', duration: '15s', size: 3 },
  { left: '91%', top: '44%', delay: '-7s', duration: '19s', size: 2 },
  { left: '55%', top: '92%', delay: '-10s', duration: '13s', size: 2 }
]

export default function Ambient() {
  return (
    <div className="site-ambient" aria-hidden="true">
      <div className="site-ambient__grid" />
      <div className="site-ambient__glow site-ambient__glow--one" />
      <div className="site-ambient__glow site-ambient__glow--two" />
      <div className="site-ambient__beam" />
      <div className="site-ambient__particles">
        {particles.map((particle, index) => (
          <span
            key={index}
            className="ambient-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
      <div className="site-ambient__noise" />
    </div>
  )
}
