import { Box, Icon, Text } from "@chakra-ui/react";
import { ArrowClockwise } from "@phosphor-icons/react";
import { EmailCard } from "./EmailCard";

export function Inbox() {
  return (
    <Box
      bgColor={"gray.100"}
      w={"15rem"}
      h={"45.4rem"}
      borderBottomLeftRadius={8}
      borderTop={"2px"}
      borderRight={"2px"}
      overflowY={"auto"}
      overflowX={"hidden"}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderBottom={"2px"}
      >
        <Text
          color={"blue.500"}
          fontSize={"2xl"}
          fontWeight={"medium"}
          m={"1rem"}
        >
          Inbox
        </Text>
        <Icon as={ArrowClockwise} boxSize={7} color={"blue.500"} m={"1rem"} />
      </Box>
      <Box>
        <EmailCard />
      </Box>
    </Box>
  );
}
