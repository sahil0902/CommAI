// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        
      },
      variants: {
        solid: (props) => ({
          bg: "transparent", // Keep background transparent
          color: props.colorMode === "dark" ? "white" : "black", // Explicitly define text color
          _hover: {
            bg: "rgba(255, 255, 255, 0.1)", // Slight background change on hover for better UI
          },
        }),
      },
    },
  },
});

export default theme;
