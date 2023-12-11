import { useEffect, useRef, useState } from 'react';

function PartyInput({handleAddParty}){
    const [partyName, setPartyName] = useState('')
    
    function handleChange(e){
        if (e.key === "Enter") {
            handleAddParty(partyName)
            setPartyName('')
        }
    }
    
    return <>
        <input
            autoFocus
            placeholder='Digite o nome da festa'
            onChange={e => setPartyName(e.target.value)}
            onKeyUp={e => handleChange(e)}
        />
    </>
}

export default PartyInput;