import {db, auth} from '../config/firebase'
import 'firebase/firestore'

import Guest from './Guest'
import GuestInput from './GuestInput'

import {Card , Stack, ButtonGroup, Button} from 'react-bootstrap';

import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'


function GuestSection({party}) {
    const guestsRef = db.collection(`parties/${party.id}/guests`)
    const queryGuestByStatus = guestsRef.orderBy('status')
    const [guests, loading, err] = useCollectionData(queryGuestByStatus, {idField: 'id'})
    const peopleRef = db.collection('people')
    const [people, loadingPeople] = useCollectionData(peopleRef.where('uid','==', auth.currentUser.uid), {idField: 'id'})


    async function handleAddGuest(guestName) {
        let personId = null
        const test = people.find(p => p.name === guestName)
        if (!test){
            const newPerson = await peopleRef.add({
                uid: auth.currentUser.uid,
                name: guestName
            })
            personId = newPerson.id
        }else{
            personId = test.id
        }
        if (!guests.find(g => g.personId === personId)){
            guestsRef.add({
                status: 'A_added',
                personId: personId
            })
        }else{
            alert(guestName + " já está convidado(a) para a festa")
        }

    }

    async function handleDeleteGuest(id){
        const guestRef = guestsRef.doc(id)
        guestRef.delete()
    }

    async function handleChangeGuestStatus(guest){
        const status = guest.status
        switch (status) {
            case 'A_added':
                guestsRef.doc(guest.id).update({status: 'B_invited'})
                break;
            case 'B_invited':
                guestsRef.doc(guest.id).update({status: 'C_confirmed'})
                break;
            default:
                break;
        }
    }

    return !loading && (<>
        <Card>
            <Card.Header>
                <ButtonGroup>
                    <GuestInput
                        handleAddGuest={handleAddGuest}
                    />
                    <Button>+</Button>
                </ButtonGroup>
            </Card.Header>
            <Card.Body>
                {guests && guests.map(guest => {
                    return <Guest 
                            key={guest.id} 
                            guest={guest}
                            handleChangeGuestStatus={handleChangeGuestStatus}
                            handleDeleteGuest={handleDeleteGuest}
                            />
                })}
            </Card.Body>

        </Card>
    </>)
}

export default GuestSection;