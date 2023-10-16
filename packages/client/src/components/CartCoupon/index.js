import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Form } from "react-bootstrap"
import "./CartCoupon.scss"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { veriyfyCoupon } from "utils/axiosService"
import { toast } from "react-toastify"

const CartCoupon = ({ coupon, applyCoupon }) => {
  const [code, setCode] = useState(coupon ? coupon.code: " ")
  const [codeAccepted, setCodeAccepted] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await veriyfyCoupon(code)
      console.log(response)
      applyCoupon(response.data)
      setCodeAccepted(true)
    } catch (error) {
        setCodeAccepted(false)
        toast.error("Invalid code")

    }
  }
  return (
    <Container className="car t-coupon"> 
      <Row as={Form} onSubmit={handleSubmit}>
        <Col as={Form.Group}>
          {!codeAccepted ? (
            <Form.Control
              type="text"
              name="code"
              value={code}
              placeholder="Coupon"
              isInvalid={codeAccepted === false}
              onChange={(e) => setCode(e.target.value)}
            />
          ) : (
            <span>{coupon.code} ({coupon.discount * 100}% off)</span>
          )}
        </Col>
        <Col
          as={Form.Group}
          xs={12}
          md={6}
          className="d-flex flex-coloumn-reverse"
        />
        <Button type="submit" variant="info" disabled={codeAccepted}>
          Apply
        </Button>
      </Row>
    </Container>
  )
}

export default CartCoupon
