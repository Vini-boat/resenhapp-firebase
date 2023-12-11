import './App.css';
import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';

import Dropdown from 'react-bootstrap/Dropdown';


const app = firebase.initializeApp({
  apiKey: "AIzaSyAF-YH5paQltjkw1aPJ_Rms30NaSXtdVfY",
  authDomain: "resenhapp-181ca.firebaseapp.com",
  projectId: "resenhapp-181ca",
  storageBucket: "resenhapp-181ca.appspot.com",
  messagingSenderId: "827979057440",
  appId: "1:827979057440:web:1d67c2f6ba19752e136f45"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <SignOut/>
      {user ? auth.currentUser.displayName : ""}
      {user ? <PartySection user={user}/> : <SignIn/>}
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <>
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function PartySection({user}){
  const partiesRef = firestore.collection('parties')
  const queryUserParties = partiesRef.orderBy('editedAt')
  const [userParties, loading] = useCollectionData(queryUserParties, {idField: 'id'});

  const [selectedParty, setSelectedParty] = useState(null)
  
  return(
    <>
    <hr/>
      {!loading && 
      <PartySelector 
        list={userParties} 
        selectedParty={selectedParty}
        set={setSelectedParty}/>}
      <hr/>
      {selectedParty && <Party party={selectedParty}/>}
    </>
  )
}

function PartySelector({list, selectedParty,set}) {
  useEffect(() => {
    set(list[0])
    console.log(selectedParty)
  },[])

  const handleSelectParty = (id) => {
    list.forEach(p => {
      if (p.id === id){
        set(p)       
      }
    })
    console.log(selectedParty)
  }
  return (
  <Dropdown>
    <Dropdown.Toggle>
      {selectedParty ? selectedParty.name : ""}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {list.map(party => {
        return (
        <Dropdown.Item 
          href='#'
          key={party.id}
          onClick={() => handleSelectParty(party.id)}
          >{party.name}</Dropdown.Item>
        )
      })}
    </Dropdown.Menu>

  </Dropdown>
  )
}

function Party({party}) {
  const guestsRef = firestore.collection('parties').doc(party.id).collection('guests')
  const [guestList, loading] = useCollectionData(guestsRef, {idField: 'id'});
  console.log(guestList)
  function handleAddGuest(name){
    
  }

  return (
    <>
    <GuestInput onEnter={handleAddGuest}
    />
    {!loading && <GuestList list={guestList}/>}
    </>
  )
}

function GuestInput({onEnter}) {
  const [text, setText] = useState("");

  function handleKeyUp(event) {
    if (event.key === "Enter"){
      if (text){ onEnter(text)}
      setText("")
    }
  }

  return (
    <>
    <input
      value={text}
      onChange={e => setText(e.target.value)}
      onKeyUp={handleKeyUp}
    />
    </>
  )
}

function Guest({guest, onDelete, onStatusButton}) {
  let disable = false
  let lable = "convidar"
  switch (guest.status) {
    case "cadastrado": {
      lable = "convidar"
      break
    }
    case "convidado": {
      lable = 'confirmar'
      break
    }
    case "confirmado": {
      lable = '✅'
      disable = true
      break
    }
    default: {}
  }

  return (
    <li onMous>
      <button onClick={() => onDelete(guest.id)}>X</button>
      <button 
      onClick={() => onStatusButton(guest.id)}
      disabled={disable}>
      {lable}
      </button>
      {guest.name}
    </li>
  )
}

function GuestList({list}) {
  function handleDelete(id){
    
  }
  function handleStatusButton(id){
    
  }
  
  return (
    <>
    <ul>
      {list.map(guest => {
        return (
          <Guest 
            key={guest.id}
            guest={guest}
            onDelete={handleDelete}
            onStatusButton={handleStatusButton}
          />
        )
      })}
    </ul>
    </>
  )
}

let nextIndex = 4;
const initialGuests = [
  {id:1 , name: "vini", status: "confirmado"},
  {id:2 , name: "amaral", status: "cadastrado"},
  {id:3 , name: "yasmin", status: "convidado"},
]


export default App;