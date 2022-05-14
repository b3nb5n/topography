import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SigninPage from './pages/signin'

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='signin' element={<SigninPage />} />

				<Route path='*' element='404' />
			</Routes>
		</BrowserRouter>
	)
}

export default App
