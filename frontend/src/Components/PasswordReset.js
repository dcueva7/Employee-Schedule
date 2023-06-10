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
    useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../apiConfig';

const PasswordReset = () => {

    const toast = useToast()
    const nav = useNavigate()

    const [ newPass, setNewPass ] = useState('')
    const [ confirmPass, setConfirmPass ] = useState('')

    let { uid, token } = useParams()

    const confirmReset = () => {
      if(!newPass || !confirmPass){
        toast({
          title: 'Please enter all fields',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return
      }

      if(newPass !== confirmPass){
        toast({
          title: 'Passwords do not match',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        return
      }

      fetch(`${BASE_URL}/auth/users/reset_password_confirm/`, {
          method : 'POST',
          headers : {
              'Content-type' : 'application/json'
          },
          body : JSON.stringify({
              uid : uid,
              token : token,
              new_password : newPass,
              re_new_password : confirmPass
          }) 
      })
          .then(response => {
              if(!response.ok){
                  return response.json().then(error => {
                    toast({
                      title: 'Error resetting password',
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    })
                    throw new Error(error)
                  })
              }
              else{
                toast({
                  title: 'Password reset succesfully',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
                nav('/sign_in')
              }
          }).catch(error => console.log(error))
    }

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
                        onClick={confirmReset}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                    >
                      Submit
                    </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      );
}

export default PasswordReset;