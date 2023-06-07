import { 
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Input,
    DrawerFooter,
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
                size='full'
            >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Settings</DrawerHeader>

                <DrawerBody>
                    <Input placeholder='Type here...' />
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={props.onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='blue'>Save</Button>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
        </>
    )
}



export default Settings