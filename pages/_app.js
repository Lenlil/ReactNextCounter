
import { ThemeProvider } from "react-jss"

const theme = {
  black: '#000000',
  white: '#FFFFFF',
  normal: 'white',
  primary: 'hotpink',
  hoverNormal: 'black',
  hoverPrimary: 'rebeccapurple'
}

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>      
      <Component {...pageProps} />        
    </ThemeProvider>
  )
}

export default App;
