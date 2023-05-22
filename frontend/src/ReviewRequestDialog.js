import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Text,
    Box,
    Center,
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
                            <Text>Details for adjustment request: {props.date}</Text>
                            
                                <Center>
                                    <Box>
                                        <ul>
                                            <li>Adjusted start time: {props.start}</li>
                                            <li>Adjusted end time: {props.end}</li>
                                        </ul>
                                    </Box>
                                </Center>
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

