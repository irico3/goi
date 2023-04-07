import {
  Center,
  ChakraProvider,
  Container,
  extendTheme,
} from "@chakra-ui/react";
import * as React from "react";
import { RecoilRoot } from "recoil";
import { Tab } from "./tabs/Tab";

export const Main: React.FC = () => {
  const theme = extendTheme({
    defaultProps: { colorScheme: "teal" },
    styles: {
      global: {
        body: {
          backgroundImage:
            "linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)",
        },
      },
    },
    components: {
      Button: {
        defaultProps: {
          colorScheme: "teal",
        },
      },
    },
  });

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Center>
          <Container
            p={10}
            bgColor={"white"}
            mt={10}
            maxW={"300"}
            centerContent
          >
            <Tab />
          </Container>
        </Center>
      </ChakraProvider>
    </RecoilRoot>
  );
};
