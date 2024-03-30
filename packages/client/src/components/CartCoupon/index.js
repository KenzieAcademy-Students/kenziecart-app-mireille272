import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Form } from "react-bootstrap"
import "./CartCoupon.scss"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { verifyCoupon } from "utils/axiosService"
import { toast } from "react-toastify"

const CartCoupon = ({ coupon, applyCoupon }) => {
  console.log(coupon)
  const [code, setCode] = useState(coupon ? coupon.code : "")
  const [codeAccepted, setCodeAccepted] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await verifyCoupon(code)
      console.log(response)
      applyCoupon(response.data)
      setCodeAccepted(true)
    } catch (error) {
      setCodeAccepted(false)
      toast.error("Invalid code")
    }
  }
  console.log(code)

  console.log(code)
  return (
    <Container className="cart-coupon">
      <Row as={Form} onSubmit={handleSubmit}>
        <Col as={Form.Group}>
          {!codeAccepted ? (
            <Form.Control
              type="text"
              name="code"
              value={code}
              placeholder="Coupon"
              isInvalid={codeAccepted === false}
              onChange={(e) => setCode(e.target.value.trim())}
            />
          ) : (
            <span>
              {coupon.code} ({coupon.discount * 100}% off)
            </span>
          )}
        </Col>
        <Col
          as={Form.Group}
          xs={12}
          md={6}
          className="d-flex flex-column-reverse"
        />
        <Button type="submit" variant="info" disabled={codeAccepted}>
          Apply
        </Button>
      </Row>
    </Container>
  )
}

export default CartCoupon
