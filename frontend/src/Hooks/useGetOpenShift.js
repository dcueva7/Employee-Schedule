import { useCallback } from 'react'
import Cookies from 'js-cookie'
import { BASE_URL } from '../apiConfig'

const useGetOpenShift = (setOpenShifts) => {

    const authToken = Cookies.get('authToken')
    
    const fetchOpenShifts = useCallback(() => {
        if (!authToken){
            return
        }
        

        fetch(`${BASE_URL}/get_open_shifts/`, {
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

    }, [authToken, setOpenShifts])

    return fetchOpenShifts;

}

export default useGetOpenShift;