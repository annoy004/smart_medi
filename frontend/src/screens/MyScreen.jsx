import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
// import {useEffect,useState} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl, option } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useGetProductsDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

import React from 'react'
import Loader from '../components/Loader';
import Message from '../components/Message';


const MyScreen = () => {
  // const [product,setProduct] = useState({})
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);


  // useEffect(() => {
  //   const fetchProducts = async() => {
  //     const {data} =await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   };
  //   fetchProducts();
  // },[productId]);

  const { data: product, isLoading, error } = useGetProductsDetailsQuery(productId);
  // console.log([...Array(product.countInStock).keys()]); gives the array on countinStock atarting form zero like 0 1 2 3 ...9
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }
  return (
    <>
      <Link className=" btn btn-light my-3" to="/">
        GO Back
      </Link>


      {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReview} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price:
                      </Col>
                      <Col><strong>${product.price}</strong></Col>

                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:
                      </Col>
                      <Col><strong>${product.countInStock > 0 ? 'In stock' : 'out of stock'}</strong></Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}>
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button className='btn-block'
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      add to cart


                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup>
            </Card>
          </Col>

        </Row>

      )}

    </>



  )
}

export default MyScreen