import { 
    Box, 
    Button, 
    ButtonGroup, 
    Flex, 
    HStack, 
    IconButton, 
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
 } from '@chakra-ui/react';
import {BellIcon} from '@chakra-ui/icons'
import { Image, Badge } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import EmployeeShiftContext from '../EmployeeShiftContext';



import Cookies from 'js-cookie'

const Nav = () => {

    const nav = useNavigate()

    const { openShifts, adjustments } = useContext(EmployeeShiftContext)

    return (
        
    <Box as="nav" p={4} shadow="md" bg="white">
        <Flex align="center" justify="space-between">
            <Flex align="center" marginRight={12}>
                <Image src="/logo-viterbi.png" alt="Logo" width='200px' mr={4} />
                <ButtonGroup variant="link" spacing={4}>
                    <Button color='black' onClick={() => nav('/dashboard')}>Dashboard</Button>
                    <Button color='black' onClick={() => nav('/')}>Schedule</Button>
                    <Button color='black'>Availability</Button>
                </ButtonGroup>
            </Flex>

            <HStack spacing={4}>
                <Popover>
                    <PopoverTrigger>
                        <IconButton icon={<BellIcon/>} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Nofication:</PopoverHeader>
                        <PopoverBody>{openShifts.length} shift(s) available for coverage</PopoverBody>
                    </PopoverContent>
                </Popover>
                {openShifts.length > 0 && 
                    <Badge position="absolute" right="119" top="3" borderRadius="full" px="2">
                        {openShifts.length}
                    </Badge>
                }
                <Button onClick={() => {
                    Cookies.remove("authToken");
                    nav('/sign_in');
                }}>Log Out</Button>
            </HStack>
        </Flex>
    </Box>
    );
};

export default Nav;