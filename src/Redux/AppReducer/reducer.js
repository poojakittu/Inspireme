import {
  ADD_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  EDIT_PRODUCT_FAILURE,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  SET_ALBUM_UPDATED,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./ActionType";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  album : null,
  albumUpdated: false,
};

const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        products: payload,
      };

    case GET_PRODUCT_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };

      case DELETE_PRODUCT_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

      case ADD_PRODUCT_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

      case EDIT_PRODUCT_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

    case EDIT_PRODUCT_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        album: payload,
      };

    case EDIT_PRODUCT_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: true,
      };

      case UPDATE_PRODUCT_REQUEST:
        return {
          ...oldState,
          isLoading: true,
          albumUpdated:false,
        };
  
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...oldState,
          isLoading: false,
          albumUpdated:true,
          // products: payload,
        };
  
      case UPDATE_PRODUCT_FAILURE:
        return {
          ...oldState,
          isLoading: false,
          isError: true,
          albumUpdated:false,
        };

        case SET_ALBUM_UPDATED:
        return {
          ...oldState,
          
          albumUpdated:payload,
          
        };

    default:
      return oldState;
  }
};

export { reducer };
