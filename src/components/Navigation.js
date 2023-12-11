import {Navbar, Stack} from 'react-bootstrap'
import Auth from './Auth'

function Navigation(){
    return (
        <Navbar bg="dark" expand='lg'>
            <Stack direction='horizontal' gap={3} className="w-100 px-2">
                <Navbar.Brand className='text-white p-2'>Resenhapp</Navbar.Brand>
                <Auth/>
            </Stack>
        </Navbar>
    )
}

export default Navigation;
