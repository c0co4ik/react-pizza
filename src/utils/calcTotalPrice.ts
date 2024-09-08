import { Product } from '../redux/slices/cartSlice'

export const calcTotalPrice = (items: Product[]) => {
	return items.reduce((sum, obj) => {
		return obj.price * obj.count + sum
	}, 0)
}