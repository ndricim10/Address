import request from "../api";
import { addressById_fail, addressById_request, addressById_success, address_fail, address_request, address_success, add_address_fail, add_address_request, add_address_success, edit_address_fail, edit_address_request, edit_address_success } from "./actionTypes";

export const getAddress = () => async (dispatch) => {
  try {
    dispatch({
      type: address_request,
    });

    const { data } = await request("/Address");

    dispatch({
      type: address_success,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: address_fail,
      payload: error
    })
    console.log(error);
  }
};

export const addAddress = (title, categories, status) => async (dispatch) => {
  try {
    dispatch({
      type: add_address_request,
    });

    const obj = {
      name: title,
      categories: categories,
      status: status,
      items: []
    }

    const { data } = await request.post("/Address", obj);

    dispatch({
      type: add_address_success
    });
    setTimeout(() => {
      dispatch(getAddress())
    }, 100)
  } catch (error) {
    dispatch({
      type: add_address_fail
    })
    console.log(error);
  }
};

export const getAddressById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: addressById_request,
    });

    const { data } = await request(`/Address/${id}`);

    dispatch({
      type: addressById_success,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: addressById_fail,
      payload: error
    })
    console.log(error);
  }
};

export const editAddress = (id, name, status, categories, number, item, quantity, description, notes ) => async (dispatch) => {
  try {
    dispatch({
      type: edit_address_request,
    });

    
    const obj = {
      name: name,
      status: status,
      items: [{
        item: item,
        Quantity: quantity,
        Description: description,
        notes: notes,
        number: number
      }],
      categories: categories
    }

    const { data } = await request.put(`/Address/${id}`, obj);

    dispatch({
      type: edit_address_success
    });
    setTimeout(() => {
      dispatch(getAddress())
    }, 100)
  } catch (error) {
    dispatch({
      type: edit_address_fail
    })
    console.log(error);
  }
};