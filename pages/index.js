import { createUseStyles, useTheme} from 'react-jss';

const useStyles = createUseStyles(() => ({  
  button: ({color, backgroundColor, hoverColor, hoverBackgroundColor, borderColor}) => ({    
    border: [1, 'solid', borderColor],   
    borderRadius: 20,
    padding: [10, 20],
    display: 'inline-block',    
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
  const decrementClass = useStyles({color: theme.black, backgroundColor: theme.normal, hoverColor: theme.white, hoverBackgroundColor: theme.hoverNormal, borderColor: theme.black });
  const incrementClass = useStyles({color: theme.white, backgroundColor: theme.primary, hoverColor: theme.white, hoverBackgroundColor: theme.hoverPrimary, borderColor: theme.primary});
  return (
    <> 
    <button className={decrementClass.button}> 
      - Decrement  
    </button>
    <div id='counter'></div>
    <button className={incrementClass.button}> 
      + Increment  
    </button>  
    </> 
  );
}
