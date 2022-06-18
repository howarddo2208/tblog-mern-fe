import { useRef } from 'react'
import create from 'zustand'
import { persist } from 'zustand/middleware'

const useFish = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
    }),
    {
      name: 'food-storage',
      getStorage: () => sessionStorage,
    }
  )
)

const useAuth = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      currentUser: null,
      userId: null,
      login: (user) => {
        set({
          isLoggedIn: true,
          token: user.token,
          user,
          userId: user.userId,
          currentUser: user,
        })
      },
      logout: () =>
        set({
          isLoggedIn: false,
          token: null,
          user: null,
          userId: null,
          currentUser: null,
        }),
      setUser: (user) => set(user, true),
    }),
    {
      name: 'auth-state',
      getStorage: () => localStorage,
    }
  )
)

const useSocket = create((set, get) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}))

export { useAuth, useSocket }

