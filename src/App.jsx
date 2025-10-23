import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useSearchParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setDrawer } from './redux/slices/basketSlice'
import { calculateBasket, deleteFromBasket } from './redux/slices/basketSlice'
import { CiTextAlignCenter } from 'react-icons/ci'

function App() {

  const { products, drawer, totalAmount } = useSelector((store) => store.basket)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [])

  const deleteItem = (product) => {
    const payload = {
      id: product.id,
      price: product.price,
      image: product.image,
      title: product.title,
      description: product.description,
      count: product.count
    }
    dispatch(deleteFromBasket(payload));
    dispatch(calculateBasket());
  }


  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className='drawer' sx={{ padding: '20px' }} open={drawer} onClose={() => dispatch(setDrawer())} anchor='right'>
          {
            products && products.map((product) => {
              return (
                <div key={product.id} className='flex-row' style={{ padding: '20px' }}>
                  <img style={{ marginRight: '5px' }} src={product.image} width={50} height={50} alt="" />
                  <p style={{ width: '320px', marginRight: '5px' }}>{product.title} ({product.count})</p>
                  <p style={{ fontWeight: 'bold', marginRight: '10px' }}>{product.price} $</p>
                  <button onClick={() => deleteItem(product)} className='deleteButton' >Delete</button>
                </div>
              )
            })
          }
          <div>
            <p style={{ textAlign: 'center' }}>Total : {totalAmount} $</p>
          </div>
        </Drawer>
      </PageContainer>
    </div >
  )
}

export default App
