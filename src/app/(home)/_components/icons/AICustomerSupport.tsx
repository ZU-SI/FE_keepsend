export const AICustomerSupport = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#0080ff" />
        <stop offset="100%" stopColor="#6b46c1" />
      </linearGradient>
    </defs>
    
    {/* Chat bubble outline */}
    <path d="M 60 60 L 140 60 Q 150 60 150 70 L 150 120 Q 150 130 140 130 L 110 130 L 100 145 L 95 130 L 60 130 Q 50 130 50 120 L 50 70 Q 50 60 60 60 Z" 
          stroke="url(#gradient4)" strokeWidth="1.5" fill="none" opacity="0.25" />
    
    {/* Brain circuit inside chat bubble */}
    {/* Central processor core */}
    <circle cx="100" cy="95" r="8" stroke="url(#gradient4)" strokeWidth="1.5" fill="none" opacity="0.3" />
    <circle cx="100" cy="95" r="4" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.25" />
    
    {/* Left hemisphere circuits */}
    <circle cx="75" cy="85" r="5" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.25" />
    <circle cx="70" cy="105" r="4" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.25" />
    
    {/* Right hemisphere circuits */}
    <circle cx="125" cy="85" r="5" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.25" />
    <circle cx="130" cy="105" r="4" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.25" />
    
    {/* Neural connections */}
    <line x1="92" y1="95" x2="80" y2="85" stroke="url(#gradient4)" strokeWidth="1" opacity="0.2" />
    <line x1="92" y1="98" x2="74" y2="105" stroke="url(#gradient4)" strokeWidth="1" opacity="0.2" />
    <line x1="108" y1="95" x2="120" y2="85" stroke="url(#gradient4)" strokeWidth="1" opacity="0.2" />
    <line x1="108" y1="98" x2="126" y2="105" stroke="url(#gradient4)" strokeWidth="1" opacity="0.2" />
    
    {/* Top connection to memory */}
    <line x1="100" y1="87" x2="100" y2="75" stroke="url(#gradient4)" strokeWidth="1" opacity="0.2" />
    <rect x="95" y="70" width="10" height="5" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.2" />
    
    {/* Bottom connection to processing */}
    <line x1="100" y1="103" x2="100" y2="115" stroke="url(#gradient4)" strokeWidth="1" opacity="0.2" />
    <rect x="95" y="115" width="10" height="5" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.2" />
    
    {/* Circuit board traces */}
    <path d="M 75 85 L 70 85 L 70 90" stroke="url(#gradient4)" strokeWidth="1" opacity="0.15" />
    <path d="M 125 85 L 130 85 L 130 90" stroke="url(#gradient4)" strokeWidth="1" opacity="0.15" />
    
    {/* Data flow indicators */}
    <circle cx="85" cy="75" r="1.5" fill="url(#gradient4)" opacity="0.3" />
    <circle cx="115" cy="75" r="1.5" fill="url(#gradient4)" opacity="0.3" />
    <circle cx="85" cy="115" r="1.5" fill="url(#gradient4)" opacity="0.3" />
    <circle cx="115" cy="115" r="1.5" fill="url(#gradient4)" opacity="0.3" />
    
    {/* Outer orbital rings for AI processing */}
    <ellipse cx="100" cy="95" rx="25" ry="20" stroke="url(#gradient4)" strokeWidth="0.5" fill="none" opacity="0.15" strokeDasharray="3 3" />
    <ellipse cx="100" cy="95" rx="32" ry="26" stroke="url(#gradient4)" strokeWidth="0.5" fill="none" opacity="0.1" strokeDasharray="3 3" />
    
    {/* Signal waves outside bubble */}
    <path d="M 155 85 Q 165 85 165 95" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.15" />
    <path d="M 160 80 Q 172 80 172 95" stroke="url(#gradient4)" strokeWidth="1" fill="none" opacity="0.1" />
  </svg>
);
