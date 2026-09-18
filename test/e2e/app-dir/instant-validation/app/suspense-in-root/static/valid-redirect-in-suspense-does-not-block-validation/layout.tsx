import { ReactNode, Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function Shell({ children }: { children: ReactNode }) {
  const jar = await cookies()
  if (!jar.get('seeded')) {
    // A deliberate redirect is control flow, not a rendering error, and
    // should not be reported as a validation failure.
    redirect(
      '/suspense-in-root/static/valid-redirect-in-suspense-does-not-block-validation/elsewhere'
    )
  }
  return <>{children}</>
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<p>loading shell…</p>}>
      <Shell>{children}</Shell>
    </Suspense>
  )
}
