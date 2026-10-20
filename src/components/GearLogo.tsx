interface GearLogoProps {
  className?: string
}

/** Software Machine gear mark. */
export default function GearLogo({ className = 'h-7 w-7' }: GearLogoProps) {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
      {teeth.map((angle) => (
        <rect
          key={angle}
          x="14.25"
          y="2"
          width="3.5"
          height="6"
          rx="1"
          fill="currentColor"
          transform={`rotate(${angle} 16 16)`}
        />
      ))}
    </svg>
  )
}
