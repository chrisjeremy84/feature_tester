import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function App() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
      <div style={{ padding: '50px' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google']}
          // This tells the UI to only show Google if you don't want email/pass
          onlyThirdPartyProviders={true} 
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}</h1>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>
  )
}