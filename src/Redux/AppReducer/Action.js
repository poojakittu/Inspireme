import axios from "axios";
import * as types from "./ActionType";

const getProductRecordRequest = () => {
  return {
    type: types.GET_PRODUCT_REQUEST,
  };
};

const deleteProductRecordRequest = () => {
  return {
    type: types.DELETE_PRODUCT_REQUEST,
  };
};

const addProductRecordRequest = () => {
  return {
    type: types.ADD_PRODUCT_REQUEST,
  };
};

const editProductRecordRequest = () => {
  return {
    type: types.EDIT_PRODUCT_REQUEST,
    
  };
};

const updateProductRecordRequest = () => {
  return {
    type: types.UPDATE_PRODUCT_REQUEST,
  };
};

export const setAlbumUpdated = (payload) => {
  return {
    type: types.SET_ALBUM_UPDATED,
    payload
  };
};


const getProductRecord = (queryParams) => (dispatch) => {
  dispatch(getProductRecordRequest());
  return axios
    .get(`https://shy-puce-cheetah-hose.cyclic.app/product/alldata?category=all`, queryParams)
    .then((res) => {
      dispatch({
        type: types.GET_PRODUCT_SUCCESS,
        payload: res.data.data,
      });
      console.log(res.data.data)
    })
    .catch((err) => {
      dispatch({
        type: types.GET_PRODUCT_FAILURE,
      });
    });
};

const deleteProductRecord = (id) => (dispatch) => {
  dispatch(deleteProductRecordRequest());
  dispatch(getProductRecordRequest());
  return axios
    .delete(`http://localhost:8080/albums/${id}`)
    .then((res) => {
      dispatch({
        type: types.DELETE_PRODUCT_SUCCESS,
        
      });
      
      
      
      console.log(res)
    })
    .catch((err) => {
      dispatch({
        type: types.DELETE_PRODUCT_FAILURE,
      });
    });
};

const addProductRecord = (Product) => (dispatch) => {
  dispatch(addProductRecordRequest());
  return axios
    .post(`http://localhost:8080/albums`,Product)
    .then((res) => {
      dispatch({
        type: types.ADD_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PRODUCT_FAILURE,
      });
    });
};

const editProductRecord = (id) => (dispatch) => {
  dispatch(editProductRecordRequest());
  return axios
    .get(`http://localhost:8080/albums/${id}`)
    .then((res) => {
      
      dispatch({
        type: types.EDIT_PRODUCT_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispatch({
        type: types.EDIT_PRODUCT_FAILURE,
      });
    });
};

const updateProductRecord = (albums, id) => (dispatch) => {
  dispatch(updateProductRecordRequest());
  return axios
    .put(`http://localhost:8080/albums/${id}`,albums)
    .then((res) => {
      dispatch({
        type: types.UPDATE_PRODUCT_SUCCESS,
        
      });
      console.log(res.data)
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_PRODUCT_FAILURE,
      });
      console.log(err)
    });
};



export { getProductRecordRequest, getProductRecord, deleteProductRecord, addProductRecord,editProductRecord, updateProductRecord};
