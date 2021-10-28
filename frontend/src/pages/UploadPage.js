import React, { useState } from 'react'
import axios from 'axios';
import { Loader } from 'rsuite';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/rsuite
 * @reference https://tachyons.io/components/forms/sign-in/index.html
 * @reference https://github.com/jaewonhimnae/react-shop-app/blob/master/client/src/components/views/UploadProductPage/UploadProductPage.js
 * @reference https://github.com/basir/amazona/blob/master/frontend/src/screens/ProductEditScreen.js
 */

const Surface = [
    { key: "Select", value: "Select" },
    { key: "Metal", value: "Metal" },
    { key: "Glass", value: "Glass" },
    { key: "Ceramic", value: "Ceramic" },
    { key: "Paper", value: "Paper" },
    { key: "Wood", value: "Wood" },
    { key: "Plastic", value: "Plastic" },
    { key: "Stainless Steel", value: "Stainless Steel" },
    { key: "Aluminum", value: "Aluminum" },
    { key: "Copper", value: "Copper" },
    { key: "Other", value: "Other" },
]

function UploadProductPage(props) {

    const [name, setName] = useState("")
    const [image, setImage] = useState([])
    const [description, setDescription] = useState("")
    const [brand, setBrand] = useState("")
    const [inStock, setinStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [deposit, setDeposit] = useState(0)
    const [surface, setSurface] = useState(1)
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');


    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onImageChange = (event) => {
        setImage(event.target.value)
    }

    const onDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const onPriceChange = (event) => {
        setPrice(event.target.value)
    }
    const onDepositChange = (event) => {
        setDeposit(event.target.value)
    }
    const onBrandChange = (event) => {
        setBrand(event.target.value)
    }

    const onSurfaceChange = (event) => {
        setSurface(event.target.value)
    }
    const oninStock = (event) => {
        setinStock(event.target.value)
    }


    const onSubmit = (event) => {
        event.preventDefault();


        if (!name || !description || !price || !deposit || !inStock ||
            !surface || !image || !brand || surface === "Select") {
            return window.confirm('All the blanks need to be filled in!')
        }

        const elements = {
            name: name,
            description: description,
            price: price,
            deposit: deposit,
            image: image,
            surface: surface,
            brand: brand,
            inStock: inStock,
        }
        axios.post('/api/products/upload', elements)
            .then(response => {
                if (response.data.success) {
                    alert('Product is uploaded now')
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })

    }
    const uploadButton = async (event) => {
        const file = event.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file); // the same 'image' in the imageRouter
        setLoadingUpload(true);
        try {

            const { data } = await axios.post('/api/imageUpload', bodyFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setImage(data);
            setLoadingUpload(false)
        } catch (error) {
            setErrorUpload(console.error('error!'))
        }

    }
    return (

        <div className="measure center" onSubmit={onSubmit}>

            <main className="pa4 black-80">

                <legend className="f1 fw6 ph0 mh0">Upload Rent Product</legend>


                <div className="mt3" />
                <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    onChange={onNameChange}
                    value={name}
                />


                <div className="mt3">
                    <label className="db fw6 lh-copy f4" htmlFor="imageFile">Image File</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="file"
                        id="ImageFile"
                        label="Choose Image"
                        onChange={uploadButton}>
                    </input>
                    {loadingUpload && <div> <Loader speed="fast" content="Loading" /></div>}
                    {errorUpload && <div>error</div>}
                </div>
                <div className="mt3" />
                <label className="db fw6 lh-copy f4" htmlFor="image">Image Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    onChange={onImageChange}
                    value={image}
                />
                <div className="mt3" />
                <label className="db fw6 lh-copy f4">Description</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    onChange={onDescriptionChange}
                    value={description}
                />

                <div className="mt3" />
                <label className="db fw6 lh-copy f4">Brand</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="brand"
                    onChange={onBrandChange}
                    value={brand}
                />
                <div className="mt3" />
                <label className="db fw6 lh-copy f4">Price</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="number"
                    onChange={onPriceChange}
                    value={price}
                />

                <div className="mt3" />
                <label className="db fw6 lh-copy f4">Deposit</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="number"
                    onChange={onDepositChange}
                    value={deposit}
                />
                <div className="mt3" />
                <label className="db fw6 lh-copy f4">InStock</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    onChange={oninStock}
                    value={inStock}
                    type="number"
                />
                <div className="mt3" />
                <label className="db fw6 lh-copy f4">Surface</label>
                <select className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    onChange={onSurfaceChange} value={surface}>
                    {Surface.map(product => (
                        <option key={product.key} value={product.key}>{product.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="submit"
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </main>
        </div>


    )
}

export default UploadProductPage
