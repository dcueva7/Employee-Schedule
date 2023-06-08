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
    HStack
 } from "@chakra-ui/react"
import { useState } from "react"


const Settings = (props) => {

    const [ currentPass, setCurrentPass ] = useState('')
    const [ newPass, setNewPass ] = useState('')
    const [ passReType, setPassReType ] = useState('')
    const [ color, setColor ] = useState('')
    const [ username, setUsername ] = useState('')

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
                <DrawerHeader>Settings</DrawerHeader>

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
                            <Button>Submit</Button>
                        </HStack>
                    </Box>

                    <Box mb={5}>
                        <Heading mb={5} mt={5} size='md'>Change Username</Heading>
                        <FormControl id="username">
                            <FormLabel>New Username</FormLabel>
                                <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <HStack mt={3} justifyContent='right'>
                            <Button>Submit</Button>
                        </HStack>
                    </Box>

                    <Box>
                        <Heading mb={5} mt={5} size='md'>Set Color</Heading>
                        <FormControl id="username">
                            <FormLabel>Color</FormLabel>
                                <Input type='text' value={color} onChange={(e) => setColor(e.target.value)} />
                        </FormControl>
                        <HStack mt={3} justifyContent='right'>
                            <Button>Submit</Button>
                        </HStack>
                    </Box>
                </DrawerBody>


            </DrawerContent>
            </Drawer>
        </>
    )
}



export default Settings