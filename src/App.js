import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher position="absolute" />
      <AllRoutes />
    </ChakraProvider>
  );
}

export default App;
