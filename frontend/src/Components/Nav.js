import { Box, Button, ButtonGroup, Flex, HStack, IconButton } from '@chakra-ui/react';
import {BellIcon} from '@chakra-ui/icons'
import { Image } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';


import Cookies from 'js-cookie'

const Nav = () => {

    const nav = useNavigate()

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
                <IconButton icon={<BellIcon/>} />
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