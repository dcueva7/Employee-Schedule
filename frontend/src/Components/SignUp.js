import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [ password, setPassword ] = useState('')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')

    const nav = useNavigate()
    const toast = useToast()

    const createAccount = () => {
        if (!password || !email || !firstName || !lastName){
            toast({
                title: 'Please enter all fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return
        }
    }

    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
                to enjoy all of our cool features ✌️
            </Text>
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                <HStack>
                <Box>
                    <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={firstName} onChange={(e) => {
                        setFirstName(e.target.value)
                    }}/>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={lastName} onChange={(e) => {
                        setLastName(e.target.value)
                    }}/>
                    </FormControl>
                </Box>
                </HStack>
                <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                }}/>
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                    <InputRightElement h={'full'}>
                    <Button
                        variant={'ghost'}
                        onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                    </InputRightElement>
                </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}
                    onClick={createAccount}
                    >
                    Sign up
                </Button>
                </Stack>
                <Stack pt={6}>
                <Text align={'center'}>
                    Already a user? <Link color={'blue.400'} onClick={() => nav('/sign_in')}>Login</Link>
                </Text>
                </Stack>
            </Stack>
            </Box>
        </Stack>
        </Flex>
    );
}

export default SignUp