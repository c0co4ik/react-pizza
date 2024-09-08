import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from './cartSlice'

type FetchParamsType = {
	sortBy: string
	order: string
	category: string
	search: string
	currentPage: number
}

export const fetchPizzas = createAsyncThunk<Product[], FetchParamsType>(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get<Product[]>(
			`https://669dcf219a1bda3680046a82.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface PizzaSliceState {
	items: Product[],
	status: Status
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizza(state, action: PayloadAction<Product[]>) {
			state.items = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
			state.items = [];
    }),

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
			state.status = Status.SUCCESS;
    }),

		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
    })
  },
})

export const { setPizza } = pizzaSlice.actions

export default pizzaSlice.reducer
