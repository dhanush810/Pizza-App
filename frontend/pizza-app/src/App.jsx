import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./components/Home"
import Order from "./pages/Order"
import BuildPizze from "./pages/BuildPizze"
function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/build" element={<BuildPizze/>}/>
      </Routes>
    </>
  )
}

export default App
