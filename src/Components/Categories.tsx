import React from 'react'

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
			<div className='menu'>
				<input
					type='checkbox'
					id='burger-checkbox'
					className='burger-checkbox'
				/>
				<label htmlFor='burger-checkbox' className='burger'></label>
				<ul className='menu-list'>
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
			</div>
		</div>
	)
})
