export const PrecisionTracking = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#0080ff" />
        <stop offset="100%" stopColor="#6b46c1" />
      </linearGradient>
    </defs>
    
    {/* Map grid background */}
    <line x1="50" y1="60" x2="150" y2="60" stroke="url(#gradient3)" strokeWidth="0.5" opacity="0.1" />
    <line x1="50" y1="90" x2="150" y2="90" stroke="url(#gradient3)" strokeWidth="0.5" opacity="0.1" />
    <line x1="50" y1="120" x2="150" y2="120" stroke="url(#gradient3)" strokeWidth="0.5" opacity="0.1" />
    <line x1="70" y1="50" x2="70" y2="150" stroke="url(#gradient3)" strokeWidth="0.5" opacity="0.1" />
    <line x1="100" y1="50" x2="100" y2="150" stroke="url(#gradient3)" strokeWidth="0.5" opacity="0.1" />
    <line x1="130" y1="50" x2="130" y2="150" stroke="url(#gradient3)" strokeWidth="0.5" opacity="0.1" />
    
    {/* Transport path */}
    <path d="M 50 130 Q 80 100 100 90 T 150 70" stroke="url(#gradient3)" strokeWidth="2" fill="none" opacity="0.25" />
    
    {/* Path waypoints */}
    <circle cx="50" cy="130" r="3" fill="url(#gradient3)" opacity="0.25" />
    <circle cx="75" cy="110" r="2" fill="url(#gradient3)" opacity="0.2" />
    <circle cx="100" cy="90" r="2" fill="url(#gradient3)" opacity="0.2" />
    <circle cx="125" cy="80" r="2" fill="url(#gradient3)" opacity="0.2" />
    <circle cx="150" cy="70" r="3" fill="url(#gradient3)" opacity="0.25" />
    
    {/* Current location pin */}
    <g transform="translate(100, 90)">
      <path d="M 0 -15 C -8 -15 -15 -8 -15 0 C -15 8 0 20 0 20 C 0 20 15 8 15 0 C 15 -8 8 -15 0 -15 Z" 
            stroke="url(#gradient3)" strokeWidth="1.5" fill="none" opacity="0.3" />
      <circle cx="0" cy="0" r="4" stroke="url(#gradient3)" strokeWidth="1.5" fill="none" opacity="0.3" />
    </g>
    
    {/* Radar pulses */}
    <circle cx="100" cy="90" r="15" stroke="url(#gradient3)" strokeWidth="1" fill="none" opacity="0.2" />
    <circle cx="100" cy="90" r="25" stroke="url(#gradient3)" strokeWidth="1" fill="none" opacity="0.15" />
    <circle cx="100" cy="90" r="35" stroke="url(#gradient3)" strokeWidth="1" fill="none" opacity="0.1" />
    
    {/* Radar scan lines */}
    <line x1="100" y1="90" x2="130" y2="70" stroke="url(#gradient3)" strokeWidth="1" opacity="0.2" />
    <line x1="100" y1="90" x2="125" y2="100" stroke="url(#gradient3)" strokeWidth="1" opacity="0.15" />
    
    {/* Precision crosshairs */}
    <line x1="100" y1="75" x2="100" y2="65" stroke="url(#gradient3)" strokeWidth="1" opacity="0.25" />
    <line x1="100" y1="105" x2="100" y2="115" stroke="url(#gradient3)" strokeWidth="1" opacity="0.25" />
    <line x1="85" y1="90" x2="75" y2="90" stroke="url(#gradient3)" strokeWidth="1" opacity="0.25" />
    <line x1="115" y1="90" x2="125" y2="90" stroke="url(#gradient3)" strokeWidth="1" opacity="0.25" />
    
    {/* Corner brackets for precision framing */}
    <path d="M 60 55 L 55 55 L 55 60" stroke="url(#gradient3)" strokeWidth="1.5" opacity="0.2" />
    <path d="M 140 55 L 145 55 L 145 60" stroke="url(#gradient3)" strokeWidth="1.5" opacity="0.2" />
    <path d="M 60 135 L 55 135 L 55 130" stroke="url(#gradient3)" strokeWidth="1.5" opacity="0.2" />
    <path d="M 140 135 L 145 135 L 145 130" stroke="url(#gradient3)" strokeWidth="1.5" opacity="0.2" />
  </svg>
);
