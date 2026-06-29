export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="27" y1="9" x2="5" y2="23" />
      <circle cx="9" cy="10" r="3.2" />
      <circle cx="23" cy="22" r="3.2" />
    </svg>
  );
}
