import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import axios from "axios";
import AddNewMovie from './components/AddNewMovie';
import NotFound from './components/NotFound';
import SimpleBackdrop from './components/Spinner';
import { Suspense } from 'react';
import HomePage from './pages/HomePage';
import MovieDetails from './components/Details';
import About from './components/About';
import RegistrationForm from './components/Register';
import LoginForm from './components/Login';
import Profile from './components/Profile';

function App() {

  const loadData = async()=>{
    const res = await axios.get("http://localhost:1000/movies")
    return res.data;
  }

  const router = createBrowserRouter([
    {path: "/", element: <LoginForm></LoginForm>},
    {path: "/portal", element:<HomePage></HomePage>,
    children: [
      {index:true,element:<Movies></Movies>,loader:loadData,errorElement:<NotFound></NotFound>},
      {path:"add", element: <AddNewMovie></AddNewMovie>},
      {path:":id", element: <MovieDetails></MovieDetails>,loader:loadData,errorElement:<NotFound></NotFound>},
      {path:"about", element: <About></About>},
      {path:"profile", element: <Profile></Profile>,loader:loadData},

    ]},
    {path: "/register", element: <RegistrationForm></RegistrationForm>},
    {path: "*", element: <NotFound></NotFound>}
  ])

  return (
    <div className="App" style={{background: 'linear-gradient(135deg, #000022, #000044)'}}> {/*#4a148c*/}
      <Suspense fallback={<SimpleBackdrop></SimpleBackdrop>}>
      <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </div>
  );
}

export default App;
