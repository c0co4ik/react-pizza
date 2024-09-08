import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { setSort } from '../redux/slices/filterSlice'

type SortProps = {
	value: string
}

type SortItem = {
	name: string;
	params: 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price'
}
type PopupClick = MouseEvent;

export const sortParams: SortItem[] = [
	{
		name: 'популярности(DESC)',
		params: 'rating'
	},
	{
		name: 'популярности(ASK)',
		params: '-rating'
	},
	{
		name: 'цене(DESK)',
		params: 'price'
	},
	{
		name: 'цене(ASK)',
		params: '-price'
	},
	{
		name: 'алфавиту(DESK)',
		params: 'title'
	},
	{
		name: 'алфавиту(ASK)',
		params: '-title'
	}
]

export const Sort: React.FC<SortProps> = React.memo(({value}) => {
	const dispatch = useDispatch();
	const sortRef = useRef<HTMLDivElement>(null);
	const handleClickSort = (param:string) => {
		dispatch(setSort(param));
		handleClickPopup();
	}

	const [openPopupSort, setOpenPopupSort] = useState(false)

	const handleClickPopup = () => {
		setOpenPopupSort(prev => !prev)
	}

	const activeNameForParams = sortParams.find(param => param.params === value)

	// Клик для закрытия попапа
	useEffect(() => {
		const clickClosePopup = (e: PopupClick) => {
			const path = e.composedPath();
			if(sortRef.current && !path.includes(sortRef.current)) {
				setOpenPopupSort(false)
			} 
		}
	
		document.body.addEventListener('click', clickClosePopup);

		return () => {
			document.body.removeEventListener('click', clickClosePopup)
		}
	}, [])

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => handleClickPopup()}>{activeNameForParams?.name || ''}</span>
			</div>
			{openPopupSort && <div className='sort__popup'>
				<ul>
					{sortParams.map(obj => <li onClick={() => handleClickSort(obj.params)} className={value === obj.params ? 'active' : ''} key={obj.params}>{obj.name}</li>)}
				</ul>
			</div>}
		</div>
	)
})
