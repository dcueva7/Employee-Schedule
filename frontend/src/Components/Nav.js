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
    Image, 
    Badge,
    Heading,
    useDisclosure
 } from '@chakra-ui/react';
import {BellIcon, SettingsIcon} from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import EmployeeShiftContext from '../EmployeeShiftContext';
import Settings from './Settings';



import Cookies from 'js-cookie'

const Nav = () => {

    const nav = useNavigate()

    const { openShifts, adjustments, fetchAdjustments, role } = useContext(EmployeeShiftContext)

    //states for Settings drawer
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        fetchAdjustments()
    },[fetchAdjustments])

    let openShiftLength = openShifts.length

    let timeOffRequests = 0

    if (adjustments.length > 0){
        timeOffRequests = adjustments.filter((adjustment) => !adjustment.approved).length
    }

    return (
        <Box as="nav" p={4} shadow="md" bg="white">
            <Settings 
                isOpen={isOpen}
                onClose={onClose}
            />

            <Flex align="center" justify="space-between">
                <Flex align="center" marginRight={12}>
                    <Image src="/logo-viterbi.png" alt="Logo" width='200px' mr={4} />
                    <ButtonGroup variant="link" spacing={4}>
                        <Button color='black' onClick={() => nav('/dashboard')}>Dashboard</Button>
                        <Button color='black' onClick={() => nav('/')}>Schedule</Button>
                    </ButtonGroup>
                </Flex>

                <HStack spacing={4}>
                    <Heading size='sm'>Welcome, Daniel</Heading><IconButton onClick={onOpen} icon={<SettingsIcon />}/>
                    <Popover>
                        <PopoverTrigger>
                            <IconButton icon={<BellIcon/>} />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Nofication:</PopoverHeader>
                            {!role && 
                                <PopoverBody>{openShiftLength} shift(s) available for coverage</PopoverBody>
                            }
                            {role && 
                                <PopoverBody>{timeOffRequests} time-off requests </PopoverBody>
                            }
                        </PopoverContent>
                    </Popover>
                    {!role && openShiftLength > 0 && 
                        <Badge position="absolute" right="119" top="3" borderRadius="full" px="2">
                            {openShiftLength}
                        </Badge>
                    }
                    {role && timeOffRequests > 0 && 
                        <Badge position="absolute" right="119" top="3" borderRadius="full" px="2">
                            {timeOffRequests}
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