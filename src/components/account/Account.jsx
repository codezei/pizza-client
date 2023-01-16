import {Outlet, NavLink} from "react-router-dom"
import './Account.scss'

function Account () {
    return (
        <div className="account block">
            <div className="container">
                <div className="account__header">
                    <h2 className="title account__title">Мой аккаунт</h2>
                    <div className="account__navigation">
                        <NavLink to="history" className="btn btn--inversion account__navigation-btn">История</NavLink>
                        <NavLink to="setting" className="btn btn--inversion account__navigation-btn">Настройки</NavLink>
                        
                    </div>
                </div>
                <div className="account__content">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default Account