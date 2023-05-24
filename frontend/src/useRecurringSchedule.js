import { useCallback, useEffect } from "react";
import Cookies from "js-cookie";




const useRecurringSchedule = () => {

    const authToken = Cookies.get('authToken')

    const createRecurringSchedule = useCallback(() => {

        fetch('create_recurring_schedule/', {
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
                'Authentication' : `Token ${authToken}`,
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.error(error))
    }, [authToken])

    useEffect(() => {
        createRecurringSchedule()
    }, [createRecurringSchedule])

}

export default useRecurringSchedule;