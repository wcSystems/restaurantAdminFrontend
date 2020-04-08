import { Router } from 'express';
const router = Router();
// MULTER
import multerUser from '../libs/user.multer';

// USER
import { createUser, getUsers, updateUser, deleteUser, userLogin, userLogout, userId } from '../controllers/user.controller';
//ROLE
import { getRoles } from '../controllers/role.controller';
// JOB
import { createJob, getJobs, updateJob, deleteJob, jobId } from '../controllers/job.controller';
// EMPLOYEE
import { createEmployee, getEmployees, updateEmployee, deleteEmployee, employeeId, getWaiters, updateWaiters } from '../controllers/employee.controller';
// TABLE
import { createTable, getTables, updateTable, deleteTable, tableId, get_tablesBySalesOrders } from '../controllers/table.controller';
// SEAT
import { createSeat, getSeats, updateSeat, deleteSeat, seatId } from '../controllers/seat.controller';
// ORDER TYPE
import { createOrderType, getOrderTypes, updateOrderType, deleteOrderType, orderTypeId } from '../controllers/order-type.controller';
// STATUS ORDER
import { createStatusOrder, getStatusOrders, updateStatusOrder, deleteStatusOrder, statusOrderId } from '../controllers/status-order.controller';
// CATEGORY MENU
import { createCategoryMenu, getCategoryMenus, updateCategoryMenu, deleteCategoryMenu, categoryMenuId, getSubCategoryMenu, getMenuByCategory } from '../controllers/category-menu.controller';
// MEAL TIME
import { createMealTime, getMealTimes, updateMealTime, deleteMealTime, mealTimeId } from '../controllers/meal-time.controller';
// ORDER RESTRICTION
import { createOrderRestriction, getOrderRestrictions, updateOrderRestriction, deleteOrderRestriction, orderRestrictionId } from '../controllers/order-restriction.controller';
// REST MENU
import { createRestMenu, getRestMenus, updateRestMenu, deleteRestMenu, restMenuId } from '../controllers/rest-menu.controller';
// CUSTOMER
import { createCustomer, getCustomers, updateCustomer, customerId, customerIdentityCard } from '../controllers/customer.controller';
// SALE ORDER
import { createSaleOrder, getSaleOrders, updateSaleOrder, saleOrderId, saleOrderDetail } from '../controllers/sale-order.controller';
// SALE ORDER DETAIL
import { createSaleOrderDetail, getSaleOrderDetails, saleOrderDetailId, deleteSaleOrderDetail } from '../controllers/sale-order-detail.controller';
// PaymentMethod
import { createPaymentMethod, getPaymentMethods, updatePaymentMethod, paymentMethodId, deletePaymentMethod } from '../controllers/payment-method.controller';
// Payment
import { createPayment, getPayments, paymentId } from '../controllers/payment.controller';
// MeasureUnit
import { createMeasureUnit, getMeasureUnits, updateMeasureUnit, measureUnitId, deleteMeasureUnit } from '../controllers/measure-unit.controller';
// Category Products
import { getSubCategoryProduct, getProductByCategory, getCategoryProducts, createCategoryProduct, updateCategoryProduct, deleteCategoryProduct, categoryProductId } from '../controllers/category-product.controller';
// Provider
import { getProviders, updateProvider, createProvider, deleteProvider, providerId } from '../controllers/provider.controller';
// PurchaseOrder
import { getPurchaseOrders, createPurchaseOrder, updatePurchaseOrder, purchaseOrderId, purchaseOrderDetail } from '../controllers/purchase-order.controller';
// PurchaseOrderDetail
import { getPurchaseOrderDetails, createPurchaseOrderDetail, purchaseOrderDetailId, deletePurchaseOrderDetail } from '../controllers/purchase-order-detail.controller';
// Products
import { getProducts, createProduct, updateProduct, deleteProduct, productId } from '../controllers/product.controller';

// routes USERS

router.route('/user')
    .get(getUsers)
    .post(multerUser.single('image'), createUser)
    .put(multerUser.single('image'), updateUser);
router.route('/user/:id')
    .patch(deleteUser)
    .get(userId);
router.route('/user/login').post(userLogin);
router.route('/user/logout').post(userLogout);

// routes ROLES
router.route('/role')
    .get(getRoles);

// routes JOBS
router.route('/job')
    .get(getJobs)
    .post(createJob)
    .put(updateJob);
router.route('/job/:id')
    .delete(deleteJob)
    .get(jobId);

// routes EMPLOYEES
router.route('/employee/waiter')
    .get(getWaiters)
    .put(updateWaiters);
router.route('/employee')
    .get(getEmployees)
    .post(createEmployee)
    .put(updateEmployee);
router.route('/employee/:id')
    .delete(deleteEmployee)
    .get(employeeId);


// routes TABLES
router.route('/table/sale-order')
    .get(get_tablesBySalesOrders);
router.route('/table')
    .get(getTables)
    .post(createTable)
    .put(updateTable);
