import { useQuery } from "@apollo/client";
import { useSession } from "../store/useSession";
import { LOAD_MAILS } from "../graphql";
import { Box } from "@chakra-ui/react";
import { Inbox } from "./Inbox";

export function MailBox() {
  const { sessionId } = useSession();
  const { data, loading, error } = useQuery(LOAD_MAILS, {
    variables: { id: sessionId },
    pollInterval: 15000,
  });

  if (loading) return <p>Carregando</p>;
  if (error) return <p>erro em: {error.message}</p>;

  // const [data, setData] = useState({});

  // useEffect(() => {
  //   if (!sessionId) return;

  //   async function load() {
  //     const { data: result } = await client.query({
  //       query: LOAD_MAILS,
  //       variables: { id: sessionId },
  //     });
  //     setData(result);
  //   }

  //   load();
  // }, [sessionId]);

  return (
    <Box>
      <Inbox />
    </Box>
  );
}
