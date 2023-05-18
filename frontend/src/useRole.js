import { useEffect, useState } from "react"
import Cookies from "js-cookie"

const useRole = () => {

    const authToken = Cookies.get('authToken')

    const [ manager, setManager] = useState(false)

    useEffect(() => {
        fetch('/check_manager/',{
            method: 'GET',
            headers: {
                'Authorization': `Token ${authToken}`,
            },
        })
            .then((response) => {
                if(!response.ok){
                    setManager(false)
                    console.log(manager, 'user is not a manager')
                    throw new Error("Access forbidden")
                }

                else {
                    console.log("User is a manager")
                    return response.json()
                }
            })
            .then(json => {
                if(json.message === 'true'){
                    setManager(true)
                }
                console.log(json)
            }).catch(error => console.error(error))

    }, [])

    return manager

}

export default useRole