'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type UserType = 'guest' | 'premium'

interface AuthContextType {
  userType: UserType
  isPremium: boolean
  login: () => void
  logout: () => void
  upgradeToPremium: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>('guest')

  useEffect(() => {
    // Load saved auth state (mock)
    const saved = localStorage.getItem('meteo-astrale-auth') as UserType
    if (saved) {
      setUserType(saved)
    }
  }, [])

  const login = () => {
    // Mock login - in real app, this would handle actual authentication
    setUserType('guest')
    localStorage.setItem('meteo-astrale-auth', 'guest')
  }

  const logout = () => {
    setUserType('guest')
    localStorage.removeItem('meteo-astrale-auth')
  }

  const upgradeToPremium = () => {
    setUserType('premium')
    localStorage.setItem('meteo-astrale-auth', 'premium')
  }

  return (
    <AuthContext.Provider
      value={{
        userType,
        isPremium: userType === 'premium',
        login,
        logout,
        upgradeToPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
