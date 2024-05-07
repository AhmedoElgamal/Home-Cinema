import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const HomePage = () => {

    return (
        <>
        <NavBar></NavBar>
        <Outlet></Outlet>
        </>
    );
}

export default HomePage;