router.route('/table/:id')
    .delete(deleteTable)
    .get(tableId);

// routes SEATS

router.route('/seat')
    .get(getSeats)
    .post(createSeat)
    .put(updateSeat);
router.route('/seat/:id')
    .delete(deleteSeat)
    .get(seatId);

// routes ORDER TYPE
router.route('/order-type')
    .get(getOrderTypes)
    .post(createOrderType)
    .put(updateOrderType);
router.route('/order-type/:id')
    .delete(deleteOrderType)
    .get(orderTypeId);

// routes STATUS ORDER
router.route('/status-order')
    .get(getStatusOrders)
    .post(createStatusOrder)
    .put(updateStatusOrder);
router.route('/status-order/:id')
    .delete(deleteStatusOrder)
    .get(statusOrderId);

// routes CATEGORY MENU
router.route('/category-menu/sub_category')
    .post(getSubCategoryMenu);
router.route('/category-menu/menu')
    .post(getMenuByCategory);
router.route('/category-menu')
    .get(getCategoryMenus)
    .post(createCategoryMenu)
    .put(updateCategoryMenu);
router.route('/category-menu/:id')
    .delete(deleteCategoryMenu)
    .get(categoryMenuId);

// routes MEAL TIME
router.route('/meal-time')
    .get(getMealTimes)
    .post(createMealTime)
    .put(updateMealTime);
router.route('/meal-time/:id')
    .delete(deleteMealTime)
    .get(mealTimeId);

// routes ORDER RESTRICTION
router.route('/order-restriction')
    .get(getOrderRestrictions)
    .post(createOrderRestriction)
    .put(updateOrderRestriction);
router.route('/order-restriction/:id')
    .delete(deleteOrderRestriction)
    .get(orderRestrictionId);

// routes REST MENU
router.route('/rest-menu')
    .get(getRestMenus)
    .post(createRestMenu)
    .put(updateRestMenu);
router.route('/rest-menu/:id')
    .delete(deleteRestMenu)
    .get(restMenuId);

// routes CUSTOMER
router.route('/customer')
    .get(getCustomers)
    .post(createCustomer)
    .put(updateCustomer);
router.route('/customer/:id')
    .get(customerId);
router.route('/customer/search/:id')
    .get(customerIdentityCard);

// routes SALE ORDER
router.route('/sale-order')
    .get(getSaleOrders)
    .post(createSaleOrder)
    .put(updateSaleOrder);
router.route('/sale-order/:id')
    .get(saleOrderId);
router.route('/sale-order/detail/:id')
    .get(saleOrderDetail);

// routes SALE ORDER DETAIL
router.route('/sale-order-detail')
    .get(getSaleOrderDetails)
    .post(createSaleOrderDetail);
router.route('/sale-order-detail/:id')
    .get(saleOrderDetailId)
    .delete(deleteSaleOrderDetail);

// routes PAYMENT METHOD
router.route('/payment-method')
    .get(getPaymentMethods)
    .post(createPaymentMethod)
    .put(updatePaymentMethod);
router.route('/payment-method/:id')
    .delete(deletePaymentMethod)
    .get(paymentMethodId);

// routes PAYMENT
router.route('/payment')
    .get(getPayments)
    .post(createPayment);
router.route('/payment/:id')
    .get(paymentId);

// routes Measure Unit
router.route('/measure-unit')
    .get(getMeasureUnits)
    .put(updateMeasureUnit)
    .post(createMeasureUnit);
router.route('/measure-unit/:id')
    .delete(deleteMeasureUnit)
    .get(measureUnitId);

// routes Category Products
router.route('/category-product/sub_category')
    .post(getSubCategoryProduct);
router.route('/category-product/product')
    .post(getProductByCategory);
router.route('/category-product')
    .get(getCategoryProducts)
    .post(createCategoryProduct)
    .put(updateCategoryProduct);
router.route('/category-product/:id')
    .delete(deleteCategoryProduct)
    .get(categoryProductId);

// routes Provider
router.route('/provider')
    .get(getProviders)
    .put(updateProvider)
    .post(createProvider);
router.route('/provider/:id')
    .delete(deleteProvider)
    .get(providerId);

// routes PurchaseOrder
router.route('/purchase-order')
    .get(getPurchaseOrders)
    .post(createPurchaseOrder)
    .put(updatePurchaseOrder);
router.route('/purchase-order/:id')
    .get(purchaseOrderId);
router.route('/purchase-order/detail/:id')
    .get(purchaseOrderDetail);

// routes PurchaseOrderDetail
router.route('/purchase-order-detail')
    .get(getPurchaseOrderDetails)
    .post(createPurchaseOrderDetail);
router.route('/purchase-order-detail/:id')
    .get(purchaseOrderDetailId)
    .delete(deletePurchaseOrderDetail);

// routes Products
router.route('/product')
    .get(getProducts)
    .post(createProduct)
    .put(updateProduct);
router.route('/product/:id')
    .delete(deleteProduct)
    .get(productId);

export default router;

