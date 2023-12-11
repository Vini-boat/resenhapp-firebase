import {Card , Stack, ButtonGroup, Button} from 'react-bootstrap';
import PartySelector from './PartySelector';
import PartyInput from './PartyInput';
import GuestSection from './GuestSection';
import PartyAdder from './PartyAdder';
import {auth, db} from '../config/firebase';
import 'firebase/firestore';
import {serverTimestamp} from 'firebase/firestore';
import 'firebase/app'

import { useState, useRef } from 'react';

import {useCollectionData} from 'react-firebase-hooks/firestore'


function PartySection() {
    const partiesRef = db.collection('parties');
    const q = partiesRef.where('uid', '==', auth.currentUser.uid).orderBy("editedAt",'desc')
    const [parties, loading, err] = useCollectionData(q, {idField: 'id'})

    const [selectedParty, setSelectedParty] = useState(null)
    const [isAdding , setIsAdding] = useState(false)

    const addPartyInputRef = useRef(null);

    async function handleAddParty(partyName) {
        if (parties.find(p => p.name === partyName)) {
            alert("nome da festa já existe")
        } else {
            const addedParty = await partiesRef.add({
                uid: auth.currentUser.uid,
                name : partyName,
                editedAt: serverTimestamp(),
            })
            setIsAdding(false);
        }
    }

    function handleAddButton() {
        setSelectedParty(null);
        setIsAdding(true)
    }

    async function handleSelectParty(party) {
        if (party){
            setSelectedParty(party)
            const partyRef = partiesRef.doc(party.id)
            await partyRef.update({editedAt: serverTimestamp()})
        }
        
    }
    
    async function handleDeleteSelectedParty() {
        if (selectedParty){
            const partyRef = partiesRef.doc(selectedParty.id)
            partyRef.delete();
            setSelectedParty(parties[1])
        }
    }
    let isInput = false;
    if (!loading){
        isInput = isAdding || parties.length < 1
    }
    return !loading && (
        <Card>
            <Card.Header>
                <Stack direction='horizontal'>
                    <ButtonGroup>
                        {isInput
                        ? <>
                        <PartyInput
                            handleAddParty={handleAddParty}
                        />
                        <Button onClick={() => setIsAdding(false)}>X</Button>
                        </>

                        : <>
                        <PartySelector
                        inputRef={addPartyInputRef}
                        parties={parties}
                        selectedParty={selectedParty}
                        setSelectedParty={handleSelectParty}
                        />
                        <PartyAdder 
                            setIsAdding={handleAddButton}
                        />
                        </>
                        }
                        
                    </ButtonGroup>
                    <Button 
                    onClick={handleDeleteSelectedParty}
                    className='ms-auto'
                    disabled={selectedParty == null}
                    variant='danger'>X</Button>
                </Stack>
            </Card.Header>
            <Card.Body>
                {selectedParty && <GuestSection party={selectedParty}/>}    
            </Card.Body>
        </Card>
    )
}
export default PartySection;
