import { Box } from '@chakra-ui/react'
import React from 'react'
import { useChatState } from '../../Context/ChatProvider'
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const { selectedChat} = useChatState();
  return (
    <Box
    display={{ base: selectedChat ? "flex" : "none", md: "flex"}}
    alignItems={"center"}
    flexDir={"column"}
    p={3}
    bg="white"
    w={{base: "100%", md: "68%"}}
    borderRadius="lg"
    borderWidth="1px">
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      {/* //When we leave the group this list has to be updated somehow write that code in chatPage.js */}
    </Box>
  )
}

export default ChatBox
