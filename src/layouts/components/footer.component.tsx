import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import {observer} from 'mobx-react';
import {useStores} from '@/stores';

const Footer = observer(() => {
  const {
    appStore: {footerView},
  } = useStores();
  return (
    <footer
      className={`footer bottom-0 w-full ${
        footerView.visible ? 'shown' : 'hidden'
      }`}
    >
      <Container fluid>
        <Row className='text-muted'>
          <Col xs='6' className='text-left'>
            <ul className='list-inline'>
              <li className='list-inline-item'>
                <span className='text-muted'>
                  Powered by LimsPlus Solutions Private Limited.
                </span>
              </li>
            </ul>
          </Col>
          <Col xs='6' className='text-right'>
            <p className='mb-0'>
              <span className='text-muted'>
                Copyright &copy; {new Date().getFullYear()} - LimsPlus, All
                rights reserved.
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
});

export default Footer;
