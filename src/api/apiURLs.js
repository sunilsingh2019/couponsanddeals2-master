export const loginAPI = 'login';

export const facebookLoginAPI = 'login-via-facebook';

export const googleLoginAPI = 'login-via-google';

export const forgotPasswordAPI='forgot-pass';
export const resetPasswordAPI='reset-pass'
export const verifyMailAPI='verify-email'
export const resendVerificationAPI='resend-verification'

export const getUserAPI = 'user';
export const getUserDetail = 'get-user-detail';
export const relatedOffersAPI='follow-related-offers-home'
export const relatedOffersPageAPI=slug=>`follow-related-offers?search_term=${slug}`
export const changePasswordAPI='change-password';

export const logoutAPI = 'logout';

export const registerAPI = 'register';

export const searchAPI= slug => `main-search?search_term=${slug}`

export const allDealsAPI = 'deals';
export const trendingDealsAPI = 'trending-deals';
export const dealsOfTheDayAPI = 'latest-offers-home';
export const featuredDealsAPI = 'featured-deals';
export const dealDetailAPI = slug => `deals/${slug}`;
export const dealViewedAPI = slug => `deal-viewed/${slug}`;
export const mixedDealsAPI='deals-offers-home'

export const featuredStoresAPI = 'featured-stores';
export const allStoresAPI = 'stores';
export const storeDetailAPI = slug => `store-detail/${slug}`;
export const getFollowedStoresAPI = 'store-follow-list';
export const followStoreAPI = 'followStore';
export const editStoreAPI = 'edit-store';

export const getFeaturedPromotionsAPI = 'featured-promotions';

export const getAllCategoriesAPI = 'category';
export const getFollowedCategoriesAPI = 'category-follow-list';
export const followCategoryAPI = 'followCategory';
export const offersByCategoryAPI = slug => `offers-by-category?category=${slug}`;
export const offersBySubcategoryAPI = sub => `offers-by-category?sub_category=${sub}`;

export const allCouponsAPI = 'coupons';
export const featuredCouponsAPI = 'featured-coupons';
export const trendingCouponsAPI = 'trending-coupons';
export const couponDetailAPI = slug => `coupons/${slug}`;
export const claimCouponAPI = slug => `get-coupon/${slug}`;
export const viewClaimedCouponAPI = qrNumber => `get-coupon-code/${qrNumber}`;
export const couponViewedAPI = slug => `coupon-viewed/${slug}`;
export const couponCategoryAPI = slug => `coupon-category/${slug}`;
export const offersHomeAPI = 'popular-offers-home';
export const mixedCouponsHomeAPI = 'coupons-offers-home';

//for store dashboard
export const addCouponAPI = 'add-coupon';
export const registerStoreAPI = 'register-store';
export const myStoreAPI = 'get-my-stores';
export const addDealAPI = 'add-deal';
export const changeStatusDealAPI = id => `change-status-deal/${id}`;
export const changeStatusCouponAPI = id => `change-status-coupon/${id}`;
export const editDealAPI = 'edit-deal';
export const editCouponAPI = 'edit-coupon';

//for unit purchase
export const getUnitPackageAPI = 'get-unit-package';
export const purchaseUnitAPI = 'unit-purchase';
export const getStoreUnitAPI = slug => `get-store-unit/${slug}`;
export const getUnitTypeAPI = (type, service) => `get-unit-type/${type}/${service}`;
