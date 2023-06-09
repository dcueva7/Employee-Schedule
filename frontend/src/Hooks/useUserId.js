import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { BASE_URL } from "../apiConfig"

const useUserId = () => {

    const authToken = Cookies.get('authToken')

    const [ id, setId] = useState('')

    useEffect(() => {
        if(!authToken){
            return
        }
        fetch(`${BASE_URL}/get_id/`,{
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
            },
        })
            .then(response => response.json() )
            .then(json => {
                setId(json.id)
            }).catch(error => console.error(error))

    }, [authToken])

    return id

}

export default useUserId