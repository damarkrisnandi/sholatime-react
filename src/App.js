// import logo from './logo.svg';
import './App.css';
import Main from './container/Main';
import GlobalProvider from './context/context';

function App() {
  return (
      <Main />
      
  );
}

export default GlobalProvider(App);
