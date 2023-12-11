import './App.css';
import PartySection from './components/PartySection'
import {auth} from './config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import Navigation from './components/Navigation';
import {Container} from 'react-bootstrap'

function App() {
  const [user] = useAuthState(auth)
  return (
    <div className="App">
      <Navigation/>
      <Container>
      {user ? <PartySection/>: <></>}
      </Container>
    </div>
  );
}

export default App;
