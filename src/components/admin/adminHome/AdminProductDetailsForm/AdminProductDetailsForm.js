import React, { useState } from 'react';

import Form from '../../../general/UI/Form/Form';

const AdminProductDetailsForm = props => {
    const [productDetailsForm] = useState({
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Type product name",
                },
                value: props.action === 'edit' ? props.productDetails.name : '',
            },
            price: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Type product price",
                    min: "1",
                },
                value: props.action === 'edit' ? props.productDetails.price : '',
            },
            image: {
                elementType: "fileInput",
                elementConfig: {
                    type: "file",
                    accept: "image/*",
                    placeholder: "Upload product image",
                },
                value: props.action === 'edit' ? props.productDetails.image : '',
            },
            brand: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Type product brand",
                },
                value: props.action === 'edit' ? props.productDetails.brand : '',
            },
            category: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Type product category",
                },
                value: props.action === 'edit' ? props.productDetails.category : '',
            },
            countInStock: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Type product count in stock",
                    min: "1",
                },
                value: props.action === 'edit' ? props.productDetails.countInStock : '',
            },
            description: {
                elementType: "textarea",
                elementConfig: {
                    placeholder: "Type product description",
                },
                value: props.action === 'edit' ? props.productDetails.description : '',
            },
        })

    
    return (
        <Form
            form={productDetailsForm}
            buttonText={props.config.buttonText}
            dataProcessed={props.config.process}
        />
    )
}

export default AdminProductDetailsForm;