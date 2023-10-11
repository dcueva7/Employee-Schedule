import { 
    Container, 
    Box, 
    Button, 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    Select, 
    ModalBody, 
    Input, 
    FormControl, 
    FormLabel,
    Text,
    Flex,
    useToast,
    Spinner
} from '@chakra-ui/react';
import { BASE_URL } from '../apiConfig';

import { 
    useEffect, 
    useState, 
    useContext,  
} from 'react'

import Nav from './Nav';

import useAuth from '../Hooks/UseAuth';
import EmployeeShiftContext from '../EmployeeShiftContext';
import useUserId from '../Hooks/useUserId';



const Info = () => {


    const { employees, setEmployees} = useContext(EmployeeShiftContext)



    return (
        <Nav /> 


    )


}

export default Info;