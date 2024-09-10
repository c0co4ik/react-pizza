import React, { useEffect } from 'react'

type HandleFilter = (id: number) => void

interface CategoriesProps {
	activeFilter: number
	handleFilter: HandleFilter
}

export const Categories: React.FC<CategoriesProps> = React.memo(({
	activeFilter,
	handleFilter,
}) => {
	const categories = [
		{ id: 0, name: 'Все' },
		{ id: 1, name: 'Мясные' },
		{ id: 2, name: 'Вегетарианская' },
		{ id: 3, name: 'Гриль' },
		{ id: 4, name: 'Острые' },
		{ id: 5, name: 'Закрытые' },
	]

	const [openPopupBurger, setOpenPopupBurger] = React.useState(false);
	const menuRef = React.useRef<HTMLDivElement>(null);

	const handleClickBurger = () => {
		setOpenPopupBurger(prev => !prev);
	}

	useEffect(() => {
		const clickCloseMenu = (e: MouseEvent) => {
			const path = e.composedPath();
			if(menuRef.current && !path.includes(menuRef.current)) {
				setOpenPopupBurger(false);

			}
		}
		document.body.addEventListener('click', clickCloseMenu)

		return () => {
			document.body.removeEventListener('click', clickCloseMenu)
		}
	}, [])

	return (
		<div className='categories'>
			<ul className='menu-dt'>
				{categories.map(item => (
					<li
						onClick={() => handleFilter(item.id)}
						key={item.id}
						className={activeFilter === item.id ? 'active' : ''}
					>
						{item.name}
					</li>
				))}
			</ul>
			<div ref={menuRef} className='menu'>
				<input
					type='checkbox'
					id='burger-checkbox'
					className='burger-checkbox'
					checked={openPopupBurger}
					readOnly
				/>
				<label onClick={handleClickBurger} htmlFor='burger-checkbox' className='burger'></label>
				{openPopupBurger && <ul className='menu-list'>
					{categories.map(item => (
						<li
							onClick={() => handleFilter(item.id)}
							key={item.id}
							className={activeFilter === item.id ? 'active' : ''}
						>
							{item.name}
						</li>
					))}
				</ul>}
			</div>
		</div>
	)
})
