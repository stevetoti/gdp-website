import { notFound } from 'next/navigation'

// Multiple root layouts: unmatched URLs must hit this catch-all so the
// group's own not-found page (and layout) renders with a real 404 status.
export default function CatchAll() {
  notFound()
}
