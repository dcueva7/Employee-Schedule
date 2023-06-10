import { 
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Input,
    FormControl,
    FormLabel,
    Heading,
    Box,
    HStack,
    useToast
 } from "@chakra-ui/react"
import { useState, useContext } from "react"
import useAuth from "../Hooks/UseAuth";
import EmployeeShiftContext from "../EmployeeShiftContext";
import { BASE_URL } from "../apiConfig";


const Settings = (props) => {

    const authToken = useAuth();

    const [ currentPass, setCurrentPass ] = useState('')
    const [ newPass, setNewPass ] = useState('')
    const [ passReType, setPassReType ] = useState('')
    const [ color, setColor ] = useState('')
    const [ username, setUsername ] = useState('')

    const { fetchShift } = useContext(EmployeeShiftContext)

    const toast = useToast()

    const resetPassword = async () => {
        if(!currentPass || !newPass || !passReType){
            toast({
                title: 'Please enter all fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return
        }
        if(newPass !== passReType){
            toast({
                title: 'Passwords do not match',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return
        }

        try{
            const reset = await fetch(`${BASE_URL}/auth/users/set_password/`, {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body : JSON.stringify({
                    new_password : newPass,
                    current_password : currentPass
                })
            })

            if(!reset.ok){
                toast({
                    title: 'Error changing password',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                  throw new Error('Error changing password')
            }
            else{
                toast({
                    title: 'Password Changed',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
                setCurrentPass('')
                setNewPass('')
                setPassReType('')
            }
        } catch (error) {
            console.log(error)
        }

    }

    const changeUsername = async () => {
        if(!username){
            toast({
                title: 'Please enter all fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return
        }

        try {
            const response = await fetch(`${BASE_URL}/change_username/`, {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body : JSON.stringify({username : username})
            })
            if(!response.ok){
                toast({
                    title: 'Invalid username',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                throw new Error('invalid username')
            }
            else{
                toast({
                    title: `Username changed to ${username}`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setUsername('')

            }  
        } catch (error) {
            console.log(error)
        }

    }

    const changeColor = async () => {
        if(!color){
            toast({
                title: 'Please enter a color',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            return
        }
        try{
            const response = await fetch(`${BASE_URL}/change_employee_color/`, {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body : JSON.stringify({color : color})
            })

            if(!response.ok){
                toast({
                    title: 'Error changing color',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                throw new Error('Error changing color')
            }
            else{
                const json = await response.json()
                console.log(json, "color changed succesfully")        
                fetchShift()
                toast({
                    title: 'Color changed succesfully'  ,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setColor('')
            }
        } catch (error){
            console.log(error)
        }
    }

    return (
        <>
            <Drawer
                isOpen={props.isOpen}
                placement='right'
                onClose={props.onClose}
                size='md'
            >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader size='lg'>Settings</DrawerHeader>

                <DrawerBody>
                    <Box mb={5}>
                        <Heading mb={5} size='md'>Reset Password</Heading>
                        <FormControl id="currpass">
                            <FormLabel>Current Password</FormLabel>
                                <Input type='password' value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
                        </FormControl>
                        <FormControl id="newpass">
                            <FormLabel>New Password</FormLabel>
                                <Input type='password' value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                        </FormControl>
                        <FormControl id="retype">
                            <FormLabel>Confirm New Password</FormLabel>
                                <Input type='password' value={passReType} onChange={(e) => setPassReType(e.target.value)} />
                        </FormControl>
                        <HStack mt={3} justifyContent='right'>
                            <Button onClick={() => {
                                setCurrentPass('')
                                setNewPass('')
                                setPassReType('')
                            }}>
                                Clear
                            </Button>
                            <Button onClick={resetPassword}>Submit</Button>
                        </HStack>
                    </Box>

                    <Box mb={5}>
                        <Heading mb={5} mt={5} size='md'>Change Username</Heading>
                        <FormControl id="username">
                            <FormLabel>New Username</FormLabel>
                                <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <HStack mt={3} justifyContent='right'>
                            <Button onClick={changeUsername}>Submit</Button>
                        </HStack>
                    </Box>

                    <Box>
                        <Heading mb={5} mt={5} size='md'>Set Color</Heading>
                        <FormControl id="color">
                            <FormLabel>Color</FormLabel>
                                <Input type='text' value={color} onChange={(e) => setColor(e.target.value)} />
                        </FormControl>
                        <HStack mt={3} justifyContent='right'>
                            <Button onClick={changeColor}>Submit</Button>
                        </HStack>
                    </Box>
                </DrawerBody>


            </DrawerContent>
            </Drawer>
        </>
    )
}



export default Settings