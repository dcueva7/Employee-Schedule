import { 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

import { 
   
    useContext,  
} from 'react'

import Nav from './Nav';
import EmployeeShiftContext from '../EmployeeShiftContext';




const Info = () => {


    const { employees } = useContext(EmployeeShiftContext)



    return (
        <>
        <Nav /> 

        <TableContainer>
        <Table variant='striped' colorScheme='gray'>
            <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number </Th>  
            </Tr>
            </Thead>
            <Tbody>
            {employees.map((item) => {

                return(
                <Tr>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.phone}</Td>

                </Tr>)
                
            })}
            </Tbody>
        </Table>
        </TableContainer>

        </>


    )


}

export default Info;