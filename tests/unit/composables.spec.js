import { createPinia, setActivePinia } from 'pinia'
import { usePageMeta } from '../../src/composables/usePageMeta'
import { usePWAInstall } from '../../src/composables/usePWAInstall'
import { useToastStore } from '../../src/stores/toastStore'

describe('page metadata', () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <title></title>
      <meta name="description" content="default">
      <meta property="og:title" content="default">
      <meta property="og:description" content="default">
    `
  })

  it('updates title and description metadata', () => {
    usePageMeta({ title: 'Menu', description: 'Explore the menu' })
    expect(document.title).toContain('Menu')
    expect(document.querySelector('meta[name="description"]').content).toBe('Explore the menu')
    expect(document.querySelector('meta[property="og:title"]').content).toContain('Menu')
    expect(document.querySelector('meta[property="og:description"]').content).toBe('Explore the menu')
  })
})

describe('PWA installation', () => {
  it('prompts and clears an accepted installation', async () => {
    const prompt = jest.fn()
    const event = new Event('beforeinstallprompt')
    event.preventDefault = jest.fn()
    Object.defineProperty(event, 'userChoice', { value: Promise.resolve({ outcome: 'accepted' }) })
    Object.defineProperty(event, 'prompt', { value: prompt })
    window.dispatchEvent(event)

    const installState = usePWAInstall()
    expect(installState.canInstall.value).toBe(true)
    await installState.install()
    expect(event.preventDefault).toHaveBeenCalled()
    expect(installState.canInstall.value).toBe(false)
    expect(prompt).toHaveBeenCalled()
  })
})

describe('toast store', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    setActivePinia(createPinia())
  })

  afterEach(() => jest.useRealTimers())

  it('creates typed toasts and dismisses them automatically', () => {
    const store = useToastStore()
    store.success('Saved', 1000)
    store.error('Failed', 2000)
    expect(store.toasts).toEqual([
      { id: 0, message: 'Saved', type: 'success' },
      { id: 1, message: 'Failed', type: 'error' }
    ])

    store.dismiss(0)
    expect(store.toasts).toHaveLength(1)
    jest.advanceTimersByTime(2000)
    expect(store.toasts).toHaveLength(0)
  })
})
