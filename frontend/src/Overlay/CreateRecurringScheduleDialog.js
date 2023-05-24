import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Text,
    FormControl,
    Input,
    FormLabel,
    Box,
} from '@chakra-ui/react'

import { useRef } from 'react';
import useRecurringSchedule from '../Hooks/useRecurringSchedule';

const CreateRecurringScheduleDialog = (props) => {

    

    const cancelRef = useRef()


    return (
        <>
            <AlertDialog
                isOpen={props.recurringDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.alertClose}
            >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Confirm 
                    </AlertDialogHeader>

                    <AlertDialogBody>
                            
                        <Text >Choose a date during the week you want to use as base schedule and number of weeks for schedule to repeat </Text>
                        
                            <Box>
                                <FormControl>
                                    <FormLabel>Date</FormLabel>
                                        <Input type='time' value={props.date} onChange={(e) => props.setDate(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Number of weeks</FormLabel>
                                        <Input type='time' value={props.weeks} onChange={(e) => props.setWeeks(e.target.value)} />
                                </FormControl>
                            </Box>
                        
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={props.alertClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={props.confirm} ml={3}>
                        Confirm
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>


    )
}

export default CreateRecurringScheduleDialog;