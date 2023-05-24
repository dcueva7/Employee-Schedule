
import Cookies from "js-cookie";




const useRecurringSchedule = () => {

    const authToken = Cookies.get('authToken')

    const createRecurringSchedule = async () => {
        try {
            const response = await fetch('create_recurring_schedule/', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Token ${authToken}`,
                }
            });
            const json = await response.json();
            console.log(json);
            
        } catch (error) {
            console.error(error);
        }
    }

    return { createRecurringSchedule }


}

export default useRecurringSchedule;