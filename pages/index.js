import { createUseStyles, useTheme} from 'react-jss';
import { useState, useEffect } from 'react';

const useStyles = createUseStyles(() => ({  
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  // item:{
  //   width: '100%',
  // },
  break:{
    width: '100%'
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
  const [message, setMessage] = useState();  
  // useEffect(() => {  
  //   getRepoInfo(count);
  // });
 
  const incrementButtonClickHandler = e => {
    if(count < 7){    
      setCount(count + 1) 
      getRepoInfo(count + 1);  
      setMessage('Loading information.') 
    } 
    else{
      getRepoInfo(count);
    }                      
   }
   const decrementButtonClickHandler = e => {
    if(count > 0){      
      setCount(count - 1)      
      getRepoInfo(count - 1);
      setMessage('Loading information.') 
    }     
    else{
   
      getRepoInfo(count);
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
    .catch(error => setRepoData(error));
    setMessage('');             
   }   
   
   const updateRepoInfo = (data) => {
    setRepoData(data);
   } 

  return (
    <> 
    <div className={generalClass.flexContainer}> 
 
        <button className={decrementClass.button} onClick={decrementButtonClickHandler}> 
          - DECREMENT  
        </button>
        <div className={generalClass.container}>Counter <span id='counter'>{count}</span></div>
        <button className={incrementClass.button} onClick={incrementButtonClickHandler}> 
          + INCREMENT  
        </button> 
        <div className={generalClass.break}></div>    
        <table>
          <tr>
            <td>
            Message:
            </td>
            <td>
            {repoData.message}
            {repoData.error}
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
      
    </div>    
    </> 
  );
}
