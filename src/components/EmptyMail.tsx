import { Center, Image, Text } from "@chakra-ui/react";
import EmptyImage from "../assets/EmptyImage.png";

export function EmptyMail() {
  return (
    <Center flexDir="column">
      <Image src={EmptyImage} />
      <Text color="blue.500" fontSize="3xl" fontWeight="bold">
        Nenhum E-mail para ser exibido!
      </Text>
    </Center>
  );
}
