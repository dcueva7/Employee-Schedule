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

const BulkDeleteDialog = (props) => {

    

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
                            
                        <Text fontWeight='bold'>All shifts after date below will be deleted: </Text>
                        
                            <Box>
                                <FormControl>
                                    <FormLabel>Date</FormLabel>
                                        <Input type='date' value={props.date} onChange={(e) => props.setDate(e.target.value)} />
                                </FormControl>
                            </Box>
                        
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={props.alertClose}>
                        Cancel
                    </Button>
                    <Button color='red' onClick={props.confirm} ml={3}>
                        Confirm
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
        </>


    )
}

export default BulkDeleteDialog;