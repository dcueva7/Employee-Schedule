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
                isOpen={props.confirmCoverageDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={props.closeConfirmCoverageDialog}
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
                    <Button ref={cancelRef} color='red' onClick={props.closeConfirmCoverageDialog}>
                        Cancel
                    </Button>
                    <Button color='blue' onClick={props.confirmShiftCoverage} ml={3}>
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