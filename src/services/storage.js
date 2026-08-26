/**
 * Local Storage Service
 * Handles all localStorage operations for the app
 * Replaces API calls with localStorage persistence
 */

const STORAGE_KEYS = {
  BRANCHES: 'app:branches',
  MENU: 'app:menu',
  PAGES: 'app:pages',
  THEME: 'app:theme',
  LANGUAGE: 'app:language',
  FAVORITES: 'app:favorites'
}

/**
 * Initialize storage with seed data
 */
export async function initializeStorage() {
  try {
    // Check if already initialized
    if (localStorage.getItem('app:_initialized')) {
      return
    }

    // Import seed data
    const branches = await import('../data/branches.json')
    const menu = await import('../data/menu.json')
    const pages = await import('../data/pages.json')

    // Store data
    localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(branches.default))
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menu.default))
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages.default))
    localStorage.setItem('app:_initialized', 'true')

    console.log('✅ Storage initialized with seed data')
  } catch (error) {
    console.error('❌ Failed to initialize storage:', error)
  }
}

/**
 * Branches Operations
 */
export const branchService = {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BRANCHES)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading branches:', error)
      return []
    }
  },

  getById(id) {
    const branches = this.getAll()
    return branches.find(b => b.id === id) || null
  },

  create(branch) {
    const branches = this.getAll()
    const newBranch = {
      ...branch,
      id: Date.now().toString()
    }
    branches.push(newBranch)
    localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(branches))
    return newBranch
  },

  update(id, updates) {
    const branches = this.getAll()
    const index = branches.findIndex(b => b.id === id)
    if (index === -1) return null
    branches[index] = { ...branches[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(branches))
    return branches[index]
  },

  delete(id) {
    const branches = this.getAll()
    const filtered = branches.filter(b => b.id !== id)
    localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(filtered))
    return true
  }
}

/**
 * Menu Operations
 */
export const menuService = {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MENU)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading menu:', error)
      return []
    }
  },

  getByCategory(category) {
    const menu = this.getAll()
    return menu.filter(item => item.category === category)
  },

  getById(id) {
    const menu = this.getAll()
    return menu.find(item => item.id === id) || null
  },

  create(item) {
    const menu = this.getAll()
    const newItem = {
      ...item,
      id: Date.now().toString()
    }
    menu.push(newItem)
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menu))
    return newItem
  },

  update(id, updates) {
    const menu = this.getAll()
    const index = menu.findIndex(item => item.id === id)
    if (index === -1) return null
    menu[index] = { ...menu[index], ...updates }
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menu))
    return menu[index]
  },

  delete(id) {
    const menu = this.getAll()
    const filtered = menu.filter(item => item.id !== id)
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(filtered))
    return true
  }
}

/**
 * Pages / Static Content Operations
 */
export const pagesService = {
  get() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PAGES)
      return data ? JSON.parse(data) : {}
    } catch (error) {
      console.error('Error reading pages:', error)
      return {}
    }
  },

  getSection(section) {
    const pages = this.get()
    return pages[section] || null
  },

  update(section, data) {
    const pages = this.get()
    pages[section] = { ...pages[section], ...data }
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages))
    return pages[section]
  }
}

/**
 * Favorites Management
 */
export const favoritesService = {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES)
      return data ? JSON.parse(data) : []
    } catch (error) {
      return []
    }
  },

  add(id) {
    const favorites = this.getAll()
    if (!favorites.includes(id)) {
      favorites.push(id)
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
    }
  },

  remove(id) {
    const favorites = this.getAll()
    const filtered = favorites.filter(fav => fav !== id)
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered))
  },

  toggle(id) {
    const favorites = this.getAll()
    if (favorites.includes(id)) {
      this.remove(id)
    } else {
      this.add(id)
    }
  },

  isFavorite(id) {
    return this.getAll().includes(id)
  }
}

/**
 * Theme Management
 */
export const themeService = {
  get() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light'
  },

  set(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  }
}

/**
 * Language Management
 */
export const languageService = {
  get() {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ar'
  },

  set(lang) {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang)
  }
}

export const storageService = {
  get(key, fallback) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : fallback
    } catch (error) {
      return fallback
    }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export default {
  branchService,
  menuService,
  pagesService,
  favoritesService,
  themeService,
  languageService,
  storageService,
  STORAGE_KEYS
}
