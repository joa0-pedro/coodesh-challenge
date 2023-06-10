import { Box, Icon, Text } from "@chakra-ui/react";
import { DotOutline } from "@phosphor-icons/react";

export function EmailCard() {
  return (
    <Box
      mt={1}
      bgColor={"white"}
      _hover={{
        boxShadow: "2px, 2px, red",
        cursor: "pointer",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        mx={"0.5rem"}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Text fontSize={"xl"}>Bruno Felipe</Text>
          <Text color={"blue.500"} fontSize={"lg"}>
            Bem vindo
          </Text>
          <Box w={"12rem"}>
            <Text
              color={"gray.200"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              vitae dui massa. Vestibulum suscipit libero ut massa lacinia, quis
              laoreet velit ultrices.
            </Text>
          </Box>
        </Box>
        <Icon as={DotOutline} boxSize={12} color={"blue.500"} />
      </Box>
    </Box>
  );
}
