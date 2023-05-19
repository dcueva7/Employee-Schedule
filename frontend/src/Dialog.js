import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Text,
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
                        Delete Customer
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {props.full && <Text>Are you sure you would like to request for coverage for the whole shift?</Text>}
                        {!props.full }
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