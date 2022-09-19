import React from 'react'
import { Menubar } from 'primereact/menubar'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'

export default function Navbar() {

    const start =
        <h3>NewsBox</h3>;
    const end =
        <div>
            <InputText placeholder="Find article by name" type="text" />
            {" "}
            <Button label="Sign-in" icon="pi pi-sign-in" />
        </div>

    return (
        <div>
            <div className="card">
                <Menubar start={start} end={end} />
            </div>
        </div>
    );
}


