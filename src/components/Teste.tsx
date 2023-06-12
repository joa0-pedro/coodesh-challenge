import { useQuery } from "@apollo/client";
import { useSession } from "../store/useSession";
import { LOAD_MAILS } from "../graphql";
import { Box, Text } from "@chakra-ui/react";

export function Teste() {
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
    <Box w={"100%"}>
      <Box
        borderBottomRightRadius={"8"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        mt={"0.5rem"}
      >
        <Text color={"blue.500"} fontSize={"2xl"} ml={"2rem"} my={"0.5 rem"}>
          Bem vindo
        </Text>
        <Box display={"flex"} flexDirection={"row"} mr={"2rem"} my={"0.5 rem"}>
          <Text color={"gray.200"} fontSize={"xl"}>
            Atualizando inbox em:
          </Text>
          <Text color={"gray.300"} fontSize={"xl"}>
            15 segundos
          </Text>
        </Box>
      </Box>
      <Box p={"3rem"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
        dui massa. Vestibulum suscipit libero ut massa lacinia, quis laoreet
        velit ultrices. Donec eu orci et turpis consequat sollicitudin quis quis
        nisl. Fusce non est facilisis, laoreet dolor ac, auctor velit.
        Vestibulum interdum felis eu massa egestas, vel aliquet dolor mollis.
        Nam est mauris, sodales a velit ut, ultricies imperdiet sapien. Integer
        ut ligula fringilla nulla auctor volutpat vitae id augue. Integer
        egestas, augue vitae vehicula accumsan, tellus velit sodales lacus, et
        tristique ante velit sit amet ligula. Vestibulum pellentesque mauris
        nunc, quis semper massa feugiat vitae. Curabitur consectetur feugiat
        maximus. Integer dignissim arcu tellus, non dignissim velit ullamcorper
        vel. Orci varius natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus. Nam in libero accumsan neque facilisis
        ullamcorper. Vestibulum vitae ipsum a nunc ultricies iaculis in ut
        turpis. Donec finibus rhoncus enim. Phasellus sollicitudin justo lorem,
        vel dictum felis egestas eget. Vivamus nisl lacus, eleifend vitae
        dignissim vel, viverra ac augue. Nullam ultrices pulvinar quam aliquet
        tempus. Nam id tellus imperdiet augue luctus aliquam quis vitae enim.
        Sed pretium interdum urna vel accumsan. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Mauris
        ullamcorper purus nisl, a accumsan neque viverra eu. Donec lobortis
        faucibus eros vel elementum.
      </Box>
    </Box>
  );
}
