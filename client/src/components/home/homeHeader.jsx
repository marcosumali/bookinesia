import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class homeHeader extends Component {
  constructor() {
    super()
    this.state = {
      carouselIndex: 0,
      carousels: [{
        header: 'Booking is easier with Bookinesia.',
        description: 'Book your favourite service provider anywhere and anytime in 3 easy steps.',
        imagePath: 'branch-mobile-min.png'
      }, {
        header: 'Step 1',
        description: 'After selecting your shop, choose your preferred services provided in the list.',
        imagePath: 'service-mobile-min.png'
      }, {
        header: 'Step 2',
        description: 'Then choose your preferred provider and get your queuing number.',
        imagePath: 'barber-mobile-min.png'
      }, {
        header: 'Step 3',
        description: `Next, enter your name, active email, active phone number and click 'Confirm and Book'.`,
        imagePath: 'customer-mobile-min.png'
      }, {
        header: 'Voilà !',
        description: `You have successfully booked an appointment with with ease.`,
        imagePath: 'success-mobile-min.png'
      }, {
        header: 'Enjoy your cup of tea',
        description: `while checking your active queuing number in real time. No need to refresh!`,
        imagePath: 'transaction-mobile-min.png'
      }],
    }
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.carouselIndex < this.state.carousels.length-1) {
        this.changeCarouselIndex(this.state.carouselIndex + 1)
      } else {
        this.changeCarouselIndex(0)
      }
    }, 5000)
  }

  changeCarouselIndex = (index) => {
    this.setState({
      carouselIndex: index
    })
  }
  
  render() {
    let width = window.innerWidth
    return (
      <div className="row Header-outer-box">
        {
          width < 768 ?
          <div className="col s12 No-margin No-padding">
            <div className="col s12 No-margin No-padding">
              {
                this.state.carousels && this.state.carousels.map((carousel, index) => {
                  return this.state.carouselIndex === index ?
                    <div className="col s12 No-margin No-padding" key={ 'carousel' + index }>
                      <div className="col s12 No-margin No-padding">
                        <div className="col s12">
                          <div className="col s12 Header-tag-box">
                            <div className="Header-tag-text">Booking Service Reinvented</div>
                          </div>
                        </div>

                        <div className="col s12">
                          <div className="col s12 Header-box">
                            <div className="Header-text">{ carousel.header }</div>
                          </div>
                        </div>

                        <div className="col s12">
                          <div className="col s12 Header-desc-box">
                            <div className="Header-desc-text">{ carousel.description }</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col s12 No-margin No-padding">
                        <div className="col s12 Container-center">
                          <div className="col s10 No-margin Image-box">
                            <img 
                              className="Image-home" 
                              src={ process.env.PUBLIC_URL + `/assets/img/home/${carousel.imagePath}` } 
                              alt={ 'home-img' + index }
                            />
                          </div>
                        </div>

                        <div className="Dot-box">
                          {
                            this.state.carousels && this.state.carousels.map((carousel, index) => {
                              return this.state.carouselIndex === index ?
                              <div 
                                className="Dot-10-blue Dot-position" 
                                key={ 'carousel-dot' + index }
                              ></div>
                              :
                              <div 
                                className="Dot-10-grey Dot-position" 
                                onClick={ () => this.changeCarouselIndex(index) }
                                key={ 'carousel-dot' + index }
                              ></div>
                            })
                          }
                        </div>
                      </div>

                    </div>
                    :
                    <div key={ 'carousel' + index } ></div>
                })
              }
            </div>
          </div>
          :
          <div className="col m12 No-margin No-padding">
            <div className="col m5 Container-center">
              {
                this.state.carousels && this.state.carousels.map((carousel, index) => {
                  return this.state.carouselIndex === index ?
                  <div className="col m12 l10 No-padding Container-center" key={ 'carousel' + index }>
                    <div className="col m9 l8 No-margin Image-box">
                      <img 
                        className="Image-home" 
                        src={ process.env.PUBLIC_URL + `/assets/img/home/${carousel.imagePath}` } 
                        alt={ 'home-img' + index }
                      />
                    </div>
                  </div>
                  :
                  <div key={ 'carousel' + index } ></div>
                })
              }
            </div>
            <div className="col m6 Header-inner-box No-padding">
              {
                this.state.carousels && this.state.carousels.map((carousel, index) => {
                  return this.state.carouselIndex === index ?
                  <div className="col m12 No-margin No-padding" key={ 'carousel' + index }>
                    <div className="col m12 No-padding">
                      <div className="col m12 No-padding Header-tag-box">
                        <div className="Header-tag-text">Booking Service Reinvented</div>
                      </div>
                    </div>

                    <div className="col m12 No-padding">
                      <div className="col m12 No-padding Header-box">
                        <div className="Header-text">{ carousel.header }</div>
                      </div>
                    </div>

                    <div className="col m12 No-padding">
                      <div className="col m12 No-padding Header-desc-box">
                        <div className="Header-desc-text">{ carousel.description }</div>
                      </div>
                    </div>
                    <div className="col m12 No-padding">
                      <div className="col m12 No-padding Dot-box Container-center-cross">
                        {
                          this.state.carousels && this.state.carousels.map((carousel, index) => {
                            return this.state.carouselIndex === index ?
                            <div 
                              className="Dot-10-blue Dot-position" 
                              key={ 'carousel-dot' + index }
                            ></div>
                            :
                            <div 
                              className="Dot-10-grey Dot-position" 
                              onClick={ () => this.changeCarouselIndex(index) }
                              key={ 'carousel-dot' + index }
                            ></div>
                          })
                        }
                      </div>
                    </div>
                  </div>
                  :
                  <div key={ 'carousel' + index }></div>
                })
              }

            </div>
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    shops: state.shop.shops,
    shopsExist: state.shop.shopsExist,
    shopsLoading: state.shop.shopsLoading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (homeHeader);
