import { Box, ButtonProps, Icon, Text } from "@chakra-ui/react";
import { DotOutline } from "@phosphor-icons/react";
import { Mail } from "./Mailbox";

interface EmailCardProps extends ButtonProps {
  mail: Mail;
}

export function EmailCard({ mail, ...rest }: EmailCardProps) {
  return (
    <Box
      as="button"
      mt={1}
      bgColor={"white"}
      _hover={{
        boxShadow: "2px, 2px, red",
        cursor: "pointer",
      }}
      {...rest}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        mx={"0.5rem"}
      >
        <Box display={"flex"} flexDirection={"column"} textAlign={"left"}>
          <Text
            fontSize={"xl"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            w={48}
          >
            {mail.fromAddr}
          </Text>
          <Text color={"blue.500"} fontSize={"lg"}>
            {mail.headerSubject}
          </Text>
          <Box w={"12rem"}>
            <Text
              color={"gray.200"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {mail.text}
            </Text>
          </Box>
        </Box>
        <Icon as={DotOutline} boxSize={12} color={"blue.500"} />
      </Box>
    </Box>
  );
}
