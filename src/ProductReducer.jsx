export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, productList: action.payload, loading: false };
    case "SET_CATEGORIES":
      return { ...state, category: action.payload };
    case "SET_SEARCH":
      return { ...state, productSearch: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_LOADING":
      return { ...state, loading: true, error: null };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Initial state for the reducer
export const initialState = {
  productList: [],
  productSearch: "",
  category: [],
  selectedCategory: "",
  loading: false,
  error: null,
};
