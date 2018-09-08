import React, { Component } from 'react';
import { Jumbotron, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col, Row } from 'reactstrap';

require('../../css/all.css');

const items = [
  {
    src: 'https://res.cloudinary.com/breezeeee/image/upload/v1536130598/mgimss/About/1.jpg',
  },
  {
    src: 'https://res.cloudinary.com/breezeeee/image/upload/v1536130598/mgimss/About/2.jpg',
  },
  {
    src: 'https://res.cloudinary.com/breezeeee/image/upload/v1536130598/mgimss/About/3.jpg',
  },
];

class About extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img className="d-block w-100" src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="24" xl="12">
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} ride="carousel">
                  <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                  {slides}
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                </Carousel>
          </Col>
        </Row>
        <Row>
          <Col xs="12" xl="6">
            <Jumbotron>
              <h1 className="display-3">Welcome</h1>
              <p className="lead">Greetings! Happy to have you here.</p>
              <hr className="my-2" />
              <p>It may take a while before you're familiar with this. Have fun!</p>
            </Jumbotron>
          </Col>
          <Col xs="12" xl="6">
            <Jumbotron>
              <h1 className="display-3">to MGIMSS!</h1>
              <p className="lead">MGIMSS helps you save time and money!</p>
              <hr className="my-2" />
              <p>Comfortable, fast and free life comes from simple clicks!</p>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
