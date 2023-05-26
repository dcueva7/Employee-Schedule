import { Box, Button, ButtonGroup, Flex, HStack, IconButton } from '@chakra-ui/react';
import {BellIcon} from '@chakra-ui/icons'

import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie'

const Nav = () => {

    const nav = useNavigate()

    return (
    <Box as="nav" p={4} shadow="md" bg="black">
        <Flex align="center" justify="space-between">
        <ButtonGroup variant="link" spacing={4}>
            <Button color="white"onClick={() => nav('/dashboard')}>Dashboard</Button>
            <Button color="white" onClick={() => nav('/')}>Schedule</Button>
        </ButtonGroup>

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