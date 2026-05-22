type Props = {
  active: boolean
  size?: number
}

export const GameIcon = ({ active, size = 24 }: Props) => {
  const stroke = 'currentColor'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transition: 'transform 220ms ease',
        transform: active ? 'rotate(-8deg) scale(1.05)' : 'none',
        overflow: 'visible',
      }}
    >
      <ellipse
        cx="7.6"
        cy="18.2"
        rx="3.4"
        ry="2.9"
        fill={active ? '#c98763' : 'none'}
        stroke={stroke}
        strokeWidth="1.4"
      />
      <ellipse
        cx="16.4"
        cy="18.2"
        rx="3.4"
        ry="2.9"
        fill={active ? '#c98763' : 'none'}
        stroke={stroke}
        strokeWidth="1.4"
      />

      <path
        d="M 8.6 16 Q 8.2 11 9 7.5 Q 9.6 4.5 12 4 Q 14.4 4.5 15 7.5 Q 15.8 11 15.4 16 Z"
        fill={active ? '#e8a988' : 'none'}
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <ellipse
        cx="12"
        cy="5.4"
        rx="3.5"
        ry="2.6"
        fill={active ? '#d49a78' : 'none'}
        stroke={stroke}
        strokeWidth="1.4"
      />

      {active && (
        <>
          <path
            d="M 8.7 9 Q 12 10 15.3 9"
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="0.7"
            fill="none"
          />
          <ellipse cx="12" cy="3.4" rx="0.7" ry="1" fill="rgba(0,0,0,0.45)" />
        </>
      )}
    </svg>
  )
}
