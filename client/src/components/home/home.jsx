import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../../assets/css/general.css';
import './home.css';

class home extends Component {
  constructor() {
    super()
    this.state = {
      carouselIndex: 0,
      carousels: [{
        header: 'Booking Service Reinvented',
        description: 'Easy access to book your favourite barber anywhere and anytime in 3 easy steps.',
        imagePath: 'branch-mobile-min.png'
      }, {
        header: 'Step 1',
        description: 'After selecting your barbershop, choose your preferred services provided by your barber.',
        imagePath: 'service-mobile-min.png'
      }, {
        header: 'Step 2',
        description: 'Then choose your preferred barber and get your queuing number which you can monitor later.',
        imagePath: 'barber-mobile-min.png'
      }, {
        header: 'Step 3',
        description: `Next step, enter your name, active email, active phone number and click 'Confirm and Book'.`,
        imagePath: 'customer-mobile-min.png'
      }, {
        header: 'Voilà !',
        description: `You have successfully booked an appointment with your favourite barber with ease.`,
        imagePath: 'success-mobile-min.png'
      }, {
        header: 'Enjoy Your Cup of Tea',
        description: `while checking your active queue number in your transaction in real time. No need to refresh !`,
        imagePath: 'transaction-mobile-min.png'
      }]
    }
  }

  changeCarouselIndex (index) {
    this.setState({
      carouselIndex: index
    })
  }

  render() {
    // Window measurement
    let innerWidth = window.innerWidth
    let innerHeight = window.innerHeight
    let headerHeight = 97.45 + 10 // 97.45 is min height of header from mobile and 10 is margin top of header
    
    // Image measurement
    let imageUnderWidth = 240
    let imageUnderHeight = 405
    let imageOverWidth = 203.3
    let imageOverHeight = 346
    let imageOverPaddingLeft = 18.5

    // Style Inliner
    let firstPageStyle = {
      width: innerWidth,
      height: imageUnderHeight + headerHeight
    }

    let secondPageStyle = {
      width: innerWidth,
      height: innerHeight,
      marginTop: imageUnderHeight + headerHeight
    }

    let imageUnderStyle = {
      marginLeft: ((innerWidth - imageUnderWidth)/2)
    }

    let imageOverStyle = {
      marginLeft: (((innerWidth - imageUnderWidth)/2) + imageOverPaddingLeft)
    }

    return (
      <div>
        <div className="First-section" style={ firstPageStyle }>
          {
            this.state.carousels && this.state.carousels.map((carousel, index) => {
              return (
                this.state.carouselIndex === index ?
                <div className="animated fadeIn faster" key={ 'carousel' + index }>
                  <div className="First-section-child Margin-t-8 Padding-10">
                    <div className="Header-box Margin-b-16">
                      <div className="Header-text-h1 Text-center">{ carousel.header }</div>
                    </div>

                    <div className="First-section-child Margin-b-16 Container-center">
                      <div className="Header-description-box">
                        <div className="Header-text Text-center">{ carousel.description }</div>
                      </div>
                    </div>

                    <div className="First-section-child Dot-box Container-center">
                      {
                        this.state.carousels && this.state.carousels.map((carousel, index) => {
                          return (
                            this.state.carouselIndex === index ?
                            <div 
                              className="Dot-10-blue Margin-r-8" 
                              key={ 'carousel-dot' + index }
                            ></div>
                            :
                            <div 
                              className="Dot-10-grey Margin-r-8" 
                              onClick={ () => this.changeCarouselIndex(index) }
                              key={ 'carousel-dot' + index }
                            ></div>
                          )
                        })
                      }
                    </div>
                  </div>

                  <div className="First-section-child Image-box">
                    <img 
                      className="Image-under"
                      style={ imageUnderStyle }
                      width={ `${imageUnderWidth}px` } 
                      height={ `${imageUnderHeight}px` } 
                      src={ process.env.PUBLIC_URL + '/assets/img/home/phone-screen.png' } 
                      alt="under" 
                    />
                    <img 
                      className="Image-over"
                      style={ imageOverStyle }
                      width={ `${imageOverWidth}px` } 
                      height={ `${imageOverHeight}px` } 
                      src={ process.env.PUBLIC_URL + `/assets/img/home/${carousel.imagePath}` } 
                      alt="over" 
                    />
                  </div>
                </div>
                :
                <div key={ 'carousel' + index } ></div>
              )
            })
          }
        </div>

        <div className="Second-section" style={ secondPageStyle }>
          Halo
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (home);
