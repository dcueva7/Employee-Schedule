import { Box, Button, ButtonGroup, Flex, HStack, IconButton } from '@chakra-ui/react';
import {BellIcon} from '@chakra-ui/icons'

const Nav = () => {
  return (
    <Box as="nav" p={4} shadow="md" bg="bg-surface">
      <Flex align="center" justify="space-between">
        <ButtonGroup variant="link" spacing={4}>
        {['Dashboard', 'Schedule', 'Notifications', 'Profile'].map((item) => (
            <Button key={item}>{item}</Button>
        ))}
        </ButtonGroup>

        <HStack spacing={4}>
          <IconButton icon={<BellIcon/>}/>
          <Button variant="ghost">Sign in</Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Nav;