export const IntegratedSystem = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#0080ff" />
        <stop offset="100%" stopColor="#6b46c1" />
      </linearGradient>
    </defs>
    
    {/* Central hub core */}
    <circle cx="100" cy="100" r="18" stroke="url(#gradient6)" strokeWidth="2" fill="none" opacity="0.3" />
    <circle cx="100" cy="100" r="12" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
    <circle cx="100" cy="100" r="6" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.25" />
    
    {/* Rotating connection ring */}
    <circle cx="100" cy="100" r="40" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.15" strokeDasharray="6 6" />
    
    {/* Module 1: Database (top) */}
    <g transform="translate(100, 50)">
      <ellipse cx="0" cy="-5" rx="12" ry="4" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <line x1="-12" y1="-5" x2="-12" y2="5" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
      <line x1="12" y1="-5" x2="12" y2="5" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
      <ellipse cx="0" cy="5" rx="12" ry="4" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <ellipse cx="0" cy="0" rx="12" ry="4" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.2" />
    </g>
    <line x1="100" y1="60" x2="100" y2="82" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Module 2: Analytics (top-right) */}
    <g transform="translate(135, 65)">
      <rect x="-10" y="-10" width="20" height="20" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M -6 4 L -3 -2 L 1 0 L 4 -4 L 7 -6" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <line x1="-6" y1="6" x2="-6" y2="4" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <line x1="-3" y1="6" x2="-3" y2="-2" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <line x1="1" y1="6" x2="1" y2="0" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <line x1="4" y1="6" x2="4" y2="-4" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
    </g>
    <line x1="118" y1="88" x2="127" y2="77" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Module 3: API (right) */}
    <g transform="translate(155, 100)">
      <circle cx="0" cy="0" r="10" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M -3 -4 L 0 0 L -3 4" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <path d="M 1 -4 L 4 0 L 1 4" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
    </g>
    <line x1="118" y1="100" x2="145" y2="100" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Module 4: Processing (bottom-right) */}
    <g transform="translate(135, 135)">
      <rect x="-10" y="-10" width="20" height="20" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <circle cx="0" cy="0" r="6" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.2" />
      <line x1="-3" y1="-3" x2="3" y2="3" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <line x1="3" y1="-3" x2="-3" y2="3" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
    </g>
    <line x1="118" y1="112" x2="127" y2="123" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Module 5: Storage (bottom) */}
    <g transform="translate(100, 150)">
      <rect x="-12" y="-10" width="24" height="20" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <line x1="-12" y1="-3" x2="12" y2="-3" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <line x1="-12" y1="3" x2="12" y2="3" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <rect x="-6" y="-6" width="4" height="4" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.2" />
      <rect x="2" y="-6" width="4" height="4" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.2" />
    </g>
    <line x1="100" y1="118" x2="100" y2="140" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Module 6: Security (bottom-left) */}
    <g transform="translate(65, 135)">
      <path d="M 0 -10 L -8 -6 L -8 2 Q -8 8 0 10 Q 8 8 8 2 L 8 -6 Z" 
            stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <circle cx="0" cy="0" r="3" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.25" />
      <rect x="-1" y="1" width="2" height="4" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.25" />
    </g>
    <line x1="82" y1="112" x2="73" y2="123" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Module 7: Network (left) */}
    <g transform="translate(45, 100)">
      <circle cx="0" cy="0" r="10" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <circle cx="-3" cy="-3" r="2" fill="url(#gradient6)" opacity="0.2" />
      <circle cx="3" cy="-3" r="2" fill="url(#gradient6)" opacity="0.2" />
      <circle cx="0" cy="3" r="2" fill="url(#gradient6)" opacity="0.2" />
      <line x1="-3" y1="-3" x2="3" y2="-3" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <line x1="-3" y1="-3" x2="0" y2="3" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <line x1="3" y1="-3" x2="0" y2="3" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
    </g>
    <line x1="82" y1="100" x2="55" y2="100" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Module 8: User Interface (top-left) */}
    <g transform="translate(65, 65)">
      <rect x="-10" y="-10" width="20" height="20" stroke="url(#gradient6)" strokeWidth="1.5" fill="none" opacity="0.25" />
      <rect x="-7" y="-7" width="14" height="10" stroke="url(#gradient6)" strokeWidth="1" fill="none" opacity="0.2" />
      <line x1="-7" y1="5" x2="-3" y2="5" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
      <line x1="0" y1="5" x2="7" y2="5" stroke="url(#gradient6)" strokeWidth="1" opacity="0.2" />
    </g>
    <line x1="82" y1="88" x2="73" y2="77" stroke="url(#gradient6)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Data flow particles */}
    <circle cx="100" cy="71" r="1.5" fill="url(#gradient6)" opacity="0.3" />
    <circle cx="109" cy="83" r="1.5" fill="url(#gradient6)" opacity="0.3" />
    <circle cx="91" cy="83" r="1.5" fill="url(#gradient6)" opacity="0.3" />
  </svg>
);
