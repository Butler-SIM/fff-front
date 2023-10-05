//MyPage.tsx

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react';
import { UserInfo, getUserInfoByToken } from '../../lib/api/accounts/userApi';

export default function MyPage() {

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        getUserInfoByToken().then(({ res }) => {
            if (res?.status === 200) {
                setUserInfo(res.data);
            }
        });
    }, []);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={userInfo?.profile_image || "public/no_profile.png"}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">프로필 이미지 변경</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>닉네임</FormLabel>
          <Input
            isDisabled
            value={userInfo?.nickname || ''}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        {/* <FormControl id="email" isRequired>
          <FormLabel>이메일</FormLabel>
          <Input
          isDisabled
          value={userInfo?.email || ''}
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl> */}
        {/* <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl> */}
        <Stack spacing={6} direction={['column', 'row']}>
          {/* <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button> */}
        </Stack>
      </Stack>
    </Flex>
  )
}