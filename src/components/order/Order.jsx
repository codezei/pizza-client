import { Outlet } from "react-router-dom";

function Order() {



    return (

        <div className="order">
            <div className="container">
                <Outlet></Outlet>
            </div> 
        </div> 

    )
}


export default Order