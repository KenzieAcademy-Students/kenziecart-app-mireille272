import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useCurrency } from "../../hooks/UseCurrency"

export default function CartSummary({ cartTotal, discount}) {
  const { state, getPrice } = useCurrency()

  return (
    <div className="cart-summary">
      <Container>
        <Row className="mb-2 summary-item">
          <Col xs="9">
            <p className="summary-label">Free Shipping</p>
          </Col>
          <Col xs="3" className="text-right">
            <p className="summary-value">{getPrice(0)}</p>
          </Col>
        </Row>
        {discount && (
          <Row className="mb-2 summary-item">
            <Col xs={9}>
              <p className="summary-label">Discount</p>
            </Col>
            <Col xs={3} className="text-right">
              <p className="summary-value">{discount * 100}% off</p>
            </Col>
          </Row>
        )}
        <Row className="mb-2 summary-item">
          <Col xs="9">
            <p className="summary-label">Total</p>
          </Col>
          <Col xs="3" className="text-right">
            <p className="summary-value">{getPrice(cartTotal)}</p>
          </Col>
        </Row>
        
        
      </Container>
    </div>
  )
}
