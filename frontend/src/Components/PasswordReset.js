import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    
} from '@chakra-ui/react';
import { useState } from 'react';

const PasswordReset = () => {

    const [ newPass, setNewPass ] = useState('')
    const [ confirmPass, setConfirmPass ] = useState('')

    return (
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Reset Password</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                  <FormControl id="newpass">
                    <FormLabel>New Password</FormLabel>
                    <Input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)}/>
                  </FormControl>
                  <FormControl id="confirm">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
                  </FormControl>
                  <Stack spacing={10}>
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
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
}

export default PasswordReset;