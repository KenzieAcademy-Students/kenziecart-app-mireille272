import React, { useState } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { CheckoutForm, ErrorBoundary, LoadingSpinner } from 'components'
import { useProvideCart } from 'hooks'
import { createOrder } from 'utils/axiosService'
import { Link } from 'react-router-dom'
import { calculateCartTotal } from 'hooks/useCart'

const initialState = {
  isSubmitting: false,
  isConfirmed: false,
  errorMessage: null,
}
export default function CheckoutPage(props) {
  const [data, setData] = useState(initialState)
  const { state, resetCart, } = useProvideCart()

  const placeOrder = async (orderFormData) => {
    console.log('handlePlaceOrder', orderFormData)

    let orderData = {
      customerDetails: orderFormData,
      items: state.cart,
      coupon:state.coupon,
      orderTotal: calculateCartTotal(state.cart, state.coupon ? state.coupon.discount: 0),
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    try {
      const orderConfirmation = await createOrder(orderData)
      console.log(orderConfirmation)
      toast('Order Placed Successfully')
      toast(`Your order id is ${orderConfirmation.data}`)
      resetCart()
      setData({
        isSubmitting: false,
        isConfirmed: true,
        errorMessage: null,
      })
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: 'Error Placing Order',
      })
    }
  }

  if (data.isSubmitting) {
    return <LoadingSpinner full />
  }

  return (
    <>
      <Jumbotron
        className='text-info'
        style={{
          backgroundImage: "url('/hero_image.png')",
          backgroundSize: 'cover',
          height: '350px',
          marginTop: '45px',
        }}
      >
        <h1 style={{marginTop: '100px'}}>Thank you!</h1>
      </Jumbotron>
      <ErrorBoundary>
        {data.errorMessage && <p className='form-error'>{data.errorMessage}</p>}
        {state.itemCount && !data.isConfirmed ? (
          <CheckoutForm placeOrder={placeOrder} />
        ) : (
          <Container className='h-50'>
            <div className='row justify-content-center'>
              {data.isConfirmed && <p style={{fontSize: '26px', marginBottom: '30px', marginTop: '20px'}}>Your order is confirmed!</p>}

              <div className='col-sm-12 d-flex justify-content-center'>
                <p>You'll receive confirmation in your email shortly.</p>
              </div>
              <div className='col-sm-12 d-flex justify-content-center'>
                <Link to='/'>Continue shopping!</Link>
              </div>
            </div>
          </Container>
        )}
      </ErrorBoundary>
    </>
  )
}
