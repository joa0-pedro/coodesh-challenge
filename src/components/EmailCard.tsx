import { Box, ButtonProps, Icon, Text } from "@chakra-ui/react";
import { DotOutline } from "@phosphor-icons/react";
import { Mail } from "./Mailbox";

interface EmailCardProps extends ButtonProps {
  mail: Mail;
}

export function EmailCard({ mail, ...rest }: EmailCardProps) {
  return (
    <Box
      p={2}
      as="button"
      mt={1}
      bgColor="white"
      maxWidth="100%"
      border="2px"
      borderColor="white"
      _hover={{
        border: "2px",
        borderColor: "gray.300",
        cursor: "pointer",
      }}
      {...rest}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mx={{ base: 2, md: 0 }}
        flexWrap="wrap"
        alignItems="center"
      >
        <Box display="flex" flexDirection="column" textAlign="left">
          <Text
            fontSize={{ base: "sm", md: "xl" }}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            w={{ base: "auto", md: 48 }}
          >
            {mail.fromAddr}
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="blue.500"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {mail.headerSubject}
          </Text>
          <Box w="12em">
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="gray.200"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {mail.text}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
