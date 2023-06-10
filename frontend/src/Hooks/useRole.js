import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { BASE_URL } from "../apiConfig"

const useRole = () => {

    const authToken = Cookies.get('authToken')

    const [ manager, setManager] = useState(false)

    useEffect(() => {
        if(!authToken){
            return
        }

        fetch(`${BASE_URL}/check_manager/`,{
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
            },
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error("Access forbidden")
                }

                else {
                    return response.json()
                }
            })
            .then(json => { 
                setManager(json.message)
            }).catch(error => console.error(error))

    }, [authToken, manager])

    return manager

}

export default useRole