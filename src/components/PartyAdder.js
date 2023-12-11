import Button from 'react-bootstrap/Button'
function PartyAdder({setIsAdding}) {
    return (
        <Button onClick={setIsAdding}>+</Button>
    )
}

export default PartyAdder