'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Perfume } from '@/lib/supabase'

interface CartItem {
  perfume: Perfume
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; perfume: Perfume }
  | { type: 'REMOVE_ITEM'; perfumeId: number }
  | { type: 'UPDATE_QUANTITY'; perfumeId: number; quantity: number }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: (action: CartAction) => void
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.perfume.id === action.perfume.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.perfume.id === action.perfume.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        }
      } else {
        const updatedItems = [...state.items, { perfume: action.perfume, quantity: 1 }]
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        }
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.perfume.id !== action.perfumeId)
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.perfume.id === action.perfumeId
          ? { ...item, quantity: action.quantity }
          : item
      )
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      }
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0 }
    
    default:
      return state
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.perfume.price * item.quantity), 0)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
