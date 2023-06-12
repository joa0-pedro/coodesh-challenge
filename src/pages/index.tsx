import { Box, Center, Text } from "@chakra-ui/react";
import { Email } from "../components/Email";
import { MailBox } from "../components/Mailbox";

export function Index() {
  return (
    <Box bgColor={"white"}>
      <Center>
        <Text
          fontSize={"5xl"}
          fontWeight={"bold"}
          fontFamily={"sans-serif"}
          color={"gray.900"}
        >
          DropMail.me
        </Text>
      </Center>
      <Box border={"2px"} borderRadius={8} h={"54rem"} mx={"0.8rem"}>
        <Email />
        <MailBox />
      </Box>
    </Box>
  );
}
