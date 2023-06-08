import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    useDisclosure
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie'
  
const SignIn = () => {

    const nav = useNavigate()

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    const [ email, setEmail ] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleLogin = (e) => {
      e.preventDefault()

      fetch('/auth/token/login/', {
          method : 'POST',
          headers : {
              'Content-type' : 'application/json'
          },
          body : JSON.stringify({ password : password, username : username})
          
      })
          .then(response => {
              if(!response.ok){
                  setError("Invalid Credentials!")
                  throw new Error("Invalid Credentials!");
              }
                return response.json()
          })
          .then(json => {
              Cookies.set("authToken", json.auth_token, { expires: 7 });
              nav('/');
          }).catch(error => console.log(error.message))
    }

    const passwordReset = () => {
      onClose()
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              or create an account here <Link color={'blue.400'} onClick={() => nav('/sign_up')}>Sign-up</Link> 
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleLogin}>
                {error && 
                    <Alert status="error">
                        <AlertIcon />
                            {error}
                    </Alert>}
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Popover
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      closeOnBlur={false}
                    >
                      <PopoverTrigger>
                        <Link color={'blue.400'}>Forgot password?</Link>
                      </PopoverTrigger>
                      <PopoverContent p={5}>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverHeader>Enter Email</PopoverHeader>
                          <PopoverBody>
                          <FormControl id="resetemail">
                            <FormLabel>Email</FormLabel>
                              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </FormControl>
                            <Stack mt={5}>
                              <Button onClick={passwordReset}>Submit</Button>
                            </Stack>
                          </PopoverBody>
                      </PopoverContent>
                    </Popover>  
                  </Stack>
                  <Button
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign in
                  </Button>
              
              </Stack>
            </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}

export default SignIn