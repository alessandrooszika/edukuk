interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const strokeAttrs = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeLinecap: "round" as const,
};

const fillAttrs = {
  fill: "currentColor" as const,
};

/* ---- Generic UI ---- */

export const MenuIcon = ({ size = 16, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} {...strokeAttrs}>
    <line x1="2" y1="3.5" x2="14" y2="3.5" />
    <line x1="2" y1="8" x2="14" y2="8" />
    <line x1="2" y1="12.5" x2="14" y2="12.5" />
  </svg>
);

/* ---- Input / Search ---- */

export const SearchIcon = ({ size = 14, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} {...strokeAttrs}>
    <circle cx="7" cy="7" r="5.5" />
    <line x1="11" y1="11" x2="14.5" y2="14.5" />
  </svg>
);

export const ClearIcon = ({ size = 10, className, style }: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} {...strokeAttrs}>
    <line x1="2" y1="2" x2="10" y2="10" />
    <line x1="10" y1="2" x2="2" y2="10" />
  </svg>
);

/* ---- Password ---- */

export const EyeIcon = ({ size = 16, className, style }: IconProps) => (
  <svg viewBox="0 0 18 18" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <path d="M1 9s3-5.5 8-5.5S17 9 17 9s-3 5.5-8 5.5S1 9 1 9z" />
    <circle cx="9" cy="9" r="2.5" />
  </svg>
);

export const EyeOffIcon = ({ size = 16, className, style }: IconProps) => (
  <svg viewBox="0 0 18 18" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <path d="M1 9s3-5.5 8-5.5S17 9 17 9s-3 5.5-8 5.5S1 9 1 9z" />
    <circle cx="9" cy="9" r="2.5" />
    <line x1="2" y1="2" x2="16" y2="16" />
  </svg>
);

/* ---- Theme ---- */

export const SunIcon = ({ size = 12, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} {...strokeAttrs}>
    <circle cx="8" cy="8" r="3.2" />
    <line x1="12" y1="8" x2="14.5" y2="8" />
    <line x1="10.8" y1="10.8" x2="12.6" y2="12.6" />
    <line x1="8" y1="12" x2="8" y2="14.5" />
    <line x1="5.2" y1="10.8" x2="3.4" y2="12.6" />
    <line x1="4" y1="8" x2="1.5" y2="8" />
    <line x1="5.2" y1="5.2" x2="3.4" y2="3.4" />
    <line x1="8" y1="4" x2="8" y2="1.5" />
    <line x1="10.8" y1="5.2" x2="12.6" y2="3.4" />
  </svg>
);

export const MoonIcon = ({ size = 12, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} {...strokeAttrs}>
    <path d="M13.5 8.79A5.5 5.5 0 1 1 7.21 2.5 4.27 4.27 0 0 0 13.5 8.79z" />
  </svg>
);

/* ---- Number steppers ---- */

export const ChevronUpIcon = ({ size = 8, className, style }: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} {...strokeAttrs}>
    <polyline points="2,7 6,3 10,7" />
  </svg>
);

export const ChevronDownIcon = ({ size = 8, className, style }: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} {...strokeAttrs}>
    <polyline points="2,5 6,9 10,5" />
  </svg>
);

/* ---- Date ---- */

export const CalendarIcon = ({ size = 15, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <rect x="1.5" y="3" width="13" height="11.5" rx="1.5" />
    <line x1="1.5" y1="7" x2="14.5" y2="7" />
    <line x1="5" y1="1.5" x2="5" y2="4.5" />
    <line x1="11" y1="1.5" x2="11" y2="4.5" />
  </svg>
);

/* ---- File ---- */

export const UploadIcon = ({ size = 20, className, style }: IconProps) => (
  <svg viewBox="0 0 20 20" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <path d="M10 13.5V3.5" />
    <polyline points="6,7.5 10,3.5 14,7.5" />
    <path d="M3 13v2.5a2 2 0 002 2h10a2 2 0 002-2V13" />
  </svg>
);

export const FileIcon = ({ size = 14, className, style }: IconProps) => (
  <svg viewBox="0 0 14 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <path d="M3 1.5H9l4 4v9a1 1 0 01-1 1H3a1 1 0 01-1-1V2.5a1 1 0 011-1z" />
    <polyline points="9,1.5 9,5.5 13,5.5" />
  </svg>
);

/* ---- Select ---- */

export const CheckIcon = ({ size = 12, className, style }: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth="2" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <polyline points="2,6 5,9 10,3" />
  </svg>
);

/* ---- Alert ---- */

export const InfoIcon = ({ size = 18, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <circle cx="8" cy="8" r="6.5" />
    <line x1="8" y1="7.5" x2="8" y2="11" />
    <circle cx="8" cy="5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

export const SuccessIcon = ({ size = 18, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <circle cx="8" cy="8" r="6.5" />
    <polyline points="5,8.5 7,10.5 11,6" />
  </svg>
);

export const WarningIcon = ({ size = 18, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <path d="M8 2.5L1.5 13.5h13L8 2.5z" />
    <line x1="8" y1="7" x2="8" y2="10" />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

export const ErrorIcon = ({ size = 18, className, style }: IconProps) => (
  <svg viewBox="0 0 16 16" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} strokeLinejoin="round" {...strokeAttrs}>
    <circle cx="8" cy="8" r="6.5" />
    <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" />
    <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" />
  </svg>
);

/* ---- Social / Footer ---- */

export const GitHubIcon = ({ size = 22, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} style={style} {...fillAttrs}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const TwitterIcon = ({ size = 22, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} style={style} {...fillAttrs}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const YouTubeIcon = ({ size = 22, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} style={style} {...fillAttrs}>
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const LinkedInIcon = ({ size = 22, className, style }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} style={style} {...fillAttrs}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ---- Close (migrated from CloseIcon.tsx) ---- */

export const CloseIcon = ({ size = 14, className, style }: IconProps) => (
  <svg viewBox="0 0 12 12" strokeWidth="1.5" width={size} height={size} aria-hidden="true" className={className} style={style} {...strokeAttrs}>
    <line x1="2" y1="2" x2="10" y2="10" />
    <line x1="10" y1="2" x2="2" y2="10" />
  </svg>
);
