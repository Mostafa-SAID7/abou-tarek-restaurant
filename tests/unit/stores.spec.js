import { createPinia, setActivePinia } from 'pinia';
import { useMenuStore } from '../../src/stores/menuStore';
import { useBranchStore } from '../../src/stores/restaurantStore';

describe('Pinia stores', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('filters menu items through store state', () => {
    localStorage.setItem(
      'app_menu',
      JSON.stringify({
        categories: [],
        daqqahLevels: [],
        items: [
          {
            id: '1',
            category: 'main',
            name: { en: 'Koshary', ar: 'كشري' },
            flags: { isVegan: true },
          },
          {
            id: '2',
            category: 'dessert',
            name: { en: 'Rice Pudding', ar: 'أرز' },
            flags: { isAvailable: false },
          },
        ],
      })
    );

    const store = useMenuStore();
    expect(store.filteredItems).toHaveLength(1);
    store.searchQuery = 'koshary';
    expect(store.filteredItems[0].id).toBe('1');
    store.toggleVeganFilter();
    expect(store.filteredItems).toHaveLength(1);
  });

  it('filters and paginates branches through store state', () => {
    localStorage.setItem(
      'app_branches',
      JSON.stringify([
        { id: '1', name: { en: 'Downtown', ar: 'وسط البلد' }, location: { area: 'cairo' } },
        { id: '2', name: { en: 'Giza', ar: 'الجيزة' }, location: { area: 'giza' } },
      ])
    );

    const store = useBranchStore();
    expect(store.branches).toHaveLength(2);
    store.setSelectedArea('cairo');
    expect(store.filtered).toHaveLength(1);
    expect(store.currentPage).toBe(1);
    store.setViewMode('list');
    expect(store.viewMode).toBe('list');
    expect(localStorage.getItem('viewMode')).toBe('list');
  });
});
