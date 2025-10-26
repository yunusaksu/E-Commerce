import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice';
import Product from './Product'

function ProduktList() {

    const dispatch = useDispatch()
    const { products, searchTerm } = useSelector((store) => store.product);
    console.log(products)


    useEffect(() => {
        dispatch(getAllProducts());
    }, [])

    // Search filter
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex-row' style={{ flexWrap: 'wrap', marginTop: '25px' }}>
            {
                filteredProducts && filteredProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProduktList