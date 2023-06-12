import { useQuery } from "@apollo/client";
import { useSession } from "../store/useSession";
import { LOAD_MAILS } from "../graphql";
import { Box, Button, Icon, Text, useToast } from "@chakra-ui/react";
import NotificationSound from "../assets/NotificationSound.mp3";
import { EmptyMail } from "./EmptyMail";
import { ArrowClockwise, Bell } from "@phosphor-icons/react";
import { EmailCard } from "./EmailCard";
import { useEffect, useState } from "react";

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
  const { sessionId } = useSession();
  const [emailIndex, setEmailIndex] = useState(0);
  const [emailsCount, setEmailsCount] = useState(0);
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
      sendNotification();
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
    <Box>
      <Button
        mt={"-7.5rem"}
        ml={"1rem"}
        border={"2px"}
        borderColor={"gray.100"}
        onClick={requestNotificationPermission}
        rightIcon={<Icon as={Bell} boxSize={5} weight="bold" />}
        _hover={{
          border: "2px",
          borderColor: "blue.500",
          bgColor: "white",
          color: "blue.500",
        }}
      >
        Ativar notificação
      </Button>
      <Box
        display={"flex"}
        flexDirection={"row"}
        borderTop={"2px"}
        h={"42.5rem"}
        w={"100%"}
      >
        <Box
          bgColor={"gray.100"}
          w={"15rem"}
          h={"43.88rem"}
          borderBottomLeftRadius={8}
          borderRight={"2px"}
          borderBottom={"2px"}
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
              mx={"1rem"}
              my={"0.5rem"}
            >
              Inbox
            </Text>
            <Icon
              as={ArrowClockwise}
              boxSize={7}
              color={"blue.500"}
              mx={"1rem"}
              my={"0.5rem"}
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
        <Box w={"100%"}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Text color={"blue.500"} fontSize={"2xl"} ml={"2rem"} my={"0.5rem"}>
              {data ? data.session.mails[emailIndex]?.headerSubject : ""}
            </Text>
            <Box display={"flex"} flexDirection={"row"} mr={"2rem"}>
              <Text color={"gray.200"} fontSize={"xl"} my={"0.66rem"} mr={1}>
                Atualizando inbox em:
              </Text>
              <Text color={"gray.300"} fontSize={"xl"} my={"0.66rem"}>
                {counter} segundos
              </Text>
            </Box>
          </Box>
          <Box p={"2rem"} borderTop={"2px"}>
            {data ? data.session.mails[emailIndex]?.text : <EmptyMail />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
