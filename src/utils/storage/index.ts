import storage from 'good-storage'

export const setGallopsTicket = (val: string) => {
  storage.set('gallopsTicket', val)
}
export const getGallopsTicket = () => {
  return storage.get('gallopsTicket', '')
}
export const setCurrentMenu = (val: any) => {
  storage.set('currentMenu', val)
}
export const getCurrentMenu = () => {
  return storage.get('currentMenu', [])
}
