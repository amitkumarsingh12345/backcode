import axios from 'axios';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';

const Nabtab = () => {
    const [category, setCategory] = useState();
    const categoryHandler = async () => {
        const data = await axios.get(`${window.location.origin}/api/v3/category/find`);
        setCategory(data?.data);
    }
    useEffect(() => {
        categoryHandler();
    }, []);

    return (
        <Nav variant="tabs" className='bg-dark'>
            <Nav.Item>
                <Nav.Link href="/All">All</Nav.Link>
            </Nav.Item>

            {
                category?.map((data,index) => (
                    <Nav.Item>
                        <Nav.Link href={`/${data.name}`} eventKey={`link-${index+1}`}>{data.name}</Nav.Link>
                    </Nav.Item>
                ))
            }

            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Nabtab;