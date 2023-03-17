import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { AuthContext } from './hooks';
import Cookies from 'js-cookie';
import * as request from '~/apiService/getUser'

function App() {
    const [auth, setAuth] = useState(!!Cookies.get('token'));

  
    useEffect(() => {
        async function fetchApi() {
            try {
                const res = await request.getCurrentUser();
                localStorage.setItem('name', res.user.name)
                localStorage.setItem('image', res.user.image)
                setAuth(true)

            } catch(e) {
                setAuth(false)
                console.log('err')
            }
        }
        fetchApi()
    })
    
    
    // const AuthContext = AuthContext();
    return (
        
        <AuthContext.Provider value={{auth, setAuth}}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;
    
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
            
        </AuthContext.Provider >
        );
}

export default App;
