import {auth, googleProvider} from '../config/firebase'
import {Button, Figure} from 'react-bootstrap'

function Auth() {
    
    return (
        <>
        {auth.currentUser ? <SignOut/> : <SignIn/>}
        </>
    )
}

function SignIn({user, setUser}) {

    const signInWithGoogle = () => {
      auth.signInWithPopup(googleProvider);
    }
  
    return (
      <>
        <Button className='ms-auto' onClick={signInWithGoogle}>Sign in with Google</Button>
      </>
    )
  
}

function SignOut() {
return auth.currentUser && (
    <>
    <Figure.Image
      className='ms-auto mt-2'
      src={auth.currentUser.photoURL}
      width={30}
      roundedCircle
    />
    <Button className="btn-secondary" onClick={() => auth.signOut()}>Sign Out</Button>
    </>
)
}

export default Auth;