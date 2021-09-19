import { Flex, Text, Avatar, Box } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex alignItems="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
        <Text>Guilherme Lima</Text>
        <Text
          color="gray.300"
          fontSize="small"
        >
          guilhermelima18@hotmail.com
        </Text>
      </Box>
      )}
      <Avatar 
        src="https://github.com/guilhermelima18.png" 
        size="md" 
        name="Guilherme Lima" 
      />
    </Flex>
  );
};