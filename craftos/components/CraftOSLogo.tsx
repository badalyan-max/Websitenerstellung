import { cn } from '@/lib/utils'

// C-im-Hexagon Brand-Mark, 1:1 aus der App (craftos_logo_export)
const LOGO_PATH =
  'M 509.0,301.0 L 498.0,303.0 L 452.0,331.0 L 451.0,330.0 L 452.0,331.0 L 449.0,334.0 L 440.0,338.0 L 436.0,342.0 L 361.0,388.0 L 346.0,404.0 L 339.0,425.0 L 339.0,611.0 L 341.0,621.0 L 346.0,631.0 L 351.0,636.0 L 350.0,637.0 L 361.0,647.0 L 386.0,661.0 L 398.0,670.0 L 497.0,731.0 L 507.0,734.0 L 517.0,734.0 L 534.0,727.0 L 670.0,648.0 L 677.0,642.0 L 680.0,633.0 L 679.0,623.0 L 677.0,618.0 L 671.0,612.0 L 658.0,605.0 L 658.0,603.0 L 657.0,604.0 L 649.0,600.0 L 648.0,598.0 L 625.0,585.0 L 609.0,584.0 L 582.0,598.0 L 515.0,638.0 L 509.0,640.0 L 438.0,597.0 L 422.0,584.0 L 422.0,581.0 L 421.0,582.0 L 418.0,578.0 L 414.0,567.0 L 414.0,467.0 L 418.0,456.0 L 429.0,443.0 L 496.0,403.0 L 506.0,402.0 L 514.0,404.0 L 551.0,426.0 L 552.0,428.0 L 583.0,445.0 L 584.0,447.0 L 598.0,454.0 L 607.0,456.0 L 623.0,452.0 L 645.0,440.0 L 646.0,438.0 L 670.0,426.0 L 676.0,420.0 L 679.0,414.0 L 680.0,406.0 L 676.0,395.0 L 671.0,390.0 L 606.0,352.0 L 534.0,307.0 L 523.0,302.0 Z M 507.0,146.0 L 495.0,147.0 L 480.0,152.0 L 461.0,162.0 L 402.0,199.0 L 401.0,198.0 L 402.0,199.0 L 294.0,266.0 L 254.0,293.0 L 242.0,299.0 L 227.0,311.0 L 214.0,326.0 L 212.0,331.0 L 210.0,331.0 L 210.0,335.0 L 205.0,343.0 L 201.0,355.0 L 199.0,367.0 L 199.0,661.0 L 200.0,670.0 L 205.0,685.0 L 214.0,702.0 L 225.0,715.0 L 243.0,729.0 L 270.0,745.0 L 269.0,746.0 L 270.0,745.0 L 293.0,759.0 L 292.0,760.0 L 293.0,759.0 L 468.0,865.0 L 493.0,875.0 L 522.0,876.0 L 540.0,872.0 L 557.0,864.0 L 603.0,836.0 L 604.0,837.0 L 603.0,836.0 L 660.0,802.0 L 681.0,788.0 L 685.0,787.0 L 686.0,785.0 L 708.0,773.0 L 709.0,771.0 L 731.0,759.0 L 753.0,745.0 L 754.0,746.0 L 753.0,745.0 L 790.0,722.0 L 799.0,714.0 L 812.0,697.0 L 822.0,673.0 L 824.0,660.0 L 824.0,367.0 L 822.0,353.0 L 812.0,330.0 L 801.0,315.0 L 786.0,302.0 L 553.0,156.0 L 528.0,147.0 Z M 506.0,187.0 L 526.0,188.0 L 539.0,194.0 L 574.0,217.0 L 581.0,220.0 L 585.0,224.0 L 634.0,254.0 L 633.0,255.0 L 634.0,254.0 L 764.0,334.0 L 777.0,349.0 L 782.0,359.0 L 786.0,375.0 L 786.0,656.0 L 782.0,667.0 L 783.0,668.0 L 778.0,678.0 L 771.0,687.0 L 758.0,698.0 L 637.0,770.0 L 608.0,789.0 L 599.0,793.0 L 537.0,832.0 L 518.0,838.0 L 506.0,838.0 L 487.0,832.0 L 480.0,827.0 L 481.0,826.0 L 480.0,827.0 L 460.0,816.0 L 448.0,807.0 L 437.0,802.0 L 365.0,757.0 L 265.0,698.0 L 255.0,690.0 L 255.0,688.0 L 254.0,689.0 L 245.0,678.0 L 245.0,675.0 L 240.0,668.0 L 241.0,667.0 L 237.0,656.0 L 237.0,373.0 L 241.0,359.0 L 246.0,349.0 L 261.0,333.0 L 296.0,311.0 L 308.0,305.0 L 309.0,303.0 L 329.0,292.0 L 333.0,288.0 L 366.0,269.0 L 412.0,240.0 L 413.0,241.0 L 412.0,240.0 L 439.0,224.0 L 462.0,209.0 L 463.0,210.0 L 462.0,209.0 L 488.0,192.0 L 498.0,188.0 Z'

interface CraftOSLogoProps {
  variant?: 'full' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  /** tone wird für API-Kompatibilität akzeptiert — das Amber-Mark ist auf hell & dunkel identisch */
  tone?: 'dark' | 'light'
  className?: string
}

/** Nur das Amber-Mark (C-im-Hexagon), frei skalierbar */
export function CraftOSMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CraftOS"
      className={cn('flex-shrink-0', className)}
    >
      <defs>
        <linearGradient id="craftosLogoAmber" x1="25%" y1="12%" x2="76%" y2="88%">
          <stop offset="0%" stopColor="#ffc438" />
          <stop offset="55%" stopColor="#ffb21d" />
          <stop offset="100%" stopColor="#f19800" />
        </linearGradient>
      </defs>
      <path fill="url(#craftosLogoAmber)" fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  )
}

/**
 * CraftOS Logo — neues C-im-Hexagon-Mark, 1:1 portiert aus der App
 * (craft-connect-buddy/src/components/CraftOSLogo.tsx, Commit 66b9534b)
 */
export function CraftOSLogo({ variant = 'full', size = 'md', className }: CraftOSLogoProps) {
  const sizes = {
    sm: { icon: 28, text: 'text-base' },
    md: { icon: 36, text: 'text-lg' },
    lg: { icon: 48, text: 'text-xl' },
  }
  const { icon: iconSize, text: textSize } = sizes[size]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <CraftOSMark size={iconSize} />
      {variant === 'full' && (
        <div className={cn('flex flex-col', textSize)}>
          <span className="font-display font-bold leading-none tracking-tight text-ink-900">
            CraftOS
          </span>
          <span className="text-xs font-medium text-ink-400">Handwerkersoftware</span>
        </div>
      )}
    </div>
  )
}
