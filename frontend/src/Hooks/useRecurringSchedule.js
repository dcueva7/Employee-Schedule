
import Cookies from "js-cookie";

const useRecurringSchedule = () => {

    const authToken = Cookies.get('authToken')

    const createRecurringSchedule = async (weeks, date) => {
        try {
            const response = await fetch('create_recurring_schedule/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Token ${authToken}`,
                },
                body : JSON.stringify({
                    weeks : weeks,
                    date : date
                })
            });

            if(!response.ok){
                throw new Error(`HTTP Error! status: ${response.status}`)    
            }

            const json = await response.json();
            console.log(json);
            
        } catch (error) {
            console.error(error);
        }
    }

    return { createRecurringSchedule }

}

export default useRecurringSchedule;