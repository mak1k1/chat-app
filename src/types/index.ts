export interface User {
  id: string
  username: string
  phone: string
  imageUrl?: string
  bio?: string
}

export interface Chat {
  id: string
  isGroup: boolean
  // ... other chat properties
}
