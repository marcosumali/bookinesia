import { returnWhatDay, getStoreOpenStatus } from '../../../helpers/date';

// ---------------------------------------------- GENERAL ACTION ----------------------------------------------
export const setParams = (params) => {
  return {
    type: 'SET_PARAMS',
    payload: params
  }
}

export const clearShopState = () => {
  return {
    type: 'CLEAR_SHOP_STATE',
  }
}

export const setStaffs = (data) => {
  return {
    type: 'SET_STAFFS',
    payload: data
  }
}

export const setRouteLink = (data) => {
  return {
    type: 'SET_ROUTE_LINK',
    payload: data
  }
}


// ---------------------------------------------- SHOP ACTION ----------------------------------------------
export const getShopData = (shopName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()

    let shopRef = firestore.collection('shop').doc(shopName)

    shopRef.get()
    .then(doc => {
      if (doc.exists) {
        let data = doc.data()
        data['id'] = doc.id
        dispatch(getShopDataSuccess(data))
      } else {
        dispatch(getShopDataFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR:Get shop data', err)
    })
  }
}

const getShopDataSuccess = (data) => {
  return {
    type: 'GET_SHOP_DATA_SUCCESS',
    payload: data
  }
}

const getShopDataFailed = (data) => {
  return {
    type: 'GET_SHOP_DATA_FAILED',
    payload: data
  }
}

export const getShopsData = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    let shopRef = firestore.collection('shop')

    shopRef
    .where('disableStatus', '==', false)
    .onSnapshot(snapshot => {
      let shops = []
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          let data = doc.data()
          data['id'] = doc.id
          if (data.id !== 'dummyshop') {
            shops.push(data)
          }
        })
        dispatch(getShopsDataSuccess(shops))
      } else {
        dispatch(getShopsDataSuccess(shops))
      }
    })
  }
}

const getShopsDataSuccess = (data) => {
  return {
    type: 'GET_SHOPS_DATA_SUCCESS',
    payload: data
  }
}

// ---------------------------------------------- BRANCH ACTION ----------------------------------------------
export const getBranchesData = (shopName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()

    let branchRef = firestore.collection('branch')

    branchRef
    .where('shopId', '==', shopName)
    .where('disableStatus', '==', false)
    .get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        let branchesData = []
        snapshot.forEach(doc => {
          let data = doc.data()
          branchesData.push(data)
        })
        dispatch(getSpecificBranchScheduleData(branchesData))
      } else {
        dispatch(getBranchesDataFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR:Get branches data', err)
    })
  }
}

const getBranchesDataSuccess = (data) => {
  return {
    type: 'GET_BRANCHES_DATA_SUCCESS',
    payload: data
  }
}

const getBranchesDataFailed = (data) => {
  return {
    type: 'GET_BRANCHES_DATA_FAILED',
    payload: data
  }
}


export const getBranchData = (shopName, branchName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()

    let branchRef = firestore.collection('branch').doc(`${shopName}-${branchName}`)

    branchRef.get()
    .then(doc => {
      if (doc.exists) {
        let data = doc.data()
        data['id'] = doc.id
        dispatch(getBranchDataSuccess(data))
      } else {
        dispatch(getBranchDataFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR:Get branch data', err)
    })
  }
}

const getBranchDataSuccess = (data) => {
  return {
    type: 'GET_BRANCH_DATA_SUCCESS',
    payload: data
  }
}

const getBranchDataFailed = (data) => {
  return {
    type: 'GET_BRANCH_DATA_FAILED',
    payload: data
  }
}


// ---------------------------------------------- BRANCH SCHEDULE ACTION ----------------------------------------------
const getSpecificBranchScheduleData = (branchesData) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    
    let newDate = new Date(Date.now())
    let dayIndex = newDate.getDay()
    let nowDay = returnWhatDay(dayIndex)
    let nowYear = newDate.getFullYear()
    let nowMonth = newDate.getMonth()
    let nowDate = newDate.getDate()

    let newBranchesData = []

    await Promise.all(branchesData.map(async (branchData) => {
      let shopName = branchData.shopId
      let branchName = branchData.name

      let branchScheduleRef = firestore.collection('branchSchedule')

      await branchScheduleRef
      .where('branchId', '==', `${shopName}-${branchName}`)
      .where('day', '==', nowDay)
      .get()
      .then(snapshot => {
        if (snapshot.empty === false) {
          snapshot.forEach(doc => {
            let data = doc.data()
            let openingDate = new Date(nowYear, nowMonth, nowDate, Number(data.openHours), Number(data.openMinutes))
            let closingDate = new Date(nowYear, nowMonth, nowDate, Number(data.closeHours), Number(data.closeMinutes))
            let openStatus = getStoreOpenStatus(newDate, openingDate, closingDate)

            if (data.disableStatus === false) {
              let combineData = {
                ...branchData,
                ...data,
                openStatus
              }
              newBranchesData.push(combineData)
            } else {
              let combineData = {
                ...branchData,
                ...data,
                openStatus: 'closed',
              }
              newBranchesData.push(combineData)
            }
          })
        } else {
          dispatch(getBranchesDataFailed(false))
        }
      })
      .catch(err => {
        console.log('ERROR:Get specific branches data', err)
      })
    }))
    await dispatch(getBranchesDataSuccess(newBranchesData))
  }
}


