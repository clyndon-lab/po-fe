import freeze from 'deep-freeze'
import { handleActions } from 'redux-actions'

import * as actions from '../actions/complaint.action'

const INITIAL_STATE = freeze({
  insertComplaint: null,

  mergedComplaint: null,

  getDetailComplaint: null,

  complaintList: null,

  isLoading: false,
  errorMessage: null,
})

export default handleActions(
  {
    [actions.insertComplaintStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.insertComplaintSuccess]: (state, actions) => {
      return freeze({
        ...state,
        insertComplaint: actions.payload,
        isLoading: false
      })
    },
    [actions.insertComplaintFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.mergeComplaintStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.mergeComplaintSuccess]: (state, actions) => {
      return freeze({
        ...state,
        mergedComplaint: actions.payload,
        isLoading: false
      })
    },
    [actions.mergeComplaintFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.getDetailComplaintStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getDetailComplaintSuccess]: (state, actions) => {
      return freeze({
        ...state,
        getDetailComplaint: actions.payload,
        isLoading: false
      })
    },
    [actions.getDetailComplaintFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },

    [actions.getComplaintsStart]: (state) => {
      return freeze({
        ...state,
        isLoading: true
      })
    },
    [actions.getComplaintsSuccess]: (state, actions) => {
      return freeze({
        ...state,
        complaintList: actions.payload.DataSource,
        isLoading: false
      })
    },
    [actions.getComplaintsFailure]: (state) => {
      return freeze({
        ...state,
        errorMessage: 'fetch error',
        isLoading: false
      })
    },
  },
  INITIAL_STATE
)