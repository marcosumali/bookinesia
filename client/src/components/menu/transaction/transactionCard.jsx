import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import '../../../assets/css/general.css';
import './transaction.css';
import { returnWhatDay, returnWhatMonth } from '../../../helpers/date';
import { getTotalTransaction, formatMoney } from '../../../helpers/currency';
import TransactionStatusDiv from './transactionStatusDiv';

class transactionCard extends Component {
  render() {
    // console.log('from transaction card', this.props)
    return (
      <div className="col s12 m6 l3 No-margin Container-center Margin-b-32">
        <div className="Container-center">
          <div className="Card-box-no-p Container-center-cross">
  
            {/* Transaction Card Header */}
            <div className="Branch-header-container Container-center-cross Padding-10">
              <div className="col s3 Height-100 No-padding No-margin Container-center">
                <img src={ this.props.transaction.shop.logo } className="No-padding Trans-shop-logo animated fadeIn" alt="Shop-logo" />
              </div>
              <div className="col s9 Height-100 No-margin No-padding Container-center">
                <div className="col s12 No-padding Container-center">
                  <div className="col s12 No-padding No-margin">
                    <p className="No-margin Branch-header-date Text-capitalize animated fadeIn">
                      { returnWhatDay(Number(new Date(this.props.transaction.appointment.date).getDay())) },
                      &nbsp;{ new Date(this.props.transaction.appointment.date).getDate() }
                      &nbsp;{ returnWhatMonth(Number(new Date(this.props.transaction.appointment.date).getMonth())) }
                      &nbsp;{ new Date(this.props.transaction.appointment.date).getFullYear() }
                    </p>
                  </div>
                  <div className="col s12 No-padding No-margin">
                    <p className="No-margin Shop-header-name Text-capitalize animated fadeIn">{ this.props.transaction.shop.name }</p>
                  </div>
                  <div className="col s12 No-padding No-margin">
                    <p className="No-margin Branch-header-name Text-capitalize animated fadeIn">{ this.props.transaction.branch.name }</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="Branch-header-container Container-center-cross Padding-10">
              <div className="col s3 Height-100 No-padding No-margin Container-center">
                <img src={ this.props.transaction.staff.picture } className="No-padding Staff-image animated fadeIn" alt="Barber-img" />
              </div>
              <div className="col s9 Height-100 No-margin No-padding Container-center">
                <div className="col s12 No-padding No-margin Container-center-cross">
                  <div className="col s7 No-padding No-margin">
                    <p className="No-margin Shop-header-name Text-capitalize animated fadeIn">{ this.props.transaction.staff.name }</p>
                  </div>
                  <div className="col s5 No-padding No-margin">
                    <TransactionStatusDiv transaction={ this.props.transaction }/>
                  </div>
                </div>
                <div className="col s12 No-padding No-margin">
                  <p className="No-margin Branch-header-name Text-capitalize animated fadeIn">Queue No. { this.props.transaction.queueNo }</p>
                </div>
                <div className="col s12 No-padding No-margin">
                  <p className="No-margin Branch-header-name Text-capitalize animated fadeIn" style={{ color: '#666666' }} >Total Amount: { this.props.transaction.service[0].currency } { formatMoney(getTotalTransaction(this.props.transaction.service)) }</p>
                </div>
              </div>
            </div>
    
            {/* Transaction Details Button */}
            <Link to={ `/transaction/details/${this.props.transaction.id}` } style={{ width: '100%' }} >
              <div className="Button-details-box Container-center">
                  <div className="Schedule-text-white">Transaction Details</div>
              </div>
            </Link>
  
          </div>
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


export default connect(mapStateToProps, mapDispatchToProps) (transactionCard);

