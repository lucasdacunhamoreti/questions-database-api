import MainPage from "./components/MainPage/MainPage"; 
import QuestionsProvider from './components/context/QuestionsProvider';
import Registration from "./components/Registration/Registration";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react';
import Edit from "./components/Edit/Edit";

function App() {
  return (
    <ChakraProvider>
      <QuestionsProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/edit/:id" element={<Edit />} />
          </Routes>
      </BrowserRouter>
      </QuestionsProvider>
    </ChakraProvider>
  );
}

export default App;
