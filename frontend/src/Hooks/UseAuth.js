import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

import Cookies from "js-cookie";

const useAuth = () => {

    const nav = useNavigate()

    const authToken = Cookies.get("authToken")

    useEffect(() => {
        if (!authToken){
            nav('/sign_in')
        }
    }, [authToken, nav])

    return authToken;

}

export default useAuth;