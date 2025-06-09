import HomePage from '../pages/HomePage';
import Menu from '../pages/Menu';
import About from '../pages/About';
import OrderOnline from '../pages/OrderOnline';
import Reservations from '../pages/Reservations';
import Login from '../pages/Login';

const AppRoutes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/menu',
        element: <Menu />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/reservations',
        element: <Reservations />,
    },
    {
        path: '/order',
        element: <OrderOnline />,
    },
    {
        path: '/login',
        element: <Login />,
    },
];

export default AppRoutes;
