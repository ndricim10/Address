import { addressById_fail, addressById_request, addressById_success, address_fail, address_request, address_success } from "./actionTypes";

export const getAllAddress = (
    state = {
      loading: false,
      address: [],
    },
    action
  ) => {
    const { payload, type } = action;
  
    switch (type) {
      case address_request:
        return {
          ...state,
          loading: true,
        };
  
      case address_success:
        return {
          ...state,
          loading: false,
          address: payload,
        };
  
      case address_fail:
        return {
          ...state,
          loading: false,
          address: null,
          error: payload,
        };
      default:
        return state;
    }
  };

  export const getSingleAddress = (
    state = {
      loading: false,
      address: [],
    },
    action
  ) => {
    const { payload, type } = action;
  
    switch (type) {
      case addressById_request:
        return {
          ...state,
          loading: true,
        };
  
      case addressById_success:
        return {
          ...state,
          loading: false,
          address: payload,
        };
  
      case addressById_fail:
        return {
          ...state,
          loading: false,
          address: null,
          error: payload,
        };
      default:
        return state;
    }
  };
  