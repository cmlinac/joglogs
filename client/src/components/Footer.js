import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import ScrollAnimation from 'react-animate-on-scroll';

const Footer = (props) => {
  return (
    <footer id="sticky-footer" className="py-4 text-white">
      <Container>
        <div id="footersectiondesktop">
          <Row>
            <Col>
              <div className="footerLogo">
                <strong>train method<sup>tm</sup></strong>
              </div>
              {/* <ScrollAnimation offset="10" animateOnce animateIn="flipInX"> */}
              <br />
              <a className="icon" href="https://www.facebook.com/trainmethod">
                <i className="fa fa-facebook fa-md white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>

              <a className="icon" href="https://twitter.com/TrainMethod">
                <i className="fa fa-twitter fa-md white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>

              <a className="icon" href="https://www.instagram.com/trainmethod/">
                <i className="fa fa-instagram fa-md white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>
              {/* </ScrollAnimation> */}
            </Col>
            <Col>
           
              <h3>Navigation</h3>
              {/* <ScrollAnimation offset="50" animateOnce animateIn="flipInX"> */}
              <a href="/about">
                About
          </a>
              <br />
              <a href="/">
                Blog
          </a>
              <br />
              <a href="/">
                JLRC
          </a>
              <br />
              <a href="/">
                Jobs
          </a>
          {/* </ScrollAnimation> */}
            </Col>
            <Col>

              <h3>Helpful Links</h3>
              {/* <ScrollAnimation offset="150" animateOnce animateIn="flipInX"> */}
              <a href="/Privacy">
                Privacy
          </a>
              <br />
              <a href="Terms">
                Terms
          </a>
              <br />
              <a href="/Contact">
                Support
          </a>
              <br />
              <a href="/Contact">
                Contact
          </a>
          {/* </ScrollAnimation> */}
            </Col>
          </Row>
        </div>
        <div id="footersectionmobile">
          <Row>
            <Col>
              <div className="footerLogo">
                <strong>train method<sup>tm</sup></strong>
              </div>
              </Col>
              <Col>
              
              <a className="icon" href="https://www.facebook.com/trainmethod">
                <i className="fa fa-facebook fa-md white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>

              <a className="icon" href="https://twitter.com/TrainMethod">
                <i className="fa fa-twitter fa-md white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>

              <a className="icon" href="https://www.instagram.com/trainmethod/">
                <i className="fa fa-instagram fa-md white-text mr-md-5 mr-3 fa-2x"> </i>
              </a>

              </Col>
          </Row>
          <br />
          <Row>
            <Col>
           
              <h3>Navigation</h3>
              {/* <ScrollAnimation offset="10" animateOnce animateIn="flipInX"> */}
              <a href="/about">
                About
          </a>
              <br />
              <a href="/">
                Blog
          </a>
              <br />
              <a href="/">
                JLRC
          </a>
              <br />
              <a href="/">
                Jobs
          </a>
          {/* </ScrollAnimation> */}
            </Col>
            <Col>

              <h3>Helpful Links</h3>
              {/* <ScrollAnimation offset="10" animateOnce animateIn="flipInX"> */}
              <a href="/Privacy">
                Privacy
          </a>
              <br />
              <a href="Terms">
                Terms
          </a>
              <br />
              <a href="/Contact">
                Support
          </a>
              <br />
              <a href="/Contact">
                Contact
          </a>
          {/* </ScrollAnimation> */}
            </Col>
          </Row>
        </div>
        <br />
        </Container> 
            <div className="container text-center text-white-50">
              <div className="row">
                <div className="col-md-12">
                  <small>Copyright &copy; 2019 Train Method<sup>tm</sup></small>
                </div>
              </div>
            </div>
    </footer>
  );
}

export default Footer;