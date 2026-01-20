// components/Layout.tsx
import Navbar from '../components/Navbar';
import type { ReactNode } from 'react';
import { jwtDecode } from "jwt-decode";
import api from "../api";
// import candle_logo_bw from '../assets/images/candle_logo_bw.png'
import { REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    const checkValidation = async () => {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("http://127.0.0.1:8000/api/users/token/refresh", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
        }
    }

    useEffect(() => {
        // // Check if user has access token
        // const token = localStorage.getItem(REFRESH_TOKEN);
        // console.log()
        // if (!token) {
        //     setIsAuthenticated(false);
        //     return;
        // }

        // const decoded = jwtDecode(token);
        // const tokenExpiration = decoded.exp;
        // const now = Date.now() / 1000;
        
        // console.log(tokenExpiration)
        // console.log(now)

        // if (tokenExpiration === undefined || tokenExpiration < now) {
        //     setIsAuthenticated(false);
        // } else {
        //     setIsAuthenticated(true);
        // }

        checkValidation()
        window.scrollTo(0, 0);

     }, [location.pathname]);

     

  return (
    <>
      <title>Candle</title>
      <link rel="icon" type="image/png" href="/favicon.ico"/>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
    
  );
};

export default Layout;