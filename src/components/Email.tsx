import {
  Box,
  Button,
  Center,
  Icon,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Bell, ClipboardText } from "@phosphor-icons/react";
import { CREATE_SESSION_ID, client } from "../graphql";
import { useSession } from "../store/useSession";
import { useCallback, useEffect, useState } from "react";
import { MailBox } from "./Mailbox";

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
  const { sessionId, expiredAt, configure, email } = useSession();
  const [expireTime, setExpireTime] = useState("");
  const toast = useToast();

  const expireDate = useCallback(async () => {
    if (!expiredAt) return;

    const count = Math.round(
      (new Date(expiredAt).getTime() - new Date().getTime()) / 60000
    ).toString();

    setExpireTime(count.slice(0, count.length));

    if (count <= "0") {
      handleNewEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiredAt]);

  const handleNewEmail = useCallback(async () => {
    const { data } = await client.mutate<Data>({
      mutation: CREATE_SESSION_ID,
    });

    if (!data) return;

    configure({
      sessionId: data.introduceSession.id,
      email: data.introduceSession.addresses[0].address,
      expiredAt: data.introduceSession.expiresAt,
    });

    if (expireTime <= "0") {
      localStorage.removeItem("sessionId");
      localStorage.removeItem("email");
      localStorage.removeItem("expiredAt");
    }

    localStorage.setItem("sessionId", data.introduceSession.id);
    localStorage.setItem("email", data.introduceSession.addresses[0].address);
    localStorage.setItem("expiredAt", data.introduceSession.expiresAt);
  }, [configure, expireTime]);

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

  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");
    const storedEmail = localStorage.getItem("email");
    const storedExpiredAt = localStorage.getItem("expiredAt");

    if (!(storedSessionId && storedEmail && storedExpiredAt)) {
      handleNewEmail();
    } else {
      configure({
        sessionId: storedSessionId,
        email: storedEmail,
        expiredAt: storedExpiredAt,
      });
    }

    expireDate();

    const interval = setInterval(() => {
      expireDate();
    }, 60100);

    return () => {
      clearInterval(interval);
    };
  }, [expireDate, configure, handleNewEmail]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      maxWidth="100%"
      alignItems={"center"}
    >
      <Box
        mt={6}
        display="flex"
        flexDirection="column"
        textAlign="left"
        w="fit-content"
        flexWrap="wrap"
      >
        <Text fontSize={{ base: "lg", md: "2xl" }} color="gray.200">
          Seu endereço de e-mail temporário
        </Text>
        <Box display="flex" flexDirection="row" borderRadius={8}>
          <Input
            value={email}
            fontSize={{ base: "sm", md: "xl" }}
            border="2px"
            borderRight="1px"
            borderRightRadius="0"
            cursor="pointer"
            readOnly
            _hover={{
              border: "2px",
              borderRight: "1px",
              borderColor: "blue.500",
              bgColor: "white",
              color: "blue.500",
            }}
          />
          <Button
            leftIcon={<Icon boxSize={6} as={ClipboardText} />}
            onClick={copyToClipboard}
            border="2px"
            borderLeft="1px"
            borderLeftRadius="0"
            borderRightRadius="0"
            _hover={{
              border: "2px",
              borderLeft: "1px",
              borderColor: "blue.500",
              bgColor: "white",
              color: "blue.500",
            }}
          >
            Copiar
          </Button>
        </Box>
        {sessionId ? (
          <Text fontSize={{ base: "sm", md: "xl" }} color="gray.200" mb={3}>
            Esse e-mail expira em {expireTime} minutos
          </Text>
        ) : (
          <Text fontSize={{ base: "sm", md: "xl" }} color="gray.200" mb={3}>
            Gerando seu e-mail
          </Text>
        )}
      </Box>
    </Box>
  );
}
