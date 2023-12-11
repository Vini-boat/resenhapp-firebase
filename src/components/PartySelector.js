import {useEffect, useState} from 'react'
import {auth, db} from '../config/firebase'
import 'firebase/firestore'

import {useCollectionData} from 'react-firebase-hooks/firestore'

import Dropdown from 'react-bootstrap/Dropdown'

function PartySelector({parties, selectedParty, setSelectedParty}){
    useEffect(() => {
        setSelectedParty(parties[0])
    },[])

    function handleSelectParty(id) {
        parties.forEach(party => {
            if (party.id === id ){
                setSelectedParty(party)
            }
        })
    }

    return (<> 
    <Dropdown class='w-auto'>
        <Dropdown.Toggle>
            {selectedParty ? selectedParty.name : 'Crie uma festa'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {parties && parties.map(party => {
                return(
                <Dropdown.Item key={party.id} onClick={() => handleSelectParty(party.id)}>{party.name}</Dropdown.Item>)
            })}
        </Dropdown.Menu>
    </Dropdown>
    </>)
}

export default PartySelector;