import { Link } from "react-router-dom";
import '../styles/NavBar.css'
function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link id="item" to = "/" className="navbar-brand">
                        <span className="me-2 fs-3">Pizzeria</span> 
                        <img id="logo" src="src\assets\Logo.png" alt="logo" height={"60px"} width={"60px"} className="d-inline-block"/>
                    </Link> 
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li id="item" className="nav-item-text fs-5"><Link to={"/order"} className="nav-link">Order Pizza</Link></li>
                        <li id="item" className="nav-item-text fs-5"><Link to={"/build"} className="nav-link">Bild your Pizza</Link></li>
                    </ul>
                </div>

                <button className="d-flex btn btn-warning p-3">
                    Shopping Cart
                </button>

                </div>
            </nav>
        </>
    )
}

export default NavBar;