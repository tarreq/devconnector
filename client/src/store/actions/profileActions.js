import axios from "axios";
import { GET_PROFILE, 
        PROFILE_LOADING, 
        GET_PROFILES, 
        GET_ERRORS,
        CLEAR_CURRENT_PROFILE } from "../actions/types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  // Get profile
  axios.get("/api/profile").then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(err => 
    dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
  ;
};

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// Clear Profile 
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
