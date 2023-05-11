import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';

  import Nav from './Nav';
  import * as Icons from 'react-icons/fc';
  
  const Card = (props) => {
    const Icon = Icons[props.icon];
    return (
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}>
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}>
            <Icon size="32" />
          </Flex>
          <Box mt={2}>
            <Heading size="md">{props.heading}</Heading>
            <Text mt={1} fontSize={'sm'}>
              {props.description}
            </Text>
          </Box>
          <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            Learn more
          </Button>
        </Stack>
      </Box>
    );
  };
  
const Dashboard = () => {
    return (
        <>
        <Nav />
        <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
            <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
                Welcome to the Employee Dashboard
            </Heading>
            <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
                obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
            </Text>
        </Stack>

        <Container maxW={'5xl'} mt={12}>
            <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
                heading={'Total Hours'}
                icon={'FcAssistant'}
                description={
                'Here are the number of hours you are scheduled for this week: '
                }
            />
            <Card
                heading={'Schedule for today: [Insert Date]'}
                icon={'FcCollaboration'}
                description={
                'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                }
            />
            <Card
                heading={'Shifts available for coverage: '}
                icon={'FcDonate'}
                description={
                'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                }
            />
            <Card
                heading={'Time Off Requests'}
                icon={'FcManager'}
                description={
                'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                }
            />
            <Card
                heading={'Heading'}
                icon={'FcAbout'}
                description={
                'Lorem ipsum dolor sit amet catetur, adipisicing elit.'
                }
            />
            </Flex>
        </Container>
        </Box>
        </>
    );
  }
  
export default Dashboard;
  