import { useEffect, useState } from "react"
import Cookies from "js-cookie"

const useUserId = () => {

    const authToken = Cookies.get('authToken')

    const [ id, setId] = useState('')

    useEffect(() => {
        if(!authToken){
            return
        }
        fetch('/get_id/',{
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
            },
        })
            .then(response => response.json() )
            .then(json => {
                setId(json.id)
                console.log('retrieved user id')
            }).catch(error => console.error(error))

    }, [authToken])

    return id

}

export default useUserId