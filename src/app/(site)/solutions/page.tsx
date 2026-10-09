import { permanentRedirect } from 'next/navigation'

// Removed in the Oct 2026 verification update (unverifiable claims); see next.config.js redirects.
export default function Page() {
  permanentRedirect('/services')
}
