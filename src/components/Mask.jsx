export default function Mask({ children, className = '' }) {
  return (
    <span className={`mask ${className}`.trim()}>
      <span className="mask-inner">{children}</span>
    </span>
  )
}
