import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => (
  <footer className="footer">
    <Container fluid>
      <Row className="text-muted">
        <Col xs="6" className="text-left">
          <ul className="list-inline">
            <li className="list-inline-item">
              <span className="text-muted">Support</span>
            </li>
            <li className="list-inline-item">
              <span className="text-muted">Help Center</span>
            </li>
            <li className="list-inline-item">
              <span className="text-muted">Privacy</span>
            </li>
            <li className="list-inline-item">
              <span className="text-muted">Terms of Service</span>
            </li>
          </ul>
        </Col>
        <Col xs="6" className="text-right">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <span className="text-muted">Lims Plus</span>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
