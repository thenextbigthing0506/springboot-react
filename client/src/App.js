import NavBar from './components/NavBar'
import './App.css'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/home'
import Signin from './components/screens/signin'
import Signup from './components/screens/signup'
import Profile from './components/screens/profile'
import CreatePost from './components/screens/createPost'
import UserProfile from './components/screens/userProfile'
import SubscribedPost from './components/screens/subscribedPost'
import EmployeeList from './components/screens/viewEmployee'
import AddEmployee from './components/screens/addEmployee'
import {useEffect, createContext, useReducer, useContext } from 'react';
import {reducer, initialState } from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () =>{
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
        history.push('/signin')
    }
    
  },[])
  
    return (

      <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/addEmployee">
            <AddEmployee />
          </Route>
          <Route path="/viewEmployee">
            <EmployeeList />
          </Route> 
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/profile'>
            <Profile />
          </Route>
          <Route path='/create'>
            <CreatePost />
          </Route>
          <Route path='/profile/:userid'>
            <UserProfile />
          </Route>
          <Route path='/subscribedpost'>
            <SubscribedPost />
          </Route>
      </Switch>

    )
}

function App() {
   
  const [state, dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar/>
      <Routing />
     
    </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
