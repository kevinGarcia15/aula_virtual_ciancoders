import { toLower } from "lodash";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { toggleOpen, navToggle, logOut } = this.props;
        const rol = toLower(localStorage.getItem("rol"));
        return (
            <aside
                className={`main-sidebar px-0 col-12 col-md-3 col-lg-2 ${
                    toggleOpen ? "" : "open"
                }`}
            >
                <div className="main-navbar">
                    <nav className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0 navbar navbar-light">
                        <a href="#" className="w-100 mr-0 navbar-brand">
                            <div className="d-table m-auto">
                                <img
                                    id="main-logo"
                                    className="d-inline-block align-top mr-1"
                                    src={require("assets/img/aulavirtual.png")}
                                    alt="Logo"
                                />
                            </div>
                        </a>
                        <a
                            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                            onClick={navToggle}
                        >
                            <i className="material-icons"></i>
                        </a>
                    </nav>
                </div>
                <div className="nav-wrapper">
                    <ul className="nav--no-borders flex-column nav">
                        <li className="nav-item">
                            <NavLink
                                to={`/${rol}`}
                                exact
                                className="nav-link "
                                activeClassName={"active"}
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">edit</i>
                                </div>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        {localStorage.getItem("rol") == "Admin" ? (
                            <div>
                                <li className="nav-item">
                                    <NavLink
                                        to="/maestros"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">
                                                account_box
                                            </i>
                                        </div>
                                        <span>Maestros</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/ciclos"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">
                                                account_box
                                            </i>
                                        </div>
                                        <span>Ciclos</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/estudiantes"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">
                                                account_box
                                            </i>
                                        </div>
                                        <span>Estudiantes</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/asignacion/listar"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">
                                                assignment
                                            </i>
                                        </div>
                                        <span>Asignaciones</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/grado"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">
                                                vertical_split
                                            </i>
                                        </div>
                                        <span>Grados</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/seccion"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">
                                                vertical_split
                                            </i>
                                        </div>
                                        <span>Seccion</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/curso"
                                        className="nav-link"
                                        activeClassName={"active"}
                                    >
                                        <div className="d-inline-block item-icon-wrapper">
                                            <i className="material-icons">
                                                vertical_split
                                            </i>
                                        </div>
                                        <span>Curso</span>
                                    </NavLink>
                                </li>
                            </div>
                        ) : null}
                        {localStorage.getItem("rol") == "Maestro" ? (
                            <li className="nav-item">
                                <NavLink
                                    to="/cursosasignados/"
                                    className="nav-link"
                                    activeClassName={"active"}
                                >
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">
                                            vertical_split
                                        </i>
                                    </div>
                                    <span>Cursos Asignados</span>
                                </NavLink>
                            </li>
                        ) : null}
                        {localStorage.getItem("rol") == "Estudiante" ? (
                            <li className="nav-item">
                                <NavLink
                                    to="/misasignaciones/"
                                    className="nav-link"
                                    activeClassName={"active"}
                                >
                                    <div className="d-inline-block item-icon-wrapper">
                                        <i className="material-icons">
                                            vertical_split
                                        </i>
                                    </div>
                                    <span>Mis Cursos</span>
                                </NavLink>
                            </li>
                        ) : null}
                        <li className="nav-item">
                            <Link
                                to="/login"
                                onClick={logOut}
                                className="nav-link"
                            >
                                <div className="d-inline-block item-icon-wrapper">
                                    <i className="material-icons">lock</i>
                                </div>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}

export default SideBar;
