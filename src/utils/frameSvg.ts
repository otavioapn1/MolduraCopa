/**
 * High-quality vector representation of the Brazilian National Team Story Frame.
 * Designed dynamically to replicate the exact design, brand elements, colors, and layout
 * without relying on external file hosts, ensuring 100% offline availability and CORS safety.
 */

export const FRAME_WIDTH = 1080;
export const FRAME_HEIGHT = 1920;

export const FRAME_SVG_CONTENT = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920" fill="none">
  <defs>
    <!-- Five-point star template -->
    <g id="star">
      <path d="M 0,-15 L 4.4,-4.5 L 14.3,-4.5 L 6.3,2.7 L 9.3,13.2 L 0,6.8 L -9.3,13.2 L -6.3,2.7 L -14.3,-4.5 L -4.4,-4.5 Z" fill="#009739" />
    </g>
    <!-- Gold/Yellow star template -->
    <g id="gold-star">
      <path d="M 0,-10 L 2.9,-3 L 9.5,-3 L 4.2,1.8 L 6.2,8.8 L 0,4.5 L -6.2,8.8 L -4.2,1.8 L -9.5,-3 L -2.9,-3 Z" fill="#FFDF00" />
    </g>
  </defs>

  <!-- BACKGROUND: Transparent center for user photo visibility -->

  <!-- TOP-LEFT CORNER: Green and yellow paint/artistic brush splatters -->
  <!-- Yellow stroke layer 1 -->
  <path d="M -20,-20 Q 150,-20 280,30 Q 380,80 340,150 Q 280,220 120,180 Q -20,120 -20,-20 Z" fill="#FFDF00" opacity="0.95" />
  <!-- Green stroke layer 2, overlapping -->
  <path d="M -30,-30 Q 120,-30 220,10 Q 300,50 270,110 Q 210,160 90,130 Q -30,90 -30,-30 Z" fill="#009739" />
  <!-- Top left paint splash details -->
  <path d="M 230,120 Q 310,140 330,100 T 260,60" fill="#FFDF00" />
  <path d="M 120,160 Q 190,200 220,170 T 150,130" fill="#009739" />
  <path d="M 330,40 C 370,45 390,60 365,85" stroke="#FFDF00" stroke-width="12" stroke-linecap="round" fill="none" />
  <path d="M 290,15  C 330,22  350,30 330,50" stroke="#009739" stroke-width="8" stroke-linecap="round" fill="none" />
  <path d="M 390,20 C 420,25 430,30 410,45" stroke="#FFDF00" stroke-width="6" stroke-linecap="round" fill="none" />
  
  <!-- Small paint splat droplets top-left -->
  <circle cx="395" cy="115" r="10" fill="#FFDF00" />
  <circle cx="360" cy="160" r="14" fill="#009739" />
  <circle cx="310" cy="220" r="11" fill="#FFDF00" />
  <circle cx="270" cy="265" r="7" fill="#009739" />
  <circle cx="210" cy="290" r="9" fill="#FFDF00" />
  <circle cx="150" cy="310" r="12" fill="#009739" />
  <circle cx="95" cy="335" r="15" fill="#FFDF00" />
  <circle cx="40" cy="350" r="8" fill="#009739" />
  <circle cx="430" cy="80" r="6" fill="#009739" />
  <circle cx="450" cy="120" r="4" fill="#FFDF00" />
  <circle cx="280" cy="295" r="5" fill="#009739" />

  <!-- TOP-RIGHT CORNER: Gold stars & Corner decorative L-Lines -->
  <!-- Outer Gold L style -->
  <path d="M 850,35 H 1045 V 230" stroke="#FFDF00" stroke-width="10" stroke-linecap="square" stroke-linejoin="miter" fill="none" />
  <!-- Inner Green block line -->
  <path d="M 1075,35 V 230" stroke="#009739" stroke-width="10" stroke-linecap="square" fill="none" />
  
  <!-- Five Green pentacampeão representation stars in arc -->
  <use href="#star" x="844" y="105" transform="rotate(-20 844 105)" />
  <use href="#star" x="880" y="81" transform="rotate(-10 880 81)" />
  <use href="#star" x="920" y="67" transform="rotate(0 920 67)" />
  <use href="#star" x="961" y="69" transform="rotate(10 961 69)" />
  <use href="#star" x="1001" y="83" transform="rotate(20 1001 83)" />

  <!-- SIDE FRAMINGS: Yellow and Blue vertical guidelines -->
  <!-- Left Guideline -->
  <rect x="25" y="650" width="4" height="950" fill="#FFDF00" opacity="0.8" />
  <rect x="45" y="740" width="8" height="480" fill="#002D62" rx="4" />
  
  <!-- Right Guideline -->
  <rect x="1051" y="650" width="4" height="950" fill="#FFDF00" opacity="0.8" />
  <rect x="1027" y="740" width="8" height="480" fill="#002D62" rx="4" />

  <!-- BOTTOM-LEFT CORNER: Artistic paint splatters -->
  <!-- Yellow stroke bottom-left -->
  <path d="M -20,1940 Q 120,1940 220,1880 Q 280,1845 250,1780 Q 200,1720 110,1790 Q -20,1860 -20,1940 Z" fill="#FFDF00" opacity="0.95" />
  <!-- Green stroke bottom-left overlap -->
  <path d="M -30,1950 Q 80,1950 160,1900 Q 220,1860 190,1820 Q 140,1770 70,1830 Q -30,1890 -30,1950 Z" fill="#009739" />
  <!-- Droplets bottom-left -->
  <circle cx="215" cy="1775" r="9" fill="#009739" />
  <circle cx="280" cy="1830" r="12" fill="#FFDF00" />
  <circle cx="260" cy="1890" r="14" fill="#009739" />
  <circle cx="200" cy="1925" r="8" fill="#FFDF00" />
  <circle cx="150" cy="1950" r="11" fill="#009739" />
  <circle cx="310" cy="1860" r="7" fill="#FFDF00" />
  <circle cx="340" cy="1895" r="5" fill="#009739" />

  <!-- BOTTOM-RIGHT CORNER: Yellow and Green paint brush strokes -->
  <!-- Yellow stroke bottom-right -->
  <path d="M 1100,1940 Q 960,1940 860,1880 Q 800,1845 830,1780 Q 880,1720 970,1790 Q 1100,1860 1100,1940 Z" fill="#FFDF00" opacity="0.95" />
  <!-- Green stroke bottom-right overlap -->
  <path d="M 1110,1950 Q 1000,1950 920,1900 Q 860,1860 890,1820 Q 940,1770 1010,1830 Q 1110,1890 1110,1950 Z" fill="#009739" />
  <!-- Droplets bottom-right -->
  <circle cx="865" cy="1775" r="9" fill="#FFDF00" />
  <circle cx="800" cy="1830" r="12" fill="#009739" />
  <circle cx="820" cy="1890" r="14" fill="#FFDF00" />
  <circle cx="880" cy="1925" r="8" fill="#009739" />
  <circle cx="930" cy="1950" r="11" fill="#FFDF00" />
  <circle cx="770" cy="1860" r="7" fill="#009739" />
  <circle cx="740" cy="1895" r="5" fill="#FFDF00" />

  <!-- BOTTOM CENTER LOGO: CBF Brasil badge custom layout -->
  <!-- Five Gold/Yellow Brazil Stars curving over crest -->
  <use href="#gold-star" x="480" y="1668" transform="rotate(-15 480 1668)" />
  <use href="#gold-star" x="510" y="1656" transform="rotate(-7 510 1656)" />
  <use href="#gold-star" x="540" y="1652" transform="rotate(0 540 1652)" />
  <use href="#gold-star" x="570" y="1656" transform="rotate(7 570 1656)" />
  <use href="#gold-star" x="600" y="1668" transform="rotate(15 600 1668)" />

  <!-- Shield Shape Outline -->
  <!-- Gold Outer Border -->
  <path d="M 470,1685 C 470,1685 470,1685 470,1685 L 610,1685 Q 610,1765 540,1835 Q 470,1765 470,1685 Z" fill="#FFDF00" />
  <!-- Green Inner Border -->
  <path d="M 476,1691 L 604,1691 Q 604,1761 540,1825 Q 476,1761 476,1691 Z" fill="#009739" />
  <!-- Blue Center Body -->
  <path d="M 482,1697 L 598,1697 Q 598,1755 540,1813 Q 482,1755 482,1697 Z" fill="#002D62" />

  <!-- Yellow / White stripes overlay pattern in bottom half of shield -->
  <g opacity="0.8">
    <!-- Left Yellow outline stripes -->
    <path d="M 500,1725 L 500,1755 Q 520,1780 540,1795 Q 520,1760 500,1725" fill="#FFDF00" />
    <path d="M 580,1725 L 580,1755 Q 560,1780 540,1795 Q 560,1760 580,1725" fill="#FFDF00" />
    <!-- Center white stripes -->
    <rect x="532" y="1735" width="16" height="60" fill="#FFFFFF" opacity="0.9" />
    <rect x="514" y="1742" width="10" height="40" fill="#FFFFFF" opacity="0.9" />
    <rect x="556" y="1742" width="10" height="40" fill="#FFFFFF" opacity="0.9" />
  </g>

  <!-- Horizontal White bar with "CBF" green text -->
  <rect x="473" y="1710" width="134" height="28" fill="#FFFFFF" rx="2" />
  <text x="540" y="1731" font-family="'Inter', system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" fill="#002D62" text-anchor="middle" letter-spacing="2">CBF</text>
  
  <!-- Green Cross lines intersecting emblem -->
  <rect x="537" y="1697" width="6" height="13" fill="#FFDF00" />
  <rect x="537" y="1738" width="6" height="50" fill="#FFDF00" />

  <!-- "BRASIL" Title below in condensed sporty typography -->
  <text x="540" y="1880" font-family="'Space Grotesk', -apple-system, sans-serif" font-weight="900" font-size="36" fill="#009739" text-anchor="middle" letter-spacing="8">BRASIL</text>
</svg>
`;

/**
 * Returns a base64 encoded string of the SVG, safe to use inside <img src="..." />
 */
export function getFrameSvgDataUrl(): string {
  const cleaned = FRAME_SVG_CONTENT.replace(/\n/g, '').trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(cleaned)}`;
}
