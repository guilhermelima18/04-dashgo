import { Flex, Text, Input, Icon, HStack, Box, Avatar } from '@chakra-ui/react';
import { RiNotificationLine, RiSearch2Line, RiUserAddLine } from 'react-icons/ri';

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxW="1480"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      alignItems="center"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        dashgo
        <Text as="span" color="pink.500" ml="1">.</Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxW={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: "gray.400" }}
        />
        <Icon 
          as={RiSearch2Line} 
          fontSize="20" 
        />
      </Flex>
    
      <Flex
        alignItems="center"
        ml="auto"
      >
        <HStack 
          spacing="4" 
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} />
          <Icon as={RiUserAddLine} />
        </HStack>
        <Flex alignItems="center">
          <Box mr="4" textAlign="right">
            <Text>Guilherme Lima</Text>
            <Text
              color="gray.300"
              fontSize="small"
            >
              guilhermelima18@hotmail.com
            </Text>
          </Box>

          <Avatar 
            src="https://github.com/guilhermelima18.png" 
            size="md" 
            name="Guilherme Lima" 
          />
        </Flex>
      </Flex>
    </Flex>
  );
};