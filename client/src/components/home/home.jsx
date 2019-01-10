import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import '../../assets/css/general.css';
import './home.css';
import { getShopsData } from '../../store/firestore/shop/shop.actions';

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
        header: 'Enjoy your cup of tea',
        description: `while checking your active queue number in your transaction in real time. No need to refresh !`,
        imagePath: 'transaction-mobile-min.png'
      }],
      loadingBox: [1]
    }
  }

  componentWillMount() {
    this.props.getShopsData()
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
    
    // Hardcode Image measurement
    // let imageUnderWidth = 240
    // let imageUnderHeight = 405
    // let imageOverWidth = 203.3
    // let imageOverHeight = 346
    // let imageOverPaddingLeft = 18.5
    let headerHeight = 104.45
    let navbarHeight = 56
    
    // Image measurement
    let imageUnderHeight = innerHeight - headerHeight - navbarHeight
    let imageUnderWidth = imageUnderHeight * 0.5925
    let imageOverHeight = imageUnderHeight * 0.8543
    let imageOverWidth = imageOverHeight * 0.5875
    let imageOverPaddingLeft = (imageUnderWidth - imageOverWidth) / 2

    // Style Inliner
    let firstPageStyle = {
      width: innerWidth,
      height: imageUnderHeight + headerHeight
    }

    let secondPageStyle = {
      width: innerWidth,
      height: 1050,
      marginTop: firstPageStyle.height,
    }

    let thirdPageStyle = {
      width: innerWidth,
      height: innerHeight,
      marginTop: firstPageStyle.height + secondPageStyle.height
    }

    let imageUnderStyle = {
      marginLeft: (innerWidth - imageUnderWidth) / 2
    }

    let imageOverStyle = {
      marginTop: imageUnderHeight * 0.13,
      marginLeft: ((innerWidth - imageUnderWidth) / 2) + imageOverPaddingLeft
    }

    // console.log('from home', this.props)
    return (
      <div className="row No-margin No-padding">
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

        <div className="Second-section Container-center" style={ secondPageStyle }>
          <div className="col s12 Container-center Margin-b-40 Margin-t-40">
            <div className="Section-text-header">Why Bookinesia?</div>
          </div>
          <div className="col s12 Container-center Margin-b-40">
            <div className="col s12 Container-center Margin-b-16">
              <div className="Icon-border Container-center">
                <img className="Icon" src={ process.env.PUBLIC_URL + '/assets/svg/icon/calendar.svg' } alt="online-icon"/>
              </div>
            </div>
            <div className="col s12 Container-center Margin-b-8">
              <div className="Icon-text-header">Online Booking</div>
            </div>
            <div className="col s12 Container-center">
              <div className="Icon-text">Book an appointment online with your favourite barber anywhere and anytime as you pleased.</div>
            </div>
          </div>
          <div className="col s12 Container-center Margin-b-40">
            <div className="col s12 Container-center Margin-b-16">
              <div className="Icon-border Container-center">
                <img className="Icon" src={ process.env.PUBLIC_URL + '/assets/svg/icon/no-phone.svg' } alt="no-phone-icon"/>
              </div>
            </div>
            <div className="col s12 Container-center Margin-b-8">
              <div className="Icon-text-header">No Registration</div>
            </div>
            <div className="col s12 Container-center">
              <div className="Icon-text">No registration are required to place a booking. Don't worry, we still keep track your transaction.</div>
            </div>
          </div>
          <div className="col s12 Container-center Margin-b-40">
            <div className="col s12 Container-center Margin-b-16">
              <div className="Icon-border Container-center">
                <img className="Icon" src={ process.env.PUBLIC_URL + '/assets/svg/icon/hourglass.svg' } alt="real-time-icon"/>
              </div>
            </div>
            <div className="col s12 Container-center Margin-b-8">
              <div className="Icon-text-header">Real Time Queuing</div>
            </div>
            <div className="col s12 Container-center">
              <div className="Icon-text">You can monitor your queuing number in the transaction menu so you can make the most of your time.</div>
            </div>
          </div>
          <div className="col s12 Container-center Margin-b-40">
            <div className="col s12 Container-center Margin-b-16">
              <div className="Icon-border Container-center">
                <img className="Icon" src={ process.env.PUBLIC_URL + '/assets/svg/icon/bell.svg' } alt="notif-icon"/>
              </div>
            </div>
            <div className="col s12 Container-center Margin-b-8">
              <div className="Icon-text-header">Up To Date Notification</div>
            </div>
            <div className="col s12 Container-center">
              <div className="Icon-text">We will send email notifications to remind your booking so you can arrive on time.</div>
            </div>
          </div>
        </div>
        
        <div className="Third-section" style={ thirdPageStyle }>
          <div className="col s12 Container-center Margin-b-40 Margin-t-40">
            <div className="Partner-text-header">Our Registered Barbershop</div>
          </div>
          <div className="col s12 No-margin No-padding Container-center Margin-b-40">
            {
              this.props.shopsLoading ?
              <div className="col s12 No-margin No-padding Container-center">
                {
                  this.state.loadingBox.map((shopLoading, index) => {
                    return (
                      <div className="col s6 No-margin No-padding Container-center" key={ 'shop' + index }>
                        <div className="col s12 No-margin No-padding Container-center Margin-b-8">
                          <div className="Home-shop-loading"></div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              :
              <div className="Container-center">
                {
                  this.props.shops && this.props.shops.map((shop, index) => {
                    return (
                      <Link className="col s6 No-margin No-padding Container-center animated fadeIn faster" to={ `/shop/${shop.id}` } key={ 'shop' + index }>
                        <div className="col s12 No-margin No-padding Container-center">
                          <div className="col s12 No-margin No-padding Container-center Margin-b-8">
                            <img className="Home-shop-logo" src={ shop.logo } alt={ 'image' + index } />
                          </div>
                          <div className="col s12 No-margin No-padding Container-center">
                            <div className="Text-capitalize Home-shop-name">{ shop.name }</div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
            }
          </div>
        </div>

      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    shops: state.shop.shops,
    shopsExist: state.shop.shopsExist,
    shopsLoading: state.shop.shopsLoading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getShopsData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (home);
