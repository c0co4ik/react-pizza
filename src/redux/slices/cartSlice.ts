import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { calcTotalPrice } from '../../utils/calcTotalPrice'

export interface Product {
	id: number,
	title: string,
	type: string,
	size: number,
	price: number,
	imageUrl: string,
	count: number,
}

export interface CartSliceState {
	totalPrice: number
	items: Product[]
}

const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
	totalPrice,
	items
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {

		addItem(state, action: PayloadAction<Product>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if(findItem) {
				findItem.count ++
			} else {
				state.items.push({
					...action.payload,
					count: 1
				})
			}
			state.totalPrice = calcTotalPrice(state.items)
		},

		removeItem(state, action: PayloadAction<number>) {
			const itemToRemove = state.items.find((obj) => obj.id === action.payload);
			if(itemToRemove) {
				state.items = state.items.filter((obj) => obj.id !== action.payload);
				state.totalPrice -= itemToRemove.price * itemToRemove.count; 
			}
		},

		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},

		minusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if(findItem) {
				if(findItem.count > 1) {
					findItem.count --
					state.totalPrice -= findItem.price
				}
			} 
		}
	}
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartCartById = (id:number) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
