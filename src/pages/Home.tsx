import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../Components/index.ts';
import { selectFilter, setCategoryId, setCurrentPage, setFilters, TParamsFilter} from '../redux/slices/filterSlice.ts'
import { fetchPizzas } from '../redux/slices/pizzaSlice.ts';
import { AppDispatch } from '../redux/store.ts';
import { PizzaBlockProps } from '../Components/PizzaBlock/PizzaBlock.tsx';



export const Home: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
	const {items, status} = useSelector((state: any) => state.pizza);

	const [searchParams, setSearchParams] = useSearchParams();
	const isSearch = useRef(false);
	const isMounted = useRef(false);


	const handleFilter = useCallback((index: number) => {
		dispatch(setCategoryId(index));
	}, [])

	const changeCurrentPage = (value: number) => {
		dispatch(setCurrentPage(value))
	}

	const getPizzas = async() => {

		const sortBy = sort.replace('-', '');
		const order = sort.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(fetchPizzas({
			sortBy,
			order,
			category,
			search,
			currentPage
			})
		)
	}
	
	// Добавляю параметры 
	useEffect(() => {
		if(isMounted.current) {
			setSearchParams({
				categoryId: categoryId.toString(),
				sort,
				currentPage: currentPage.toString()
			})
		}
		isMounted.current = true;
	}, [categoryId, sort, currentPage])
	

 // 1 рендер
	useEffect(() => {
		if(searchParams) {
			const params: TParamsFilter = {
				categoryId: searchParams.get('categoryId') || 0,
				sort: searchParams.get('sort') || 'rating',
				currentPage: searchParams.get('currentPage') || 1
			}
			dispatch(
				setFilters({
					...params
				})
			)
		}
		isSearch.current = true;
		getPizzas();
	}, [])

	// рендер после изменение категории, сорт, страницы или поиска
	useEffect(() => {
		if(!isSearch.current) {
			getPizzas()
		}

		isSearch.current = false;

		window.scrollTo(0, 0)
	}, [categoryId, sort, searchValue, currentPage])

	return (
		<>
			<div className='container'>
				<div className='content__top'>
					<Categories activeFilter={categoryId} handleFilter={handleFilter} />
					<Sort value={sort} />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>
					{status === 'loading' ? (
						<Skeleton />
					) : (
						items.map((obj: PizzaBlockProps) => <PizzaBlock key={obj.id} {...obj} />)
					)}
				</div>
				< Pagination currentPage={currentPage} onPageChange={(page:number) => changeCurrentPage(page)} />
			</div>
		</>
	)
}

