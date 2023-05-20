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

const Dialog = (props) => {

    const cancelRef = useRef()


    return (
        <>
            <AlertDialog
                isOpen={props.alertDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.alertClose}
            >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Confirm 
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {props.full && <Text>Are you sure you would like to request for coverage for the whole shift?</Text>}
                        {!props.full && 
                            <>
                            <Text>Input detials of adjusted shift on: {props.date}</Text>
                            
                                <Box>
                                    <FormControl>
                                        <FormLabel>Start Time</FormLabel>
                                            <Input type='time' value={props.startTime} onChange={(e) => props.setAlertStartTime(e.target.value)} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>End Time</FormLabel>
                                            <Input type='time' value={props.endTime} onChange={(e) => props.setAlertEndTime(e.target.value)} />
                                    </FormControl>
                                </Box>
                            </>
                        }
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={props.alertClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={props.alertConfirm} ml={3}>
                        Confirm
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>


    )
}

export default Dialog;