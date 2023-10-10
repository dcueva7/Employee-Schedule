
import Cookies from "js-cookie";
import { useToast } from '@chakra-ui/react';
import { BASE_URL } from "../apiConfig";

const useRecurringSchedule = () => {

    const toast = useToast()
    const authToken = Cookies.get('authToken')

    const createRecurringSchedule = async (weeks, date, department) => {

        let url = `${BASE_URL}/create_recurring_schedule/`

        if (department){
            url += `?department=${department}`
        }

        try {
            const response = await fetch(url, {
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

            toast({
                title: 'Recurring Schedule Created',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            
            
        } catch (error) {
            console.error(error);
        }
    }

    return { createRecurringSchedule }

}

export default useRecurringSchedule;