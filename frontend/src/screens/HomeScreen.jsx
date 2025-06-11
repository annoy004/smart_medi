import {Row,Col} from  'react-bootstrap';
// import {useEffect,useState} from 'react'
import Product from '../components/Product';
//import axios from 'axios'  //abhi hum yahi chiz redux se karenge axios se nahi with productapislice
 import { useGetProductsQuery } from '../slices/productsApiSlice';

 import Loader from '../components/Loader';
 import Message from '../components/Message';


 const  HomeScreen = () => {
    // const [products,setproducts ] = useState([]);

    // useEffect(() => {
    //     const fetchProducts =async() => {
    //         const {data} = await axios.get('/api/products');
    //         setproducts(data);        
    //     };
    //     fetchProducts();
    // },[]);

    const {data:products,isLoading,error} = useGetProductsQuery();
    return (
        <>
        

       {isLoading?<Loader/>:error? (<Message variant ='danger'>{error?.data?.message ||error.error}</Message>) : (<>
               <h1>Latest Products</h1>
               <Row>
                   {products.map((product) => (
                       <Col sm={12} md= {6} lg={4} xl={3} key={product._id} >
                           <Product product={product}/>
                       </Col>
                       
                   ))}
               </Row></>)}
    
        </>
    )
}

export default HomeScreen
