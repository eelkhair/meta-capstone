import './App.css';
import Layout from './layouts/Layout/Layout';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './routing/AppRoutes';

const App = () => {
    return (
        <>
            <BrowserRouter
                future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                }}
            >
                <Layout>
                    <Routes>
                        {AppRoutes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    );
};

export default App;
