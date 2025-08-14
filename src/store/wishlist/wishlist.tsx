import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

export type WishlistItem = {
  id: number;
  title?: string;
  imageUrl: string;
  genreKey: string;
};

type State = { items: WishlistItem[] };

type Action =
  | { type: 'INIT'; payload: WishlistItem[] }
  | { type: 'ADD'; payload: WishlistItem }
  | { type: 'REMOVE'; payload: { id: number } }
  | { type: 'CLEAR' };

const STORAGE_KEY = 'wishlist:v1';

const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT':
      return { items: Array.isArray(action.payload) ? action.payload : [] };
    case 'ADD': {
      const exists = state.items.some((i) => i.id === action.payload.id);
      if (exists) return state;
      return { items: [action.payload, ...state.items] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

type Ctx = {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (id: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
};

const WishlistContext = createContext<Ctx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return;
      const parsed = JSON.parse(raw) as WishlistItem[];
      dispatch({ type: 'INIT', payload: parsed });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const api = useMemo<Ctx>(
    () => ({
      items: state.items,
      add: (item) => dispatch({ type: 'ADD', payload: item }),
      remove: (id) => dispatch({ type: 'REMOVE', payload: { id } }),
      clear: () => dispatch({ type: 'CLEAR' }),
      has: (id) => state.items.some((i) => i.id === id),
    }),
    [state.items],
  );

  return <WishlistContext.Provider value={api}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): Ctx {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
