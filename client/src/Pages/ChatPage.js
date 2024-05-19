// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

import { Box } from "@chakra-ui/react";
import { useChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatBox from "../components/miscellaneous/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  // const [chats, setChats] = useState([]); // Ensure chats is initialized as an array
  // const [loading, setLoading] = useState(true);

  // const fetchChats = async () => {
  //   try {
  //     const response = await axios.get('/api/chat');
  //     const data = response.data; // Assuming the array is directly in response.data
  //     console.log('Data from API:', data); // Log the data to check its structure
  //     setChats(data);
  //   } catch (error) {
  //     console.error('Error fetching chats:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  // // Add a guard clause to check if chats is undefined before mapping
  // if (loading || chats === undefined) {
  //   return <p>Loading...</p>;
  // }
  //we are importing  something useContext
  const {user} = useChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <>
    <div style={{width: "100%"}}>
      {/* {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))} */}

      {/* //if the user in the app only then render this sideDrawer component */}
      {user && <SideDrawer/>}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
</div>
    </>
  );
};

export default ChatPage;
