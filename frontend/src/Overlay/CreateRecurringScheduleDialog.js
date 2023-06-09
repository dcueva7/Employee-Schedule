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
                            
                        <Text fontWeight='bold'>Choose date and number of weeks to repeat: </Text>
                        
                            <Box>
                                <FormControl>
                                    <FormLabel>Date</FormLabel>
                                        <Input type='date' value={props.date} onChange={(e) => props.setDate(e.target.value)} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Number of weeks</FormLabel>
                                        <Input type='text' value={props.weeks} onChange={(e) => props.setWeeks(e.target.value)} />
                                </FormControl>
                            </Box>
                        
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={props.alertClose}>
                        Cancel
                    </Button>
                    <Button onClick={props.confirm} ml={3}>
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