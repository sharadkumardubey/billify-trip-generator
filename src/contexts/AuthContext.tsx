
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase, hasBusinessProfile } from '@/lib/supabase'
import { toast } from 'sonner'
import { Navigate, useNavigate } from 'react-router-dom'

interface AuthContextType {
  session: Session | null
  user: User | null
  userHasBusinessProfile: boolean
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userHasBusinessProfile, setUserHasBusinessProfile] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  console.log('userHasBusinessProfile', userHasBusinessProfile)
  debugger;

  useEffect(() => {
    // Setup the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
        
        if (currentSession?.user) {
          const hasProfile = await hasBusinessProfile(currentSession.user.id)
          setUserHasBusinessProfile(hasProfile)
        } else {
          setUserHasBusinessProfile(false)
        }
        
        setLoading(false)
      }
    )

    // Initialize the session
    const initializeSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession()
        setSession(initialSession)
        setUser(initialSession?.user ?? null)
        
        if (initialSession?.user) {
          const hasProfile = await hasBusinessProfile(initialSession.user.id)
          setUserHasBusinessProfile(hasProfile)
        }
      } catch (error) {
        console.error('Error initializing session:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeSession()

    // Cleanup the subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Google sign-in function
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })
      
      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      toast.error('Failed to sign in with Google', {
        description: 'Please try again later',
      })
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      console.log('signing out')
      await supabase.auth.signOut()
      toast.info('Signed out successfully', {
        description: 'You have been logged out',
      })
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out', {
        description: 'Please try again later',
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userHasBusinessProfile,
        loading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
