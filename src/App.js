import React, { Component } from 'react';
import cross from './img/cross.png';
import candle0 from './img/candle.jpg';
import candle1 from './img/candle1.jpeg';
import кендл from './img/кендл.jpg';


import './App.css';
import { Button, ButtonGroup, Row, Col, Container, Card } from 'react-bootstrap';


 
class CandlePanel extends Component {

  state = {display: true};

  close = () => {
    this.setState({display: false})
  }

  render() { 
    const { addCandleHandler} = this.props

    if (!this.state.display) {
      return <div><h1>You'll be in hell</h1></div>

    } else {
      return (
        <Card style={{ width: '18rem' }} >
          <Card.Img variant="top" src={ cross } style={{ width: '18px' }} onClick={ this.close } />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary" onClick={ addCandleHandler }>поставить свечку</Button>
          </Card.Body>
        </Card>
      );
    }
  }
}


class Candle extends Component {
  render() {
    const { candleType } = this.props 
    const candlePic = [candle0, candle1, кендл]
    
    return <img src={ candlePic[candleType] } style={{ width: '5rem', margin: "10px 10px 10px 10px "}}></img>
  }
}


class Menu extends Component {
  state = {selectedButton: 0}

  selectCandleHandler = (id) => () => {
    this.props.cardType(id)
    this.setState({selectedButton: id})
  }

  render() {
    const { selectedButton } = this.state
    const variants = ['За упокой', 'За здравие', 'За енко']

    const buttons = variants.map((element, i) => (
      <Button variant={ i===selectedButton?'primary':'secondary' } 
              onClick={ this.selectCandleHandler(i) }>{ element }</Button>)
      )

    return <Card >
        <Card.Body>
          <Card.Title>Choose your свечку</Card.Title>
          <ButtonGroup vertical aria-label="Basic example">
            { buttons }
          </ButtonGroup>
        </Card.Body>
      </Card>

  };
}

class App extends Component {
  state = {
    lastCandleType: 0,
    candles: []
  }
 
  addCandleHandler = () => {
    const lastCandleType = this.state.lastCandleType
    this.setState(prevState=> {
      let bufCandles = prevState.candles
      bufCandles.push(prevState.lastCandleType)      
      const newState = Object.assign({}, this.state, bufCandles)
      return newState
    
    })
  }

  selectCandleHandler = (selectedButton) => {
    this.setState({lastCandleType: selectedButton})
  }

  render() {
    const candles = [];
    //refactor via foreach
    for (let i=0; i<this.state.candles.length; i++){
        candles.push(<Candle candleType={ this.state.candles[i] }/>)
    }

    return (
        <div>
          <Row>
            <Col lg="8" md="auto">
              <Row className="justify-content-md-center">
                <Col lg="6">
                  { candles }
                </Col>

                <CandlePanel addCandleHandler={ this.addCandleHandler } />
                
                <Col lg="6">
                
                </Col>

              </Row>
            </Col>

            <Col lg="4">
              <Row>
                <Col lg="8"></Col>
                <Col lg="4">
                  <Menu cardType={ this.selectCandleHandler }/>
                </Col>
                
              </Row>
              
            </Col>
          </Row>
          
        </div>
    );
  }
}

export default App;
