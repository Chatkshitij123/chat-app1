// import React, { useEffect } from 'react'
// import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
// import Login from '../components/Auth/Login';
// import SignUp from '../components/Auth/SignUp';
// import { useHistory } from "react-router-dom";
// //Container is used to keep our content or app responsive in various screen sizes

// const HomePage = () => {

//   //if the user is logged in push it back to the chat page
//   const history = useHistory();
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userInfo"));
//     if(user)
//       history.push("/chats");
    
//   }, [history]);

//   return (
//    <Container maxW='xl'>
//     <Box
//     d="flex"
//     justifyContent="center"
    
//     p={3}
//     bg={"white"}
//     w={"100%"}
//     m="40px 0 15px 0"
//     borderRadius={"lg"}
//     borderWidth={"1px"}
//     >
//       <Text fontSize={"4xl"} fontFamily={"Work sans"} color="black" textAlign={"center"}>
//         Talk-A-Tive
//       </Text>
//     </Box>
//     <Box bg="white"
//     w="100%"
//     p={4}
//     borderRadius={"lg"}
//     borderWidth={"1px"}
//     >
//       <Tabs variant='soft-rounded'>
//   <TabList mb="1em">
//     <Tab width={"50%"}>Login</Tab>
//     <Tab width={"50%"}>Sign Up</Tab>
//   </TabList>
//   <TabPanels>
//     <TabPanel>
//       {/* Login */}
//       <Login/>
//     </TabPanel>
//     <TabPanel>
//       {/* Sign Up */}
//       <SignUp/>
//     </TabPanel>
//   </TabPanels>
// </Tabs>

//     </Box>
//    </Container>
//   )
// }

// export default HomePage
import React, { useEffect } from 'react'
import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import { useNavigate } from "react-router-dom";
//Container is used to keep our content or app responsive in various screen sizes

const HomePage = () => {

  //if the user is logged in push it back to the chat page
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user)
      navigate("/chats");
    
  }, [navigate]);

  return (
    <>
   <Container maxW='xl' centerContent>
    <Box
    d="flex"
    justifyContent="center"
    
    p={3}
    bg={"white"}
    w={"100%"}
    m="40px 0 15px 0"
    borderRadius={"lg"}
    borderWidth={"1px"}
    >
      <Text fontSize={"4xl"} fontFamily={"Work sans"} color="black" textAlign={"center"}>
        Talk-A-Tive
      </Text>
    </Box>
    <Box bg="white"
    w="100%"
    p={4}
    borderRadius={"lg"}
    borderWidth={"1px"}
    >
      <Tabs variant='soft-rounded'>
  <TabList mb="1em">
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      {/* Login */}
      <Login/>
    </TabPanel>
    <TabPanel>
      {/* Sign Up */}
      <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>

    </Box>
   </Container>
   </>
  )
}

export default HomePage
