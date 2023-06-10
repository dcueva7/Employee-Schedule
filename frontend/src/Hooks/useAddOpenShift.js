import Cookies from 'js-cookie'
import { BASE_URL } from '../apiConfig'

const useAddOpenShift = () => {

    const authToken = Cookies.get('authToken')
    
    const addOpenShift = (start, end, date) => {

        fetch(`${BASE_URL}/add_open_shift/`, {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body : JSON.stringify({
                start : start,
                end : end,
                date : date,
            })
        })
            .then(response => response.json())
            .then(json => {
                console.log('added open shift')
            }).catch(error => console.error(error))

    }


    return addOpenShift;

}

export default useAddOpenShift;