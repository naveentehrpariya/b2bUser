import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer, logoutSliceReducer } from "./slices/userAuthSlice";
import {
  editProfileSliceReducer,
  profileSliceReducer,
} from "./slices/profileSlice";
import { categoryReducer } from "./slices/categorySlice";
import { changePasswordSliceReducer } from "./slices/changePwdSlice";
import {
  productByIdSliceReducer,
  productSliceReducer,
} from "./slices/productsSlice";
import submitEnquirySlice from "./slices/submitEnquirySlice";
import { sliderSliceReducer } from "./slices/sliderSlice";
import contactSlice from "./slices/contactSlice";
import inquirySlice from "./slices/inquirySlice";
import compareSlice from "./slices/compareSlice";
import askAiSlice from "./slices/askAiSlice";

const store = configureStore({
  reducer: {
    authSlice: authSliceReducer,
    profileSlice: profileSliceReducer,
    categorySlice: categoryReducer,
    changePasswordSlice: changePasswordSliceReducer,
    editProfileSlice: editProfileSliceReducer,
    productSlice: productSliceReducer,
    productByIdSlice: productByIdSliceReducer,
    submitEnquiry: submitEnquirySlice,
    sliderItems: sliderSliceReducer,
    contact: contactSlice,
    inquiries: inquirySlice,
    compare: compareSlice,
    // 
    askAi : askAiSlice
  },
});
export default store;
