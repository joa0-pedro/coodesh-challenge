import { Box, Button, Icon, Input, Text, useToast } from "@chakra-ui/react";
import { ClipboardText } from "@phosphor-icons/react";
import { CREATE_SESSION_ID, client } from "../graphql";
import { useSession } from "../store/useSession";

export interface Data {
  introduceSession: IntroduceSession;
}

export interface IntroduceSession {
  id: string;
  expiresAt: string;
  addresses: Address[];
}

export interface Address {
  address: string;
}

export function Email() {
  const { configure, email } = useSession();
  const toast = useToast();

  async function handleNewEmail() {
    const { data } = await client.mutate<Data>({
      mutation: CREATE_SESSION_ID,
    });

    if (!data) return;

    if (data.introduceSession.expiresAt < Date.now().toString()) {
      handleNewEmail();
    }

    configure({
      sessionId: data.introduceSession.id,
      email: data.introduceSession.addresses[0].address,
      expiredAt: data.introduceSession.expiresAt,
    });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(email);
    toast({
      title: "Copiado!",
      description: "O seu e-mail temporário foi copiado",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        mt={"1.5rem"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        textAlign={"left"}
        w={"fit-content"}
      >
        <Text fontSize={"1.4rem"} color={"gray.200"}>
          Seu endereço de email temporário
        </Text>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
          <Input
            value={email}
            w={"25rem"}
            h={"3rem"}
            fontSize={"xl"}
            border={"2px"}
            borderColor={"gray.300"}
            borderRight={"1px"}
            borderRightRadius={"0"}
            cursor={"pointer"}
            readOnly
          />
          <Button
            leftIcon={<Icon boxSize={6} as={ClipboardText} />}
            onClick={copyToClipboard}
            h={"3rem"}
            border={"2px"}
            borderColor={"gray.300"}
            borderLeft={"1px"}
            borderLeftRadius={"0"}
          >
            Copiar
          </Button>
        </Box>
        <Text fontSize={"1.2rem"} color={"gray.200"}>
          Esse email expira em 7 minutos
        </Text>
      </Box>
      <Button onClick={handleNewEmail}>Novo email</Button>
    </Box>
  );
}
