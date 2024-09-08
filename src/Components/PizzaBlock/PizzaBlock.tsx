import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, Product, selectCartCartById } from '../../redux/slices/cartSlice';

export interface PizzaBlockProps {
	price: number
	title: string
	types: number[]
	imageUrl: string
	sizes: number[]
	id: number
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
	price,
	title,
	types,
	imageUrl,
	sizes,
	id,
}) => {
	const dispatch = useDispatch();
	const cartItem = useSelector(selectCartCartById(id));
	const [activeType, setActiveType] = useState(0);
	const [activeSize, setActiveSize] = useState(26);
	const type: string[] = ['тонкое', 'традиционное'];
	const addedCount = cartItem ? cartItem.count : 0;

	const onClickAdd = () => {
		const item: Product = {
			id,
			title,
			price,
			type: type[activeType],
			size: activeSize,
			imageUrl,
			count: 0
		}
		dispatch(addItem(item))
	}

	useEffect(() => {
		if (types.length > 0) {
			setActiveType(types[0])
		}
	}, [])

	const handleActiveSize = (size: number) => {
		setActiveSize(size)
	}

	const handleActiveType = (type: number) => {
		setActiveType(type)
	}

	const handleClickAdd = () => {
		onClickAdd();
	}


	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
				<h4 className='pizza-block__title'>{title}</h4>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((value, index) => (
							<li
								className={value === activeType ? 'active' : ''}
								onClick={() => handleActiveType(value)}
								key={index}
							>
								{type[value]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, index) => (
							<li
								onClick={() => handleActiveSize(size)}
								className={activeSize === size ? 'active' : ''}
								key={index}
							>
								{size} см
							</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {price} ₽</div>
					<button
						className='button button--outline button--add'
						onClick={() => handleClickAdd()}
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</button>
				</div>
			</div>
		</div>
	)
}

