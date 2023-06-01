import { useState, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'

const useWeeklyHours = () => {

    const [ hours, setHours ] = useState('')
    const authToken = Cookies.get('authToken')
    
    const fetchHours = useCallback(() => {

        fetch('get_total_hours/', {
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
                'Authorization': `Token ${authToken}`
            }}
        )
            .then(response => response.json())
            .then(json => {
                setHours(json.total_hours)
            }).catch(error => console.error(error))

    }, [authToken])

    useEffect(() => {
        fetchHours()
    }, [fetchHours])

    return hours


}

export default useWeeklyHours;