import React, { useEffect, useState, useSyncExternalStore } from 'react'
import Layout from '../components/Layout/Layout'
import { Carousel } from "react-responsive-carousel";
import axios, { all } from 'axios';
import { Checkbox, Radio } from "antd"
import { Prices } from './../components/Prices';
import { Link, useNavigate } from 'react-router-dom';
import Products from './Admin/Products';
import { useCart } from '../components/Context/Cart';
import { toast } from 'react-hot-toast';
const Home = () => {
  const [cart ,setcart] = useCart();
  const [checked, setchecked] = useState([])
  const [products, setproducts] = useState([])
  const [category, setcategory] = useState([])
  const [radio, setradio] = useState([])
  const [total, settotal] = useState(0)
  const [page, setpage] = useState(1)
  const [totalproduct, settotalproduct] = useState("")
  const [loading, setloading] = useState(false)
  const navigate = useNavigate()
  const getAllproducts = async () => {
    try {
      setloading(true)
    const res = await axios.get(`/api/v1/product/product-list/${page}`)
    setloading(false)
    setproducts(res.data.products);
  settotalproduct(res.data.countTotal)
    } catch (error) {
      console.log(error);
      setloading(false)
    }
  }
 //get total
 const getTotal = async ()=>{
  try {
    const {data} = await axios.get("/api/v1/product/product-count");
    settotal(data?.total)
  } catch (error) {
    console.log(error);
  }
 }
 //load more
 const loadMore  = async()=>{
  try {
    const {data} = await axios.get(`/api/v1/product/product-list/${page}`);
    setproducts([...products,...data.products])
  } catch (error) {
    console.log(error);
  }
 }
 useEffect(() => {
   if (page===1) {
    return
   }
   loadMore()
 }, [page])
 
  //get all category
  const getallcategory = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");

      if (res?.data?.success) {
        setcategory(res?.data?.category);
      }

    } catch (error) {
      console.log(`error while getting all category`);

    }
  };
  /////////////////
  //handleClicked //filter by category
  const handleClicked = (value, id) => {
    let all = [...checked]
    // console.log(value);
    if (value) {
      all.push(id)
      // console.log(id);
    } else {
      // all = all.pop(id)
      // console.log(id+"this is id in else");
      all = all.filter((c) =>
        c !== id
      )

    }

    setchecked(all)
  }
  //filtered product 
  const getfilteredProducts = async()=>{
    try {
      const {data} = await axios.post("/api/v1/product/product-filter",{
        
         checked,radio
        });
      if (data.success) {
        setproducts(data.products)
        settotalproduct(data.totalCount)
        settotalproduct("")
        settotalproduct(data.countTotal);
        settotal(data.countTotal)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    
      if (!checked.length  || !radio.length) {
        getAllproducts()
      }

    getallcategory();
    getTotal();
  }, [])
  useEffect(() => {
    if (checked.length > 0 ) {
      getfilteredProducts()
    }
    if (radio.length==2) {
      
      getfilteredProducts()
    }
  }, [checked.length,radio.length,radio,checked])
  
  console.log(category);
  return (
    <Layout title={"All product - Best Offer"}>
      
      <div className>
        {/* <div className='col-md-2'>
          <h4 className='text-center'>Filter by category</h4>
          <div className='d-flex flex-column m-3'>
            {

              category?.map((c) => {
                return (
                  <Checkbox key={c._id} onChange={(e) => { handleClicked(e.target.checked, c._id) }}>{c.name}</Checkbox>
                )

              })
            }
            
          </div>
          <h4 className='text-center'>Filter by Price</h4>
          <div className='d-flex flex-column m-3'>
            <Radio.Group onChange={(e)=>{setradio(e.target.value); }}>
              {
                Prices?.map(e=>(<div key={e._id}><Radio value={e.array}>{e.name}</Radio></div>))
              }
            </Radio.Group>
            
          </div>
          
          <div className='d-flex flex-column m-3'>
           <button className='btn btn-danger' onClick={()=>{window.location.reload()}}>Clear All Filter</button> 
          </div>
        </div> */}
        {/* filter by price */}

        {/* <div className="banner-container">
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <img src="images/ss2.png" alt="Banner 1" />
          </div>
          <div>
            <img src="images/ss1.png" alt="Banner 2" />
          </div>
        </Carousel>

        <div className="banner-content">
          <h1>Welcome to our BOnze  store!</h1>
          <p>Discover the latest fashion trends and shop with us.</p>
          <Link to="/shop" className="banner-button">
            Shop Now
          </Link>

        </div>
      </div> */}
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> <br /> <br />
        <br />
      </div>
      <div style={{ fontSize: "20px" , textAlign:"center"}}>
      <p>
          Experience Unmatched Style and Sophistication at Shopping Store — Your One-Stop Fashion Destination.
        </p>
      </div>
        <div className='category-section'>
          <p className='text-center'>Total Products : {products.length}</p>
          <h1 className='text-center'>All products</h1>
          <div className='category-list'>
            { 
              products?.map((Sproducts) => {
                return (

                  <div className="category-section" style={{ width: '18rem' }} key={Sproducts._id}>
                    <img src={`/api/v1/product/product-photo/${Sproducts._id}`} className="card-img-top " height={"250px"} width={"250px"} alt={Sproducts.name} />
                    <div className="card-body">
                      <h5 className="card-title">{Sproducts.name}</h5>
                      <h4 className="pricecolor">Price:{Sproducts.price}</h4>
                      {/* <p className="card-text">{Sproducts.description.substring(0,40)}... <Link to={"/api/v1/product/"+Sproducts._id}>more</Link></p> */}
                      <div className='d-flex'>
                        <button class="category-button" onClick={()=>{
                          navigate(`/product/${Sproducts.slug}`)
                        }}>More Details</button>
                        <button class="category-button" onClick={()=>{
                          setcart([...cart,Sproducts])
                          localStorage.setItem("cart",JSON.stringify([...cart,Sproducts]))
                        toast.success("product add to cart Successfully")
                        }}>Add To Cart</button>
                       
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='category-list'>
           {
            products && products.length < total &&(
              <button className='btn btn-warning btnloadmore' onClick={(e)=>{e.preventDefault(); setpage(page+1)}}>{loading?"Loading...":"Load More"}</button>
            )
           }
           
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Home
