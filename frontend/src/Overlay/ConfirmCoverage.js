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

const ConfirmCoverage = (props) => {

    const cancelRef = useRef()

    return (
        <>
            <AlertDialog
                isOpen={props.bulkDeleteDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.alertClose}
            >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Confirm 
                    </AlertDialogHeader>

                    <AlertDialogBody>
                            
                        <Text fontWeight='bold'>Are you sure you want to cover this shift?</Text>
                        
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

export default ConfirmCoverage;