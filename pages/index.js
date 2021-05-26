import { createUseStyles, useTheme} from 'react-jss';
import { useState } from 'react';

const useStyles = createUseStyles(() => ({  
  middle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  
  },
  container:{
    fontWeight: 'bolder',
    padding: [15, 25], 
  },
  button: ({color, backgroundColor, hoverColor, hoverBackgroundColor, borderColor}) => ({    
    fontWeight: 'bolder',
    border: [1, 'solid', borderColor],   
    borderRadius: 20,
    padding: [15, 25],    
    color: color,
    backgroundColor: backgroundColor,
    "&:hover":{
      backgroundColor: hoverBackgroundColor,
      color: hoverColor,  
      borderColor: hoverBackgroundColor   
    }
  }), 
}));

export default function Home() {
  const theme = useTheme();  
  const generalClass = useStyles({});
  const decrementClass = useStyles({color: theme.black, backgroundColor: theme.normal, hoverColor: theme.white, hoverBackgroundColor: theme.hoverNormal, borderColor: theme.black });
  const incrementClass = useStyles({color: theme.white, backgroundColor: theme.primary, hoverColor: theme.white, hoverBackgroundColor: theme.hoverPrimary, borderColor: theme.primary});
  
  const [count, setCount] = useState(0);  
  const incrementButtonClickHandler = e => {
    if(count < 7)    
      setCount(count + 1)      
   }
   const decrementButtonClickHandler = e => {
    if(count > 0)    
      setCount(count - 1)      
   }

  return (
    <> 
    <div className={generalClass.middle}> 
      <button className={decrementClass.button} onClick={decrementButtonClickHandler}> 
        - DECREMENT  
      </button>
      <div className={generalClass.container}>Counter <span id='counter'>{count}</span></div>
      <button className={incrementClass.button} onClick={incrementButtonClickHandler}> 
        + INCREMENT  
      </button>  
    </div>
    </> 
  );
}
