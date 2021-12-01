import { createAction } from 'redux-actions'

import ComplaintActionTypes from '../actionTypes/complaint.type'

export const getDetailComplaintStart = createAction(ComplaintActionTypes.GET_DETAIL_COMPLAINT_START)
export const getDetailComplaintSuccess = createAction(ComplaintActionTypes.GET_DETAIL_COMPLAINT_SUCCESS)
export const getDetailComplaintFailure = createAction(ComplaintActionTypes.GET_DETAIL_COMPLAINT_FAILURE)

export const getComplaintsStart = createAction(ComplaintActionTypes.GET_COMPLAINTS_START)
export const getComplaintsSuccess = createAction(ComplaintActionTypes.GET_COMPLAINTS_SUCCESS)
export const getComplaintsFailure = createAction(ComplaintActionTypes.GET_COMPLAINTS_FAILURE)

export const insertComplaintStart = createAction(ComplaintActionTypes.INSERT_COMPLAINT_START)
export const insertComplaintSuccess = createAction(ComplaintActionTypes.INSERT_COMPLAINT_SUCCESS)
export const insertComplaintFailure = createAction(ComplaintActionTypes.INSERT_COMPLAINT_FAILURE)

export const mergeComplaintStart = createAction(ComplaintActionTypes.MERGE_COMPLAINT_START)
export const mergeComplaintSuccess = createAction(ComplaintActionTypes.MERGE_COMPLAINT_SUCCESS)
export const mergeComplaintFailure = createAction(ComplaintActionTypes.MERGE_COMPLAINT_FAILURE)