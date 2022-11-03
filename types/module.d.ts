declare module 'good-storage' {
  const GoodStorage: {
    set: (key: string, value: any) => void
    get: (key: string) => any
    session: {
      set: (key: string, value: any) => void
      get: (key: string) => any
    }
    remove: (key: string) => void
    has: (key: string) => boolean
    clear: () => void
    getAll: () => any
  }
  export default GoodStorage
}
