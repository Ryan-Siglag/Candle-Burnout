import Navbar from '../components/Navbar';
import type { ReactNode } from 'react';
import api from "../api";
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