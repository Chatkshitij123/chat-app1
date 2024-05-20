// import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
// import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
// // import React, { useState } from 'react'
// import { ChatState } from '../../Context/ChatProvider';
// import ProfileModal from './ProfileModal';

// const SideDrawer = () => {
//     // const [search, setSearch] = useState("");
//     // const [searchResult, setSearchResult] = useState([]);
//     // const [loading, setLoading] = useState(false);
//     // const [loadingChat, setLoadingChat] = useState();
//     const {user} = ChatState();
//   return (
//    <Box
//     display={"flex"}
//     justifyContent={"space-between"}
//     alignItems={"center"}
//     bg={"white"}
//     w="100%"
//     p="5px 10px 5px 10px"
//     borderWidth={"5px"}>
//     <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
//         <Button variant= 'ghost'>
//         <i class="fas fa-search"></i>
//         <Text d={{ base: "none", md: "flex" }} px={"4"}>Search User</Text>
//         </Button>
//     </Tooltip>
//     <Text fontSize={"2xl"} fontFamily={"Work sans"}>Talk-A-Tive</Text>
//     <div>
//         <Menu>
//             <MenuButton p={1}>
//                 <BellIcon fontSize={"2xl"} m={1} />
//             </MenuButton>
//             {/* <MenuList></MenuList> */}
//         </Menu>
//         <Menu>
//             <MenuButton as={Button} right={<ChevronDownIcon/>}>
//                <Avatar size={"sm"} cursor="pointer" name={user.name} src={user.pic}/>
//                {/* //we show name if in case our photo is not showing */}
//             </MenuButton>
//             <MenuList>
//                 <ProfileModal>

//                 <MenuItem>My Profile</MenuItem>
//                 </ProfileModal>
//                 <MenuDivider/>
//                 <MenuItem>Logout</MenuItem>
//             </MenuList>

//         </Menu>
//     </div>
//    </Box>
//   )
// }

// export default SideDrawer
// import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
// import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
// // import React, { useState } from 'react'
// import {useChatState } from '../../Context/ChatProvider';
// import ProfileModal from './ProfileModal';

// const SideDrawer = () => {
//     // const [search, setSearch] = useState("");
//     // const [searchResult, setSearchResult] = useState([]);
//     // const [loading, setLoading] = useState(false);
//     // const [loadingChat, setLoadingChat] = useState();
//     const {user} = useChatState();
//   return (
//     <>
//    <Box
//     display={"flex"}
//     justifyContent={"space-between"}
//     alignItems={"center"}
//     bg={"white"}
//     w="100%"
//     p="5px 10px 5px 10px"
//     borderWidth={"5px"}>
//     <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
//         <Button variant= 'ghost'>
//         <i class="fas fa-search"></i>
//         <Text d={{ base: "none", md: "flex" }} px={"4"}>Search User</Text>
//         </Button>
//     </Tooltip>
//     <Text fontSize={"2xl"} fontFamily={"Work sans"}>Talk-A-Tive</Text>
//     <div>
//         <Menu>
//             <MenuButton p={1}>
//                 <BellIcon fontSize={"2xl"} m={1} />
//             </MenuButton>
//             {/* <MenuList></MenuList> */}
//         </Menu>
//         <Menu>
//             <MenuButton as={Button} right={<ChevronDownIcon/>}>
//                <Avatar size={"sm"} cursor="pointer" name={user.name} src={user.pic}/>
//                {/* //we show name if in case our photo is not showing */}
//             </MenuButton>
//             <MenuList>
//                 <ProfileModal>

//                 <MenuItem>My Profile</MenuItem>
//                 </ProfileModal>
//                 <MenuDivider/>
//                 <MenuItem>Logout</MenuItem>
//             </MenuList>

//         </Menu>
//     </div>
//    </Box>
//    </>
//   )
// }

// export default SideDrawer
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
// import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
// import { getSender } from "../../config/ChatLogics";

import { useChatState } from "../../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

import { getSender } from "../../config/ChatLogics";
// import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = useChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      // we are going to make the jwt token
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/chat`, { userId }, config);
      // here from this line we are getting the new chat
      // but what if the chat exists in the chat list in my chats we are going to append it

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                {/* //supply user from here */}
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
