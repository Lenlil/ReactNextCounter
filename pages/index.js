import { createUseStyles, useTheme} from 'react-jss';
import { useState, useEffect } from 'react';

const useStyles = createUseStyles(() => ({  
  flexContainer: {
    display: 'flex',
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
      borderColor: hoverBackgroundColor, 
      cursor: 'pointer',    
    }
  }), 
}));

export default function Home() {
  const theme = useTheme();  
  const generalClass = useStyles({});
  const normalColorClass = useStyles({color: theme.black, backgroundColor: theme.normal, hoverColor: theme.white, hoverBackgroundColor: theme.hoverNormal, borderColor: theme.black });
  const primaryColorClass = useStyles({color: theme.white, backgroundColor: theme.primary, hoverColor: theme.white, hoverBackgroundColor: theme.hoverPrimary, borderColor: theme.primary});
  
  const [count, setCount] = useState(0);  
  const [message, setMessage] = useState();  
 
  const incrementButtonClickHandler = e => {
    if(count < 7){    
      setCount(count + 1) 
      getRepoInfo(count + 1);  
      setMessage('Loading information.') 
    }                    
   }
   const decrementButtonClickHandler = e => {
    if(count > 0){      
      setCount(count - 1)      
      getRepoInfo(count - 1);
      setMessage('Loading information.') 
    }                 
   }
   
   const [repoData, setRepoData] = useState(0);

   const repos = [
    'eslint/eslint',
    'oakwood/front-end-questions',
    'babel/babel',
    'webpack/webpack',
    'storybooks/storybook',
    'facebook/react',
    'reactjs/redux',
    'expressjs/express'
   ]

   const getRepoInfo = (index) => {
    const repositoryName = repos[index];
    const url = 'https://api.github.com/repos/' + repositoryName;
    fetch(url)
    .then(response => response.json())
    .then(data => {                          
      updateRepoInfo(data); 
      setMessage('');            
    })     
    .catch(error => setMessage(error));              
   }   
   
   const updateRepoInfo = (data) => {
    setRepoData(data);
   } 

  return (
    <>   
    <div className={generalClass.flexContainer}>  
        <button className={normalColorClass.button} onClick={decrementButtonClickHandler}> 
          - DECREMENT  
        </button>
        <div className={generalClass.container}>Counter <span id='counter'>{count}</span></div>
        <button className={primaryColorClass.button} onClick={incrementButtonClickHandler}> 
          + INCREMENT  
        </button> 
     </div> 
      <table>
        <tr>
          <td>
          Message:
          </td>
          <td>
          {repoData.message}      
          {message}
          </td>
        </tr>
        <tr>
          <td>
          Full name:
          </td>
          <td>
          {repoData.full_name}
          </td>
        </tr>
        <tr>
          <td>
          Description:
          </td>
          <td>
          {repoData.description}
          </td>
        </tr>
        <tr>
          <td>
          Amount of stars:
          </td>
          <td>
          {repoData.stargazers_count}
          </td>
        </tr>         
      </table>         
    </> 
  );
}
