import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './scss/app.scss';

import { Header } from './Components/Header.tsx';
import { Home } from './pages/Home.tsx';

const Cart = React.lazy(() => import('./pages/Cart.tsx'))
const NotFound = React.lazy(() => import('./pages/NotFound.tsx'))


function App() {

	return (
		<Router>
			<div className='wrapper'>
					<Header />
					<div className='content'>
							<Routes>
								<Route path='/react-pizza/' element={<Home />} />
								<Route path='/cart' element={
									<React.Suspense fallback={<div>Идет загрузка корзины...</div>}>
										<Cart />
									</React.Suspense>} />
								<Route path='*' element={
									<React.Suspense fallback={<div>Идет загрузка страницы</div>}>
										<NotFound />
									</React.Suspense>} />
							</Routes>
					</div>
			</div>
		</Router>
	)
}

export default App
