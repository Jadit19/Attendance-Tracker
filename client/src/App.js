import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Welcome from './Pages/Welcome/Welcome'
import Teacher from './Pages/Teacher/Teacher'
import Student from './Pages/Student/Student'

import useLocalStorage from "./Hooks/useLocalStorage"

function App() {
	const [user, setUser] = useLocalStorage('user', null)
	const [userImg, setUserImg] = useLocalStorage('img', null)

	// creating routes in the webpage
	return (
		<div>
			<Navbar user={user} />
			<div className='app'>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/welcome" element={<Welcome user={user} userImg={userImg} />} />
						<Route path="/student" element={<Student user={user} setUser={setUser} setUserImage={setUserImg} />} />
						<Route path="/teacher" element={<Teacher user={user} setUser={setUser} />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	)
}

export default App;