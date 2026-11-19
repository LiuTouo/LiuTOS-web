export default function Wordmark({ className = 'mark' }) {
  return (
    <svg className={className} viewBox="-210 -220 420 380" aria-hidden="true" focusable="false">
      <polygon
        fill="currentColor"
        points="-147,-163 -34,-60 -147,43 -174,13 -92,-60 -174,-133"
      />
      <polygon fill="currentColor" points="-3,17 149,17 149,55 -3,55" />
    </svg>
  )
}
