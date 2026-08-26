import {
  branchService,
  favoritesService,
  languageService,
  menuService,
  pagesService,
  themeService,
} from '../../src/services/storage';

describe('storage services', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => jest.restoreAllMocks());

  it('manages branches', () => {
    const branch = branchService.create({ name: 'Downtown' });
    expect(branchService.getById(branch.id)).toMatchObject({ name: 'Downtown' });
    expect(branchService.update(branch.id, { city: 'Cairo' })).toMatchObject({ city: 'Cairo' });
    branchService.delete(branch.id);
    expect(branchService.getById(branch.id)).toBeNull();
  });

  it('filters menu items', () => {
    menuService.create({ name: 'Classic', category: 'main' });
    menuService.create({ name: 'Dessert', category: 'dessert' });
    expect(menuService.getByCategory('main')).toHaveLength(1);
    expect(menuService.getById('missing')).toBeNull();
  });

  it('keeps favorites unique and toggles them', () => {
    favoritesService.add('item-1');
    favoritesService.add('item-1');
    expect(favoritesService.getAll()).toEqual(['item-1']);
    favoritesService.toggle('item-1');
    expect(favoritesService.isFavorite('item-1')).toBe(false);
    favoritesService.toggle('item-1');
    expect(favoritesService.isFavorite('item-1')).toBe(true);
  });

  it('updates page sections and persists preferences', () => {
    expect(pagesService.getSection('hero')).toBeNull();
    expect(pagesService.update('hero', { title: 'Welcome' })).toEqual({ title: 'Welcome' });
    expect(pagesService.getSection('hero')).toEqual({ title: 'Welcome' });

    themeService.set('dark');
    languageService.set('en');
    expect(themeService.get()).toBe('dark');
    expect(languageService.get()).toBe('en');
  });

  it('returns safe defaults for invalid stored JSON', () => {
    localStorage.setItem('app:branches', '{invalid');
    localStorage.setItem('app:menu', '{invalid');
    localStorage.setItem('app:pages', '{invalid');
    localStorage.setItem('app:favorites', '{invalid');
    expect(branchService.getAll()).toEqual([]);
    expect(menuService.getAll()).toEqual([]);
    expect(pagesService.get()).toEqual({});
    expect(favoritesService.getAll()).toEqual([]);
  });
});
