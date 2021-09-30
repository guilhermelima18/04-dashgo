import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination/index";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(page);

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" maxW={1480} my="6" mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          {isLoading ? (
            <Flex justifyContent="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justifyContent="center">
              <Text>Ocorreu um erro ao carregar os dados.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8">Ação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(({ id, name, email, createdAt }) => (
                    <Tr key={id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link onMouseEnter={() => handlePrefetchUser(id)}>
                            <Text fontWeight="bold">{name}</Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{createdAt}</Td>}
                      <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        >
                          {isWideVersion ? "Editar" : ""}
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
