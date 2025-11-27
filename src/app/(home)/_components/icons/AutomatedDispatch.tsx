export const AutomatedDispatch = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#0080ff" />
        <stop offset="100%" stopColor="#6b46c1" />
      </linearGradient>
    </defs>
    
    {/* Optimized route path */}
    <path d="M 50 140 Q 70 100 100 100 T 150 60" stroke="url(#gradient5)" strokeWidth="2" fill="none" opacity="0.25" />
    
    {/* Waypoint nodes */}
    <circle cx="50" cy="140" r="4" fill="url(#gradient5)" opacity="0.25" />
    <circle cx="75" cy="115" r="3" fill="url(#gradient5)" opacity="0.2" />
    <circle cx="100" cy="100" r="3" fill="url(#gradient5)" opacity="0.2" />
    <circle cx="125" cy="80" r="3" fill="url(#gradient5)" opacity="0.2" />
    <circle cx="150" cy="60" r="4" fill="url(#gradient5)" opacity="0.25" />
    
    {/* Transport vehicle (truck) */}
    <g transform="translate(100, 100)">
      {/* Cargo container */}
      <rect x="-12" y="-8" width="16" height="10" stroke="url(#gradient5)" strokeWidth="1.5" fill="none" opacity="0.3" />
      <line x1="-12" y1="-3" x2="4" y2="-3" stroke="url(#gradient5)" strokeWidth="1" opacity="0.2" />
      
      {/* Cabin */}
      <path d="M 4 -8 L 4 2 L 10 2 L 10 -4 L 8 -8 Z" stroke="url(#gradient5)" strokeWidth="1.5" fill="none" opacity="0.3" />
      <line x1="6" y1="-8" x2="6" y2="-4" stroke="url(#gradient5)" strokeWidth="1" opacity="0.2" />
      
      {/* Wheels */}
      <circle cx="-8" cy="4" r="2.5" stroke="url(#gradient5)" strokeWidth="1" fill="none" opacity="0.25" />
      <circle cx="6" cy="4" r="2.5" stroke="url(#gradient5)" strokeWidth="1" fill="none" opacity="0.25" />
    </g>
    
    {/* Alternative route (not chosen) - faded */}
    <path d="M 50 140 Q 60 130 70 130 T 90 130 T 110 120 T 130 110 T 150 60" 
          stroke="url(#gradient5)" strokeWidth="1" fill="none" opacity="0.1" strokeDasharray="2 2" />
    
    {/* Automation gears */}
    <g transform="translate(140, 120)">
      {/* Large gear */}
      <circle cx="0" cy="0" r="12" stroke="url(#gradient5)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <line x1="-12" y1="0" x2="-14" y2="0" stroke="url(#gradient5)" strokeWidth="1.5" opacity="0.25" />
      <line x1="12" y1="0" x2="14" y2="0" stroke="url(#gradient5)" strokeWidth="1.5" opacity="0.25" />
      <line x1="0" y1="-12" x2="0" y2="-14" stroke="url(#gradient5)" strokeWidth="1.5" opacity="0.25" />
      <line x1="0" y1="12" x2="0" y2="14" stroke="url(#gradient5)" strokeWidth="1.5" opacity="0.25" />
      <circle cx="0" cy="0" r="4" stroke="url(#gradient5)" strokeWidth="1" fill="none" opacity="0.25" />
      
      {/* Small gear interlocked */}
      <circle cx="16" cy="-10" r="8" stroke="url(#gradient5)" strokeWidth="1" fill="none" opacity="0.2" />
      <line x1="8" y1="-10" x2="6" y2="-10" stroke="url(#gradient5)" strokeWidth="1" opacity="0.2" />
      <line x1="24" y1="-10" x2="26" y2="-10" stroke="url(#gradient5)" strokeWidth="1" opacity="0.2" />
      <line x1="16" y1="-2" x2="16" y2="0" stroke="url(#gradient5)" strokeWidth="1" opacity="0.2" />
      <line x1="16" y1="-18" x2="16" y2="-20" stroke="url(#gradient5)" strokeWidth="1" opacity="0.2" />
      <circle cx="16" cy="-10" r="2.5" stroke="url(#gradient5)" strokeWidth="1" fill="none" opacity="0.2" />
    </g>
    
    {/* AI decision nodes */}
    <g transform="translate(60, 80)">
      <path d="M 0 -6 L 5 0 L 0 6 L -5 0 Z" stroke="url(#gradient5)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <circle cx="0" cy="0" r="2" fill="url(#gradient5)" opacity="0.2" />
    </g>
    
    {/* Efficiency indicators */}
    <path d="M 150 60 L 160 50 L 165 55" stroke="url(#gradient5)" strokeWidth="1.5" opacity="0.25" />
    <path d="M 160 50 L 158 54 L 162 54 Z" fill="url(#gradient5)" opacity="0.25" />
    
    {/* Network grid overlay */}
    <circle cx="100" cy="100" r="60" stroke="url(#gradient5)" strokeWidth="0.5" fill="none" opacity="0.1" strokeDasharray="4 4" />
    
    {/* Speed lines */}
    <line x1="80" y1="95" x2="70" y2="93" stroke="url(#gradient5)" strokeWidth="1" opacity="0.15" />
    <line x1="82" y1="102" x2="72" y2="104" stroke="url(#gradient5)" strokeWidth="1" opacity="0.15" />
  </svg>
);
