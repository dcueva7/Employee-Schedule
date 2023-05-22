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

const ReviewRequestDialog = (props) => {

    const cancelRef = useRef()


    return (
        <>
            <AlertDialog
                isOpen={props.isOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.closeRequestDialog}
            >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Confirm 
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {props.full && <Text>Approve request for entire shift off on {props.date}?</Text>}
                        {!props.full && 
                            <>
                            <Text>Input new times for shift on: {props.date}</Text>
                            
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
                    <Button ref={cancelRef} onClick={props.closeRequestDialog}>
                        Cancel
                    </Button>
                    <Button onClick={props.approveRequest} ml={3}>
                        Approve
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>


    )
}

export default ReviewRequestDialog;

