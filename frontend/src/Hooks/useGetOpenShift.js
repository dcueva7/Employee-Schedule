import { useState, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'

const useGetOpenShift = () => {


    const authToken = Cookies.get('authToken')
    const [ openShifts, setOpenShifts ] = useState([])
    
    const fetchOpenShifts = useCallback(() => {

        fetch('get_open_shifts/', {
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
                'Authorization': `Token ${authToken}`
            }}
        )
            .then(response => response.json())
            .then(json => {
                setOpenShifts(json)
            }).catch(error => console.error(error))

    }, [authToken])


    useEffect(() => {
        fetchOpenShifts()
    })

    return { openShifts }

}

export default useGetOpenShift;