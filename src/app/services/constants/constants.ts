const baseUrl = 'http://192.169.243.70:3000/v1/'

export const AppSettings = {
    registrationUrl: baseUrl + 'users/registration',
    loginUrl: baseUrl + 'users/login',
    changePwdUrl: baseUrl + 'vendors/changepassword',
    categoriesUrl: baseUrl + 'ecommerce/categories',
    productUrl: baseUrl + 'products',
    loginDetailsbyEmail: baseUrl + 'users/',
    getWholeSellersUrl: baseUrl + 'wholesalers',
    updateProfile: baseUrl + 'vendors/update_profile',
    forgotPw: baseUrl + 'users/forgot_password',
    addaddress: baseUrl + "delivery_address/user",
    getAddress: baseUrl + "delivery_address/user",
    delAddress: baseUrl + "delivery_address",
    updateAddress: baseUrl + "delivery_address",
    businessDetails: baseUrl + "vendors/update_profile",
    taxDetails: baseUrl + "vendors/update_profile",
    bankDetails: baseUrl + "vendors/update_profile",
    getBanners: baseUrl + "banners/e_commerce",
    productByCatId: baseUrl + "products/category",
    productBySubCatId: baseUrl + "products/sub_category_id",
    searchProducts: baseUrl + 'products/search',
    addToCart: baseUrl + "vendor/cart_details",
    getCart: baseUrl + 'vendor/cart_details/users',
    delCart: baseUrl + 'vendor/cart_details/users',
    paymentType: baseUrl + "payment_options",
    palceOrder: baseUrl + "place_order/user_orders",
    orderSummary: baseUrl + "place_order/order_summary",
    getAccDetails: baseUrl + "vendors/account_details",
    updateAcc: baseUrl + "vendors/update_profile",
    dealOfDay: baseUrl + "products/e_commerce/dashboard",
    getJewel: baseUrl + "products/jewellery",
    getCloth: baseUrl + "products/cloths",
    ProductById: baseUrl + "products/product_id",
    ecomProducts: baseUrl + "products/e_commerce",
    getPlaceOrd: baseUrl + "place_order/vendor_orders/ecommerce/vendor_id",
    ordById: baseUrl + "place_order/order_products",
    reqProducts: baseUrl + "place_order/request_products/vendor",
    updateProd: baseUrl + "place_order/pricing",
    filterVendor: baseUrl + "products/filter/vendor",
    getAddbyId: baseUrl + "delivery_address/address_id",
    addWish: baseUrl + "wish_list",
    getWish: baseUrl + "wish_list",
    delWish: baseUrl + "wish_list",
    setDelAdd: baseUrl + "delivery_address/user",
    // modifyCart: baseUrl + "vendor/cart_details"
}

