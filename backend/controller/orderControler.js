import { RiQqFill } from 'react-icons/ri';
import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/orderModel.js';

//@desc Create new Order
// @route Post /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        id: undefined
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc get Logged in user order
// @route Get /api/orders/myorders
// @access Private

const getMyOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({user:req.user._id});
  res.status(200).json(orders);
})


//@desc get order by id
// @route Get /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','name email');

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
})

//@desc update order to paid
// @route Put /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if(order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id:req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  }else{
    res.status(404);
    throw new Error('Order not found');
  }
  
})



//@desc update order to delivered
// @route Put /api/orders/:id/deliver
// @access Private

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered');
})


//@desc get all orders
// @route Get /api/orders
// @access Admin

const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders');
})


export {
  addOrderItems,
  getMyOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders
}