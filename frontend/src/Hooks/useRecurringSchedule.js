
import Cookies from "js-cookie";
import { useToast } from '@chakra-ui/react';

const useRecurringSchedule = () => {

    const toast = useToast()
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
            toast({
                title: 'Recurring Schedule Created',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            console.log(json, 'Created recurring shifts');
            
        } catch (error) {
            console.error(error);
        }
    }

    return { createRecurringSchedule }

}

export default useRecurringSchedule;