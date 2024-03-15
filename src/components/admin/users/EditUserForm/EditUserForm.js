import React, { useState } from 'react';
import classes from './EditUserForm.module.css';

import Form from '../../../general/UI/Form/Form';

const EditUserForm = props => {
    const [userForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter username',
            },
            value: props.userDetails.name,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter user email',
            },
            value: props.userDetails.email,
        },
        role: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {
                        displayValue: 'admin',
                        value: 'admin',
                    },
                    {
                        displayValue: 'user',
                        value: 'user',
                    }
                ]
            },
            value: props.userDetails.role,
        }
    });

    return (
        <div className={classes.EditUserForm}>
            <Form
                form={userForm}
                buttonText='Update'
                dataProcessed={data => props.userEdited(data)} ></Form>
        </div>
    )
}

export default EditUserForm;