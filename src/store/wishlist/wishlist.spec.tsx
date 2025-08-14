import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { WishlistProvider, useWishlist, WishlistItem } from './wishlist';

const STORAGE_KEY = 'wishlist:v1';

const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <WishlistProvider>{children}</WishlistProvider>
);

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('useWishlist', () => {
  it('throws if used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useWishlist())).toThrow(
      /useWishlist must be used within WishlistProvider/i,
    );
    spy.mockRestore();
  });

  it('initializes from localStorage (INIT effect)', async () => {
    const initial: WishlistItem[] = [{ id: 1, title: 'A', imageUrl: '/a.jpg', genreKey: 'action' }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));

    const { result } = renderHook(() => useWishlist(), { wrapper });

    await waitFor(() => {
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe(1);
    });
  });

  it('adds items and prevents duplicates', async () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => {
      result.current.add({ id: 10, title: 'X', imageUrl: '/x.jpg', genreKey: 'drama' });
    });
    expect(result.current.items.map((i) => i.id)).toEqual([10]);

    act(() => {
      result.current.add({ id: 10, title: 'X again', imageUrl: '/x2.jpg', genreKey: 'drama' });
    });
    expect(result.current.items.map((i) => i.id)).toEqual([10]); // no dup
  });

  it('remove, clear, and has()', () => {
    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => {
      result.current.add({ id: 1, title: 'A', imageUrl: '/a.jpg', genreKey: 'action' });
      result.current.add({ id: 2, title: 'B', imageUrl: '/b.jpg', genreKey: 'scifi' });
    });
    expect(result.current.has(1)).toBe(true);
    expect(result.current.has(3)).toBe(false);

    act(() => result.current.remove(1));
    expect(result.current.items.map((i) => i.id)).toEqual([2]);
    expect(result.current.has(1)).toBe(false);

    act(() => result.current.clear());
    expect(result.current.items).toHaveLength(0);
  });

  it('persists to localStorage on changes', async () => {
    const setSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');

    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => {
      result.current.add({ id: 99, title: 'Z', imageUrl: '/z.jpg', genreKey: 'thriller' });
    });

    expect(setSpy).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify([{ id: 99, title: 'Z', imageUrl: '/z.jpg', genreKey: 'thriller' }]),
    );

    act(() => {
      result.current.remove(99);
    });

    expect(setSpy).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([]));
  });
});
