import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Textarea,
  Button,
  useColorModeValue,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Badge,
  useClipboard,
  useColorMode,
} from "@chakra-ui/react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { motion } from "framer-motion";
import {
  Send,
  ChevronDown,
  Moon,
  Sun,
  RefreshCw,
  Copy,
  Edit,
} from "lucide-react";
import { getEmail } from "../AI/ai";
import Markdown from "markdown-to-jsx";
import "../styles/emailWriter.css";
import { Mic, MicOff } from "lucide-react";
const MotionBox = motion(Box);
const badgeStyle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '100%', // Ensure it doesn't exceed the container's width
};
export default function EmailWriter() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    setEmailContent(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    setEmailContent("Browser doesn't support speech recognition");
  }
  const [emailContent, setEmailContent] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [latestResponse, setLatestResponse] = useState("");
  const toast = useToast();
  const [toastShown, setToastShown] = useState(false);
  const responseRef = useRef(null);
  const { onCopy } = useClipboard(latestResponse);
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.900", "gray.100");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const accentColor = useColorModeValue("teal.500", "cyan.300");
  const boxBg = useColorModeValue("white", "gray.700");
  const buttonColorScheme = useColorModeValue("blue.500", "purple.500");
  const buttonTextColor = useColorModeValue("black", "white");

  const handleEmailChange = (e) => setEmailContent(e.target.value);
  const handleActionChange = (e) => setAction(e.target.value);

  const addMessage = (message, sender, actionUsed) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender, action: actionUsed },
    ]);
    if (sender === "ai") {
      setLatestResponse(message);
    }
  };

  const handleSubmit = () => {
    if (emailContent.length == 0) {
      toast({
        title: "Error",
        description: "Please fill the textarea",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (action.length == 0) {
      toast({
        title: "Error",
        description: "Please select or write an action",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else if (emailContent.trim() !== "" && action.trim() !== "") {
      addMessage(emailContent, "user", action);
      setLoading(true);
      getEmail(
        emailContent,
        (message) => addMessage(message, "ai", action),
        action,
        setLoading
      );
    } else {
      toast({
        title: "Error",
        description: "Something went wrong! refresh the page",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleActionSelect = (selectedAction) => setAction(selectedAction);

  const resetForm = () => {
    setEmailContent("");
    setAction("");
    setMessages([]);
    setLatestResponse("");
  };

  const copyToClipboard = () => {
    onCopy();
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const modifyFurther = () => {
    setEmailContent(latestResponse);
    responseRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const glassStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    _hover: {
      background: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
    },
  };
  useEffect(() => {
    if (listening && transcript.length === 0 && !toastShown) {
      toast({
        title: "Listening",
        description: "Waiting for response...",
        status: "info",
        duration: 2000,
      });
      setToastShown(true);
    } else if (!listening || transcript.length > 0) {
      setToastShown(false);
    }
  }, [listening, transcript, toast, toastShown]);
  return (
    <Box id="main" minH="100vh" bg={bg} color={color}>
      <Flex direction="column" h="100vh">
        <Flex
          id="heading"
          align="center"
          justify="space-between"
          p={4}
          bg={accentColor}
          color={color}
          {...glassStyle}
        >
          <Heading size="lg" fontSize={{ base: "xl", md: "2xl" }}>
            AI Communication Assistant
          </Heading>
          <IconButton
          id="Buttons"
            icon={colorMode === "light" ? <Moon /> : <Sun />}
            onClick={toggleColorMode}
            variant="ghost"
           color={colorMode === "dark" ? "white" : "black"}
            bg={buttonColorScheme}
            _hover={{ bg: "whiteAlpha.200" }}
          />
        </Flex>
        <Flex
          flex={1}
          p={4}
          overflow="hidden"
          direction={{ base: "column", md: "row" }}
        >
          <VStack
            spacing={4}
            align="stretch"
            w={{ base: "100%", md: "50%" }}
            pr={{ base: 0, md: 2 }}
            mb={{ base: 4, md: 0 }}
          >
            <Textarea
              ref={responseRef}
              value={emailContent}
              onChange={handleEmailChange}
              placeholder="Enter your message or email content here..."
              size="md"
              resize="none"
              bg={boxBg}
              borderColor={accentColor}
              _focus={{
                borderColor: accentColor,
                boxShadow: `0 0 0 1px ${accentColor}`,
              }}
              flex={1}
              minH={{ base: "150px", md: "200px" }}
              {...glassStyle}
            />
            <Flex flexWrap="wrap" justifyContent="space-between">
              <Popover>
                <PopoverTrigger>
                  <Button
                  id="Buttons"
                 color={colorMode === "dark" ? "white" : "black"}
                    size="md"
                    mb={{ base: 2, md: 0 }}
                    rightIcon={<ChevronDown />}
                    {...glassStyle}
                  >
                    Choose Action
                  </Button>
                </PopoverTrigger>
                <PopoverContent {...glassStyle}>
                  <PopoverBody>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDown />}
                        w="100%"
                        colorScheme={buttonColorScheme}
                        {...glassStyle}
                      >
                        Predefined Actions
                      </MenuButton>
                      <MenuList {...glassStyle}>
                        <MenuItem
                          marginBottom="10px"
                          onClick={() =>
                            handleActionSelect(
                              "Summarize this email or message"
                            )
                          }
                          _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                        >
                          Summarize
                        </MenuItem>
                        <MenuItem
                          marginBottom="10px"
                          onClick={() => handleActionSelect("Reply this email")}
                          _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                        >
                          Reply
                        </MenuItem>
                        <MenuItem
                          marginBottom="10px"
                          onClick={() => handleActionSelect("Write this email")}
                          _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                        >
                          Write an Email
                        </MenuItem>
                        <MenuItem
                          marginBottom="10px"
                          onClick={() => handleActionSelect("Write a message")}
                          _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                        >
                          Write a Message
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <Textarea
  value={action}
  onChange={handleActionChange}
  placeholder="Or describe what you want to do..."
  size="sm"
  resize="vertical"
  bg={boxBg} // Use boxBg for consistent background color
  borderColor={accentColor} // Use accentColor for consistent border color
  _focus={{
    borderColor: accentColor,
    boxShadow: `0 0 0 1px ${accentColor}`,
  }}
  h="100px"
  mt={4}
  required
  {...glassStyle}
/>
                  </PopoverBody>
                </PopoverContent>
              </Popover>  

              <IconButton
              id="buttons"
             color={colorMode === "dark" ? "white" : "black"}
                icon={listening ? <Mic /> : <MicOff />}
                onClick={
                  listening
                    ? SpeechRecognition.stopListening
                    : SpeechRecognition.startListening
                }
              />
              {/* <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button> */}

              <Button
              id="Buttons"
                onClick={handleSubmit}
                leftIcon={<Send />}
                color={buttonColorScheme}
                size="md"
                bg={buttonColorScheme}
                isLoading={loading}
                loadingText="Processing..."
                mb={{ base: 2, md: 0 }}
                {...glassStyle}
              >
                Submit
              </Button>
              <IconButton
            id="Buttons"
                icon={<RefreshCw />}
                onClick={resetForm}
               color={colorMode === "dark" ? "white" : "black"}
                bg={buttonColorScheme}
                variant="ghost"
                size="md"
                {...glassStyle}
              />
            </Flex>
          </VStack>
          <Box
            w={{ base: "100%", md: "50%" }}
            pl={{ base: 0, md: 2 }}
            overflowY="auto"
          >
            <VStack spacing={4} align="stretch">
              {messages.map((message, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  bg={message.sender === "user" ? accentColor : boxBg}
                  color={message.sender === "user" ? textColor : color}
                  p={3}
                  borderRadius="md"
                  boxShadow="md"
                  {...glassStyle}
                >
                  {message.sender === "user" ? (
                    <Text>👤 {message.text}</Text>
                  ) : (
                    <VStack align="stretch" spacing={2}>
                      <Flex justify="space-between" align="center">
                        <Badge style={badgeStyle} colorScheme={buttonColorScheme} {...glassStyle}>
                          🤖 {message.action}
                        </Badge>
                        <Flex>
                          <IconButton
                          id="Buttons"
                            icon={<Copy />}
                            onClick={copyToClipboard}
                            size="sm"
                           color={colorMode === "dark" ? "white" : "black"}
                            variant="ghost"
                            mr={2}
                            {...glassStyle}
                          />
                          <IconButton
                            icon={<Edit />}
                            onClick={modifyFurther}
                            size="sm"
                           color={colorMode === "dark" ? "white" : "black"}
                            bg={buttonColorScheme}
                            variant="ghost"
                            {...glassStyle}
                          />
                        </Flex>
                      </Flex>
                      <Markdown options={{ wrapper: "div" }}>
                        {message.text}
                      </Markdown>
                    </VStack>
                  )}
                </MotionBox>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
