export function AIBrainSVG() {
  return (
    // prettier-ignore
    <svg viewBox="0 0 400 400" className="w-full h-full opacity-30">
      <circle cx="200" cy="200" r="180" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.3" />
      <circle cx="200" cy="200" r="140" fill="none" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.2" />
      <circle cx="200" cy="200" r="100" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.1" />
      {/* CPU-like nodes */}
      <circle cx="200" cy="100" r="8" fill="#0ea5e9" opacity="0.6" />
      <circle cx="280" cy="200" r="8" fill="#0ea5e9" opacity="0.6" />
      <circle cx="200" cy="300" r="8" fill="#0ea5e9" opacity="0.6" />
      <circle cx="120" cy="200" r="8" fill="#0ea5e9" opacity="0.6" />
      <line x1="200" y1="100" x2="200" y2="200" stroke="#0ea5e9" strokeWidth="1" opacity="0.4" />
      <line x1="280" y1="200" x2="200" y2="200" stroke="#0ea5e9" strokeWidth="1" opacity="0.4" />
      <line x1="200" y1="300" x2="200" y2="200" stroke="#0ea5e9" strokeWidth="1" opacity="0.4" />
      <line x1="120" y1="200" x2="200" y2="200" stroke="#0ea5e9" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function LayeredStructureSVG() {
  return (
    // prettier-ignore
    <svg viewBox="0 0 400 400" className="w-full h-full opacity-30">
      {/* Layered blocks */}
      <rect x="100" y="80" width="200" height="30" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.6" />
      <rect x="90" y="130" width="220" height="30" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.5" />
      <rect x="80" y="180" width="240" height="30" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.4" />
      <rect x="70" y="230" width="260" height="30" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.3" />
      <rect x="60" y="280" width="280" height="30" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.2" />
      {/* Connecting lines */}
      <line x1="200" y1="110" x2="200" y2="130" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" />
      <line x1="200" y1="160" x2="200" y2="180" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" />
      <line x1="200" y1="210" x2="200" y2="230" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" />
      <line x1="200" y1="260" x2="200" y2="280" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function CircuitrySVG() {
  return (
    // prettier-ignore
    <svg viewBox="0 0 400 400" className="w-full h-full opacity-30">
      {/* Circuit paths */}
      <path d="M 50 200 L 150 200 L 150 100 L 250 100" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.5" />
      <path d="M 250 100 L 250 300 L 350 300" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.5" />
      <path d="M 50 200 L 150 200 L 150 300 L 250 300" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.4" />
      {/* Circuit nodes */}
      <circle cx="150" cy="200" r="6" fill="#0ea5e9" opacity="0.6" />
      <circle cx="150" cy="100" r="6" fill="#0ea5e9" opacity="0.6" />
      <circle cx="250" cy="100" r="6" fill="#0ea5e9" opacity="0.6" />
      <circle cx="250" cy="300" r="6" fill="#0ea5e9" opacity="0.6" />
      <circle cx="150" cy="300" r="6" fill="#0ea5e9" opacity="0.6" />
    </svg>
  );
}
