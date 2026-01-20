import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from './layouts/Layouts'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Questions from './pages/Questions'
import RecentEntry from './pages/RecentEntry'
import AllEntries from './pages/AllEntries'
import Home from './pages/Home'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recent-entry"
            element={
              <ProtectedRoute>
                <RecentEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <AllEntries />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<NotFound />}></Route> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
