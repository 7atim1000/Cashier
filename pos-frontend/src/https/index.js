import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});


// Auth Endpoint 
export const login = (data) => api.post('/api/user/login', data);
export const register = (data) => api.post('/api/user/register', data);
export const getUserData = () => api.get('/api/user')
export const logout = () => api.post('/api/user/logout')

// Table Endpoint
export const addTable = (data) => api.post('/api/table/', data);
export const getTables = () => api.get('/api/table');
export const updateTable = ({tableId, ...tableData}) => api.put(`/api/table/${tableId}`, tableData);


// Category Endpoint
export const getCategories = () => api.get('/api/category');
export const addCategory = (data) => api.post('/api/category', data);


// Services Endpoint
export const getServices = (sort = '-createdAt') => api.post('/api/services/fetch', { sort });
export const addService = (data) => api.post('/api/services', data);
export const updateService = ({serviceId, ...serviceData}) => api.put(`/api/services/${serviceId}`, serviceData);  // serviceData explain in Bill.jsx

// Units Endpoint
export const getUnits = () => api.get('/api/units');
export const addUnit = (data) => api.post('/api/units', data);



// Order Endpoint
//export const addTable = (data) => api.post('/api/table/', data);
export const addOrder = (data) => api.post('/api/order/', data);
export const getOrders = () => api.get('/api/order');
export const updateOrder = ({orderId, orderStatus}) => api.put(`/api/order/${orderId}`, {orderStatus});


//  Customers Endpoint
export const addCustomer = (data) => api.post('/api/customers', data);
export const updateCustomer = ({customerId, ...balanceData}) => api.put(`/api/customers/${customerId}`, balanceData);  // serviceData explain in Bill.jsx

// Transaction Endpoint
export const addTransaction = (data) => api.post('/api/transactions/add-transaction', data);


