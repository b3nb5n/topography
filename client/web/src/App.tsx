import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInPage from './pages/sign-in'

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='sign-in' element={<SignInPage />} />

				<Route path='*' element='404' />
			</Routes>
		</BrowserRouter>
	)
}

export default App
