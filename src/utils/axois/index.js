import axios from "axios";
import Swal from "sweetalert2";

const baseURL = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

baseURL.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseURL.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.status === 498 ||
        error.response.status === 404)
    ) {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Optional: Clear user data

      // Show SweetAlert message
      Swal.fire({
        title: 'Session Expired!',
        text: 'Your session has expired. Please log in again.',
        icon: 'warning',
        confirmButtonText: 'Login',
        confirmButtonColor: '#007bff',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page
          window.location.href = '/sign-in'; 
        }
      });
    }
    return Promise.reject(error);
  }
);

export default baseURL;
