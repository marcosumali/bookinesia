import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';

import '../../../assets/css/general.css';
import './shopBranches.css';
import { getBranchesData, setParams } from '../../../store/firestore/shop/shop.actions';

class branchCard extends Component {
  componentWillMount() {
    let shopName = this.props.shopName
    this.props.getBranchesData(shopName)
  }

  render() {
    // console.log('from branch card', this.props)
    return (
      <div className="row No-margin">
        {
          this.props.branchesExists ?
          <div>
            {
              this.props.branchesLoading ?
              // Loading Getting Data From Database
              <div className="Branch-card-container">
                <div className="Branch-image">
                  <div className="Loading-branch-image"></div>
                </div>
                <div className="Branch-description-box Container-center-cross">
                  <div className="col s8 Branch-description-container No-padding">
                    <div className="col s12 No-padding Container-one-line Margin-b-4">
                      <div className="col s12 No-padding Container-one-line">
                        <div className="Loading-branch-name Margin-r-10"></div>
                        <div className="Loading-branch-status"></div>
                      </div>
                    </div>
                    <div className="col s12 No-padding Container-one-line">
                      <div className="Loading-branch-hours"></div>
                    </div>
                  </div>
                  <div className="col s4 No-padding Book-button-container Container-end">
                    <div className="Loading-book-box"></div>
                  </div>
                </div>
              </div>
              :
              // Finish Getting Data From Database
              <div>
                {
                  this.props.branches && this.props.branches.map((branch, index) => {
                    return (
                      <div className="Branch-card-container animated fadeIn" key={ 'branch' + index }>
                        <div className="Branch-image">
                          <Link to={ `/detail/${branch.shopId}/${branch.name}` }>
                            <img className="Branch-image" src={ branch.picture } alt="branch-img" />
                          </Link>
                        </div>
                        <div className="Branch-description-box Container-center-cross">
                          <div className="col s8 Branch-description-container No-padding">
                            <div className="col s12 No-padding Container-one-line Margin-b-4">
                              <p className="Branch-name No-margin Text-capitalize">{ branch.name }</p>
                              {
                                branch.openStatus === 'open' ?
                                <div className="Branch-status-box Container-center">
                                  <p className="Branch-status No-margin Text-capitalize">{ branch.openStatus }</p>
                                </div>
                                :
                                <div className="Branch-status-box-close Container-center">
                                  <p className="Branch-status No-margin Text-capitalize">{ branch.openStatus }</p>
                                </div>
                              }
                            </div>
                            <p className="Branch-opening-hours No-margin">Opening Hours: {branch.openHours}.{branch.openMinutes} - {branch.closeHours}.{branch.closeMinutes} </p>
                          </div>
                          <div className="col s4 No-padding Book-button-container Container-end">
                            <Link to={ `/book/now/${branch.shopId}/${branch.name}` }>
                              <div className="Book-button-box Container-center">
                                <p className="Book-button-text No-margin">Book Now</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
          :
          <Redirect to="/branches-not-found"/>
        }

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    branches: state.shop.branches,
    branchesLoading: state.shop.branchesLoading,
    branchesExists: state.shop.branchesExists
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getBranchesData,
  setParams
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps) (branchCard);