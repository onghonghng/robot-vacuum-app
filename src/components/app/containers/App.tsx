import './App.css';
import ChatContainer from '../../chat/containers/ChatContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#f8631f'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <ChatContainer />
    </ThemeProvider>
  );
}

export default App;
