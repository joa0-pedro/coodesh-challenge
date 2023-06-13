import { useQuery } from "@apollo/client";
import { useSession } from "../store/useSession";
import { LOAD_MAILS } from "../graphql";
import {
  Box,
  Button,
  Collapse,
  Icon,
  SlideFade,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { EmptyMail } from "./EmptyMail";
import { ArrowClockwise, Bell, List } from "@phosphor-icons/react";
import { EmailCard } from "./EmailCard";
import { useEffect, useState } from "react";
import NotificationSound from "../assets/NotificationSound.mp3";

export interface Data {
  session: Session;
}

export interface Session {
  __typename: string;
  mails: Mail[];
}

export interface Mail {
  __typename: string;
  rawSize: number;
  fromAddr: string;
  toAddr: string;
  downloadUrl: string;
  text: string;
  headerSubject: string;
}

export function MailBox() {
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const { sessionId } = useSession();
  const [emailsCount, setEmailsCount] = useState(0);
  const [emailIndex, setEmailIndex] = useState(0);
  const [counter, setCounter] = useState(15);
  const { data, refetch } = useQuery<Data>(LOAD_MAILS, {
    variables: { id: sessionId },
  });

  function sendNotification() {
    const title = "DropMail.me";
    const msg = "Você recebeu um novo E-mail";

    new Notification(title, { body: msg });
    new Audio(NotificationSound).play();
  }

  async function requestNotificationPermission() {
    if (!("Notification" in window)) {
      toast({
        title: "Ops!",
        description: "Esse navegador não suporta notificações",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    if (Notification.permission !== "denied") {
      Notification.requestPermission();
    } else {
      toast({
        title: "Ops!",
        description:
          "As permissões de notificação foram negadas pelo usuário. Para reativar é necessário redefinir as permissões e solicitar novamente!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
    if (Notification.permission === "granted") {
      toast({
        title: "Você será notificado",
        description: "As notificações já foram ativadas!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (counter == 0) {
      timer = setInterval(() => {
        refetch();
        setCounter(15);
      }, 1000);
    }

    if (counter > 0) {
      timer = setInterval(() => setCounter(counter - 1), 1000);
    }

    return () => clearInterval(timer);
  }, [refetch, counter]);

  useEffect(() => {
    if (!data) return;

    const currentEmailsCount = data.session.mails.length;

    if (currentEmailsCount == emailsCount) return;

    setEmailsCount(data.session.mails.length);
    sendNotification();
  }, [data, emailsCount]);

  return (
    <Box display="flex" flexDirection="row" borderTop="2px" maxWidth="100%">
      <Box>
        <Collapse in={isOpen} animateOpacity>
          <Box
            bgColor="gray.100"
            h="44.9em"
            w={"12.5em"}
            borderBottomLeftRadius={8}
            borderRight="2px"
            borderBottom="2px"
            overflowY="auto"
            overflowX="hidden"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              borderBottom="2px"
            >
              <Text
                color="blue.500"
                fontSize="2xl"
                fontWeight="medium"
                mx={4}
                my={1}
              >
                Inbox
              </Text>
              <Icon
                as={ArrowClockwise}
                boxSize={7}
                color="blue.500"
                mx={4}
                my={2}
                onClick={() => refetch()}
                _hover={{
                  p: "2px",
                  transition: "0.8s",
                  borderRadius: "99px",
                  cursor: "pointer",
                  bgColor: "cyan.50",
                }}
              />
            </Box>

            <Box>
              {data?.session.mails.map((mail, index) => (
                <EmailCard
                  key={String(index)}
                  mail={mail}
                  onClick={() => setEmailIndex(index)}
                />
              ))}
            </Box>
          </Box>
        </Collapse>
      </Box>

      <Box w={"100%"}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          my={{ base: "-0.8", md: "0.39em" }}
          maxWidth="100%"
        >
          <Icon
            ml={3}
            as={List}
            boxSize={8}
            onClick={onToggle}
            weight="bold"
            color="blue.500"
            _hover={{
              cursor: "pointer",
            }}
          />

          <Text color="blue.500" fontSize="xl">
            {data ? data.session.mails[emailIndex]?.headerSubject : ""}
          </Text>
          <Box display="flex" flexDirection="row" mr={8} mb={"-0.52em"}>
            <Text color="gray.200" fontSize={{ base: "lg", md: "xl" }}>
              Atualizando:
            </Text>
            <Text color="gray.300" fontSize={{ base: "lg", md: "xl" }}>
              {counter} s
            </Text>
          </Box>
        </Box>
        <Box p={8} borderTop="2px">
          {data ? data.session.mails[emailIndex]?.text : <EmptyMail />}
        </Box>
      </Box>
      <Box borderBottom={"2px"} h={{ base: "2em", md: "2.9em" }}>
        <Box
          bgColor="gray.100"
          w={10}
          h={10}
          mt={{ base: "-7em", md: "-8em" }}
          mr="0.5em"
          border="2px"
          borderRadius={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{
            borderColor: "blue.500",
            bgColor: "white",
            color: "blue.500",
          }}
        >
          <Icon onClick={requestNotificationPermission} as={Bell} boxSize={7} />
        </Box>
      </Box>
    </Box>
  );
}