export const getBranchScheduleData = (shopName, branchName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()

    let branchScheduleRef = firestore.collection('branchSchedule')

    branchScheduleRef.where('branchId', '==', `${shopName}-${branchName}`).get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        let branchesScheduleData = []
        snapshot.forEach(doc => {
          let data = doc.data()
          branchesScheduleData.push(data)
        })
        dispatch(getBranchScheduleDataSuccess(branchesScheduleData))
      } else {
        dispatch(getBranchScheduleDataFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR:Get branchesSchedule data', err)
    })

  }
}

const getBranchScheduleDataSuccess = (data) => {
  return {
    type: 'GET_BRANCH_SCHEDULE_DATA_SUCCESS',
    payload: data
  }
}

const getBranchScheduleDataFailed = (data) => {
  return {
    type: 'GET_BRANCH_SCHEDULE_DATA_FAILED',
    payload: data
  }
}


// ---------------------------------------------- SERVICE ACTION ----------------------------------------------
export const getServicesData = (shopName, branchName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()

    let servicesData = []
    let serviceRef = firestore.collection('service')
    await serviceRef
    .where('branchId', '==', `${shopName}-${branchName}`)
    .where('disableStatus', '==', false)
    .get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        snapshot.forEach(doc => {
          let data = doc.data()
          let id = doc.id
          data['id'] = id
          servicesData.push(data)
        })
      } else {
        dispatch(getServicesDataFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR:Get services of branch data', err)
    })

    let staffServicesData = []
    let staffServiceRef = firestore.collection('staffService')
    await staffServiceRef
    .where('branchId', '==', `${shopName}-${branchName}`)
    .where('disableStatus', '==', false)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data()
        let id = doc.id
        data['id'] = id
        staffServicesData.push(data)
      })
    })
    .catch(err => {
      console.log('ERROR:Get staff services of branch data', err)
    })

    let result = []
    servicesData && servicesData.map(service => {
      let serviceIndex = staffServicesData.findIndex(staffService => staffService.serviceId === service.id)
      if (serviceIndex > -1) {
        result.push(service)
      }
      return ''
    })

    await dispatch(getServicesDataSuccess(result))
  }
}


const getServicesDataSuccess = (data) => {
  return {
    type: 'GET_SERVICES_DATA_SUCCESS',
    payload: data
  }
}

const getServicesDataFailed = (data) => {
  return {
    type: 'GET_SERVICES_DATA_FAILED',
    payload: data
  }
}


// ---------------------------------------------- STAFF ACTION ----------------------------------------------
export const getStaffsData = (shopName, branchName) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()

    let staffRef = firestore.collection('staff')

    staffRef
    .where('branchId', '==', `${shopName}-${branchName}`)
    .where('job', '==', 'barber')
    .where('disableStatus', '==', false)
    .get()
    .then(snapshot => {
      if (snapshot.empty === false) {
        let staffsData = []
        snapshot.forEach(doc => {
          let id = doc.id
          let data = doc.data()
          let combineData = {
            ...data,
            id
          }
          staffsData.push(combineData)
        })
        dispatch(getStaffScheduleData(staffsData))
      } else {
        dispatch(getStaffsDataFailed(false))
      }
    })
    .catch(err => {
      console.log('ERROR:Get staffs of branch data', err)
    })
  }
}

const getStaffsDataSuccess = (data) => {
  return {
    type: 'GET_STAFFS_DATA_SUCCESS',
    payload: data
  }
}

const getStaffsDataFailed = (data) => {
  return {
    type: 'GET_STAFFS_DATA_FAILED',
    payload: data
  }
}


// ---------------------------------------------- STAFF SCHEDULE ACTION ----------------------------------------------
const getStaffScheduleData = (staffsData) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    let firestore = getFirestore()
    
    let newStaffsData = []
    await Promise.all(staffsData.map(async (staffData) => {
      let staffId = staffData.id
      
      let staffScheduleRef = firestore.collection('staffSchedule')

      await staffScheduleRef
      .where('staffId', '==', `${staffId}`)
      .where('disableStatus', '==', false)
      .get()
      .then(snapshot => {
        if (snapshot.empty === false) {
          let staffSchedulesData = []
          snapshot.forEach(doc => {
            let scheduleData = doc.data()
            staffSchedulesData.push(scheduleData)
          })
          let combineData = {
            ...staffData,
            schedules: staffSchedulesData,
            showStatus: false
          }
          newStaffsData.push(combineData)
        } else {
          dispatch(getStaffsDataFailed(false))
        }
      })
      .catch(err => {
        console.log('ERROR:Get staff schedules data', err)
      })
    }))
    await dispatch(getStaffsDataSuccess(newStaffsData))
  }
}