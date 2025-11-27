export const LogisticsInfrastructure = () => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#0080ff" />
        <stop offset="100%" stopColor="#6b46c1" />
      </linearGradient>
    </defs>
    
    {/* Network nodes */}
    <circle cx="100" cy="60" r="4" fill="url(#gradient1)" opacity="0.3" />
    <circle cx="50" cy="100" r="4" fill="url(#gradient1)" opacity="0.3" />
    <circle cx="150" cy="100" r="4" fill="url(#gradient1)" opacity="0.3" />
    <circle cx="75" cy="140" r="4" fill="url(#gradient1)" opacity="0.3" />
    <circle cx="125" cy="140" r="4" fill="url(#gradient1)" opacity="0.3" />
    
    {/* Connection lines */}
    <line x1="100" y1="60" x2="50" y2="100" stroke="url(#gradient1)" strokeWidth="1" opacity="0.25" />
    <line x1="100" y1="60" x2="150" y2="100" stroke="url(#gradient1)" strokeWidth="1" opacity="0.25" />
    <line x1="50" y1="100" x2="75" y2="140" stroke="url(#gradient1)" strokeWidth="1" opacity="0.25" />
    <line x1="150" y1="100" x2="125" y2="140" stroke="url(#gradient1)" strokeWidth="1" opacity="0.25" />
    <line x1="75" y1="140" x2="125" y2="140" stroke="url(#gradient1)" strokeWidth="1" opacity="0.25" />
    
    {/* Warehouse structure 1 */}
    <rect x="35" y="85" width="30" height="25" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" opacity="0.25" />
    <path d="M 35 85 L 50 75 L 65 85" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" opacity="0.25" />
    <line x1="45" y1="95" x2="45" y2="110" stroke="url(#gradient1)" strokeWidth="1" opacity="0.2" />
    <line x1="55" y1="95" x2="55" y2="110" stroke="url(#gradient1)" strokeWidth="1" opacity="0.2" />
    
    {/* Warehouse structure 2 */}
    <rect x="135" y="85" width="30" height="25" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" opacity="0.25" />
    <path d="M 135 85 L 150 75 L 165 85" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" opacity="0.25" />
    <line x1="145" y1="95" x2="145" y2="110" stroke="url(#gradient1)" strokeWidth="1" opacity="0.2" />
    <line x1="155" y1="95" x2="155" y2="110" stroke="url(#gradient1)" strokeWidth="1" opacity="0.2" />
    
    {/* Container at bottom */}
    <rect x="60" y="130" width="80" height="20" stroke="url(#gradient1)" strokeWidth="1.5" fill="none" opacity="0.25" />
    <line x1="80" y1="130" x2="80" y2="150" stroke="url(#gradient1)" strokeWidth="1" opacity="0.2" />
    <line x1="100" y1="130" x2="100" y2="150" stroke="url(#gradient1)" strokeWidth="1" opacity="0.2" />
    <line x1="120" y1="130" x2="120" y2="150" stroke="url(#gradient1)" strokeWidth="1" opacity="0.2" />
    
    {/* Orbital ring */}
    <circle cx="100" cy="100" r="70" stroke="url(#gradient1)" strokeWidth="1" fill="none" opacity="0.15" strokeDasharray="4 4" />
  </svg>
);
