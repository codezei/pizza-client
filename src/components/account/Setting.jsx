import React from 'react'
import './Setting.scss'
import { useSelector, useDispatch } from 'react-redux'
import {edit} from '../../actions/user'


function Setting () {
    let dispatch = useDispatch()
    let [disabledInput, setDisabledInput] = React.useState(true)
    let user = useSelector(state=> {return state.user.currentUser})
    let [userData, setUserData] = React.useState({...user})
    
    function disabledInputHandler () {
        setDisabledInput(false)
    }
    function sendChangeUserDataHandler (e) {
        e.preventDefault()
        dispatch(edit(userData))
        setDisabledInput(true)
    }
    function changeUserDataHandler (e) {
        setUserData({
            ...userData, [e.target.name]: e.target.value
        })
    }
    React.useEffect(()=>{
        setUserData({...user})
    }, [user])

    return (
        <div className="setting">
            <div className="setting__item">
                <div className="setting__item-header">
                    <h3 className="setting__item-title">Личные данные</h3>
                    {
                        disabledInput ?  <button className="setting__item-btn btn btn--inversion" onClick={disabledInputHandler}>Изменить</button> : ""
                    }
                   
                </div>
                <form className="setting__item-form" method='POST' onSubmit={sendChangeUserDataHandler}>
                    <div className="row">
                        <div className="col-12 col-sm-6 col-xl-3 setting__item-col">
                            <label className="setting__item-label" htmlFor='name'>
                                Имя
                            </label>
                            <input type="text" className="setting__item-input input" disabled={disabledInput} value={userData.name || ''} id="name" name="name" onChange={changeUserDataHandler}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3 setting__item-col">
                            <label className="setting__item-label" htmlFor='phone'>
                                Телефон
                            </label>
                            <input type="tel" className="setting__item-input input" disabled={disabledInput} value={userData.phone || ''} id="phone" name="phone" onChange={changeUserDataHandler}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3 setting__item-col">
                            <label className="setting__item-label" htmlFor='email'>
                                Email
                            </label>
                            <input type="email" className="setting__item-input input" disabled={disabledInput} value={userData.email || ''} id="email" name="email" onChange={changeUserDataHandler}></input>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-3 setting__item-col">
                            <label className="setting__item-label" htmlFor='date'>
                                Дата рождения
                            </label>
                            <input type="text" className="setting__item-input input" disabled={disabledInput} value={userData.date || ''} id="date" name="date" onChange={changeUserDataHandler}></input>
                        </div>


                    </div>
                    {
                            !disabledInput ? 
   
                                <button className="btn setting__item-btn">Изменить</button>
    
                            : ""
                        }
                </form>

            </div>
        </div>
    )
}

export default Setting