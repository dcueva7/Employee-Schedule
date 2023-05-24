
import Cookies from "js-cookie";




const useRecurringSchedule = () => {

    const authToken = Cookies.get('authToken')

    const createRecurringSchedule = () => {

        fetch('create_recurring_schedule/', {
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Token ${authToken}`,
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(error => console.error(error))
    }

    return { createRecurringSchedule }


}

export default useRecurringSchedule;