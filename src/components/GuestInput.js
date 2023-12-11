import { useEffect, useRef, useState } from 'react';

function PartyInput({handleAddGuest}){
    const [guestName, setGuestName] = useState('')
    
    function handleKeyUp(e){
        if (e.key === "Enter") {
            handleAddGuest(guestName)
            setGuestName('')
        }
    }

    function handleChange(e) {
        setGuestName(e.target.value)

    }
    return <>
        <input
            autoFocus
            placeholder='Adicione um convidado'
            value={guestName}
            onChange={e => handleChange(e)}
            onKeyUp={e => handleKeyUp(e)}
        />
    </>
}

export default PartyInput;