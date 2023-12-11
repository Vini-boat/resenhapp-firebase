import 'firebase/firestore'
import {db} from '../config/firebase'

import {Stack, ButtonGroup, Button} from 'react-bootstrap'

import {useDocumentData} from 'react-firebase-hooks/firestore'


function Guest({guest, handleDeleteGuest, handleChangeGuestStatus}) {
    const personDoc = db.doc(`people/${guest.personId}`)
    const [person, loading, err] = useDocumentData(personDoc, {idField: 'id'})

    let label = 'convidar'
    let variant = 'primary'
    switch (guest.status) {
        case 'A_added':
            label = 'convidar'
            variant = 'primary'
            break;
        case 'B_invited':
            label = 'confirmar'
            variant = 'secondary'
            break;
        case 'C_confirmed':
            label = 'confirmado'
            variant = 'success'
            break;
        default:
            break;
    }

    return !loading && <>
        {person && 
            <Stack direction='horizontal'>
                <div>{person.name}</div>
                <ButtonGroup className='ms-auto'>
                    <Button className='ms-auto' 
                    variant={variant}
                    disabled={guest.status === 'C_confirmed'}
                    onClick={() => handleChangeGuestStatus(guest)}
                    >{label}</Button>
                    <Button variant='danger' onClick={() => handleDeleteGuest(guest.id)}>X</Button>
                </ButtonGroup>
            </Stack>
        }
    </>
}

export default Guest;