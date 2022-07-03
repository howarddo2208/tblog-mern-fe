import create from 'zustand'
import { persist } from 'zustand/middleware'
import queryString from 'query-string'

export const useAuth = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: '',
      user: {},
      currentUser: {},
      userId: undefined,
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
          token: '',
          user: {},
          userId: undefined,
          currentUser: {},
        }),
      setUser: (user) => set(user, true),
    }),
    {
      name: 'auth-state',
      getStorage: () => localStorage,
    }
  )
)

export const useSocket = create((set, get) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}))

export const useSearch = create(
  persist(
    (set, get) => ({
      searchValue: '',
      searchResults: [],
      search: async (value, history) => {
        if (value) {
          set({ searchValue: value })
          try {
            const query = queryString.stringify({ search: value })
            const data = await fetch(
              `${process.env.REACT_APP_BASE_URL}/posts/search?${query}`
            )
            const { posts } = await data.json()
            set({ searchResults: posts })
            history.push(`/search/?query=${value}`)
          } catch (err) {
            console.log(err)
          }
        } else {
          set({ searchResults: [] })
        }
      },
    }),
    {
      name: 'search-state',
      getStorage: () => sessionStorage,
    }
  )
)

export const useAIModels = create((set, get) => ({
  nsfwModel: null,
  toxicityModel: null,
  setNSFW: (model) => set({ nsfw: model }),
  setToxicity: (model) => set({ toxicity: model }),
}))

export const useComment = create((set, get) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  postId: null,
  postAuthor: null,
  activeComment: null,
  setActiveComment: (comment) => set({ activeComment: comment }),
}))

