import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">
        <Col xs="6" className="text-left">
          <ul className="list-inline">
            <li className="list-inline-item">
              <span className="text-muted">
                Powered by LimsPlus Solutions Private Limited.
              </span>
            </li>
          </ul>
        </Col>
        <Col xs="6" className="text-right">
          <p className="mb-0">
            <span className="text-muted">Copyright &copy; {new Date().getFullYear()} -{" "} LimsPlus, All rights reserved.</span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
)

export default Footer
