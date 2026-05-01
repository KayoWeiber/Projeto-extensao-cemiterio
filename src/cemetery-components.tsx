import type { Falecido } from './cemetery-data'

type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'compass'
  | 'filters'
  | 'phone'
  | 'print'
  | 'search'
  | 'share'

type IconProps = {
  name: IconName
  className?: string
}

type MapaCADProps = {
  className?: string
  destacar?: Pick<Falecido, 'setor' | 'quadra'>
  rota?: boolean
}

const quadras = ['01', '02', '03', '04', '05', '06', '07', '08', '09']

const setores = {
  A: { x: 92, y: 126, label: 'Setor A' },
  B: { x: 394, y: 126, label: 'Setor B' },
  C: { x: 92, y: 346, label: 'Setor C' },
  D: { x: 394, y: 346, label: 'Setor D' },
} as const

const quadraSize = {
  width: 68,
  height: 38,
  gap: 8,
}

export function Icon({ name, className }: IconProps) {
  const common = {
    className: `icon ${className ?? ''}`,
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.5,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  switch (name) {
    case 'arrow-left':
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
          <path d="M21 12H9" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...common}>
          <path d="M3 12h12" />
          <path d="m9 6 6 6-6 6" />
        </svg>
      )
    case 'compass':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.2 8.8-2.1 5.5-5.5 2.1 2.1-5.5 5.5-2.1Z" />
        </svg>
      )
    case 'filters':
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M7 12h10" />
          <path d="M10 17h4" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
        </svg>
      )
    case 'print':
      return (
        <svg {...common}>
          <path d="M7 9V3h10v6" />
          <path d="M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
          <path d="M7 14h10v7H7z" />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m16.5 16.5 4 4" />
        </svg>
      )
    case 'share':
      return (
        <svg {...common}>
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
          <path d="M12 16V4" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      )
  }
}

export function Monograma({ className }: { className?: string }) {
  return (
    <span className={`monogram ${className ?? ''}`} aria-hidden="true">
      CM
    </span>
  )
}

export function DetailTerm({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="detail-term">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function getQuadraCenter(destacar?: Pick<Falecido, 'setor' | 'quadra'>) {
  if (!destacar) {
    return null
  }

  const setor = setores[destacar.setor]
  const index = quadras.indexOf(destacar.quadra)

  if (!setor || index === -1) {
    return null
  }

  const col = index % 3
  const row = Math.floor(index / 3)
  const x =
    setor.x +
    22 +
    col * (quadraSize.width + quadraSize.gap) +
    quadraSize.width / 2
  const y =
    setor.y +
    34 +
    row * (quadraSize.height + quadraSize.gap) +
    quadraSize.height / 2

  return { x, y }
}

export function MapaCAD({ className, destacar, rota = false }: MapaCADProps) {
  const centro = getQuadraCenter(destacar)
  const rotaPontos = centro
    ? `151,546 151,520 ${centro.x},520 ${centro.x},${centro.y}`
    : ''

  return (
    <svg
      className={`cad-map ${className ?? ''}`}
      role="img"
      aria-label="Mapa esquemático do Cemitério Municipal"
      viewBox="0 0 860 620"
    >
      <defs>
        <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" />
        </pattern>
      </defs>

      <rect className="map-bg" x="0" y="0" width="860" height="620" rx="22" />
      <rect className="map-grid" x="32" y="40" width="796" height="536" rx="16" />
      <path className="map-avenue" d="M46 292H810" />
      <path className="map-avenue" d="M320 78V546" />
      <path className="map-avenue" d="M640 88V546" />

      {Object.entries(setores).map(([key, setor]) => (
        <g key={key} className="map-sector">
          <rect x={setor.x} y={setor.y} width="250" height="166" rx="10" />
          <text x={setor.x} y={setor.y - 14}>
            {setor.label}
          </text>
          {quadras.map((quadra, index) => {
            const col = index % 3
            const row = Math.floor(index / 3)
            const x = setor.x + 22 + col * (quadraSize.width + quadraSize.gap)
            const y = setor.y + 34 + row * (quadraSize.height + quadraSize.gap)
            const active = destacar?.setor === key && destacar.quadra === quadra

            return (
              <g
                key={`${key}-${quadra}`}
                className={active ? 'map-lot is-active' : 'map-lot'}
              >
                <rect x={x} y={y} width={quadraSize.width} height={quadraSize.height} rx="5" />
                <text x={x + quadraSize.width / 2} y={y + 25}>
                  {quadra}
                </text>
              </g>
            )
          })}
        </g>
      ))}

      <g className="map-poi">
        <rect x="92" y="532" width="118" height="28" rx="4" />
        <text x="151" y="551">
          Entrada Principal
        </text>
        <rect x="700" y="122" width="92" height="36" rx="4" />
        <text x="746" y="145">
          Capela
        </text>
        <rect x="692" y="202" width="116" height="36" rx="4" />
        <text x="750" y="225">
          Administração
        </text>
        <rect x="706" y="282" width="88" height="36" rx="4" />
        <text x="750" y="305">
          Banheiros
        </text>
        <rect x="684" y="454" width="130" height="36" rx="4" />
        <text x="749" y="477">
          Estacionamento
        </text>
      </g>

      {rota && centro ? <polyline className="map-route" points={rotaPontos} /> : null}

      {centro ? (
        <g className="map-pin" transform={`translate(${centro.x} ${centro.y})`}>
          <circle r="12" />
          <circle r="4" />
        </g>
      ) : null}

      <g className="map-compass" transform="translate(76 84)">
        <circle r="24" />
        <path d="M0-15 5 0 0 15-5 0Z" />
        <text x="0" y="-31">
          N
        </text>
      </g>

      <g className="map-scale" transform="translate(650 544)">
        <path d="M0 0H96" />
        <path d="M0-6V6M96-6V6" />
        <text x="48" y="22">
          20m
        </text>
      </g>
    </svg>
  )
}
