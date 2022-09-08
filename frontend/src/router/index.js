import {useContext} from 'react'
import About from "../pages/About"
import Tickets from "../pages/Tickets"
import TicketIdPage from "../pages/TicketIdPage"
import NoPage from "../pages/NoPage"
import Login from "../pages/Login"
import {BrowserRouter, Routes, Route, Link, Switch} from 'react-router-dom'
import {AuthContext} from "../context"

const AppRouter = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext)
	return(
	  <div>
		{isAuth
			?
    		  <Routes>
		        <Route exact path="/tickets" element=<Tickets/>/>
		        <Route exact path="/tickets/:id/comments" element=<TicketIdPage />/>
		        <Route path="/about" element=<About />/>
		        <Route path="*" element=<NoPage />/>
	    	  </Routes>
			:
    		  <Routes>
		        <Route exact path="/login" element=<Login />/>
		        <Route path="*" element=<Login />/>
	    	  </Routes>
		}
	  </div>
)
}

export default AppRouter