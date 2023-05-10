import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Flex,
    HStack,
} from '@chakra-ui/react'

const Nav = () => {
   
    return (
        <Box as="section" pb={{ base: '12', md: '24' }}>
            <Box as="nav" bg="bg-surface" boxShadow="sm">
                <Container py={{ base: '4', lg: '5' }}>
                <Flex justify="space-between">
                    <Flex justify="space-between" width="100%">
                        <ButtonGroup variant="link" spacing="8">
                            {['Product', 'Pricing', 'Resources', 'Support'].map((item) => (
                            <Button key={item}>{item}</Button>
                            ))}
                        </ButtonGroup>
                        <HStack spacing="3">
                            <Button variant="ghost">Sign in</Button>
                            <Button variant="primary">Sign up</Button>
                        </HStack>
                    </Flex>
                </Flex>
                </Container>
            </Box>
        </Box>
    )
}

export default Nav