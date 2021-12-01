import { message } from 'antd'

import { getComplaintDetail, getComplaints, insertComplaint, mergeComplaint } from '../../apis/complaint.api'
import * as actions from '../actions/complaint.action'

export const getDetailComplaintAsync = (query) => {
  return dispatch => {
    dispatch(actions.getDetailComplaintStart())

    getComplaintDetail(query).then(res => {
      // if (!res?.IsSuccessed) message.error(res.Message)
      dispatch(actions.getDetailComplaintSuccess(res))
    }).catch(err => dispatch(actions.getDetailComplaintFailure(err.message)))
  }
}

export const getComplaintList = (query) => {
  return dispatch => {
    dispatch(actions.getComplaintsStart())

    getComplaints(query).then(res => {
      if (!res?.IsSuccessed) message.error(res.Message)
      dispatch(actions.getComplaintsSuccess(res))
    }).catch(err => dispatch(actions.getComplaintsFailure(err.message)))
  }
}

export const insertComplaintAsync = (query) => {
  return dispatch => {
    dispatch(actions.insertComplaintStart())

    insertComplaint(query).then(res => {
      if (!res?.IsSuccessed) message.error(res.Message)
      dispatch(actions.insertComplaintSuccess(res))
    }).catch(err => dispatch(actions.insertComplaintFailure(err.message)))
  }
}

export const mergeComplaintAsync = (query) => {
  return dispatch => {
    dispatch(actions.mergeComplaintStart())

    mergeComplaint(query).then(res => {
      if (!res?.IsSuccessed) message.error(res.Message)
      dispatch(actions.mergeComplaintSuccess(res))
    }).catch(err => dispatch(actions.mergeComplaintFailure(err.message)))
  }
}

