export const DemandForecasting = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#0080ff" />
        <stop offset="100%" stopColor="#6b46c1" />
      </linearGradient>
    </defs>
    
    {/* Axes */}
    <line x1="40" y1="140" x2="160" y2="140" stroke="url(#gradient2)" strokeWidth="1.5" opacity="0.25" />
    <line x1="40" y1="60" x2="40" y2="140" stroke="url(#gradient2)" strokeWidth="1.5" opacity="0.25" />
    
    {/* Grid lines */}
    <line x1="40" y1="100" x2="160" y2="100" stroke="url(#gradient2)" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 2" />
    <line x1="70" y1="60" x2="70" y2="140" stroke="url(#gradient2)" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 2" />
    <line x1="100" y1="60" x2="100" y2="140" stroke="url(#gradient2)" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 2" />
    <line x1="130" y1="60" x2="130" y2="140" stroke="url(#gradient2)" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 2" />
    
    {/* Historical data points and line */}
    <circle cx="55" cy="125" r="3" fill="url(#gradient2)" opacity="0.3" />
    <circle cx="70" cy="115" r="3" fill="url(#gradient2)" opacity="0.3" />
    <circle cx="85" cy="110" r="3" fill="url(#gradient2)" opacity="0.3" />
    <circle cx="100" cy="95" r="3" fill="url(#gradient2)" opacity="0.3" />
    
    <path d="M 55 125 L 70 115 L 85 110 L 100 95" stroke="url(#gradient2)" strokeWidth="2" fill="none" opacity="0.25" />
    
    {/* Predictive projection - dashed line */}
    <path d="M 100 95 L 115 82 L 130 70 L 145 60" stroke="url(#gradient2)" strokeWidth="2" fill="none" opacity="0.25" strokeDasharray="4 4" />
    
    {/* Future data points */}
    <circle cx="115" cy="82" r="3" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.25" />
    <circle cx="130" cy="70" r="3" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.25" />
    <circle cx="145" cy="60" r="3" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.25" />
    
    {/* Predictive arrow */}
    <path d="M 145 60 L 155 50" stroke="url(#gradient2)" strokeWidth="2" opacity="0.3" />
    <path d="M 155 50 L 152 55 L 158 54 Z" fill="url(#gradient2)" opacity="0.3" />
    
    {/* Confidence cone */}
    <path d="M 100 95 L 145 50 L 145 70" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.1" />
    <path d="M 100 95 L 155 60 L 145 60" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.1" />
    
    {/* Data wave patterns */}
    <path d="M 50 160 Q 70 155 90 160 T 130 160" stroke="url(#gradient2)" strokeWidth="1" fill="none" opacity="0.15" />
    <path d="M 45 170 Q 65 165 85 170 T 125 170" stroke="url(#gradient2)" strokeWidth="0.5" fill="none" opacity="0.1" />
  </svg>
);
