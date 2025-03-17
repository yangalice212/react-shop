import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../components/types/product';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

function ProductDetail() {
  const [product, setProduct] = useState<Product>({
    category: '',
    content: '',
    description: '',
    id: '',
    is_enabled: 0,
    origin_price: 0,
    price: 0,
    title: '',
    unit: '',
    num: 0,
    imageUrl: '',
    imagesUrl: [],
  });
  const [category, setCategory] = useState<string>('');
  const [productSwiper, setProductSwiper] = useState<Product[]>([]);
  const { id } = useParams();

  const getProduct = async (id: string) => {
    const productRes = await axios.get(
      `/v2/api/${import.meta.env.VITE_API_PATH}/product/${id}`
    );
    setProduct(productRes.data.product);
    setCategory(productRes.data.product.category);
  };

  const getProductSwiper = useCallback(async () => {
    try {
      const productRes = await axios.get(
        `/v2/api/${import.meta.env.VITE_API_PATH}/products?category=${category}`
      );
      setProductSwiper(productRes.data.products);
    } catch (error) {
      console.error('Error fetching product swiper:', error);
    }
  }, [category]);

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
    getProductSwiper();
  }, [id, getProductSwiper]);

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-7">
          <Swiper
            modules={[Pagination, Navigation]}
            navigation
            pagination={{ clickable: true }} //頁數
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide key={id}>
              <div className="carousel-item active" key={id}>
                <img
                  src={product.imageUrl}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </SwiperSlide>
            {product.imagesUrl &&
              product.imagesUrl.map((image, id) => (
                <SwiperSlide key={id}>
                  <div className="carousel-item active" key={id}>
                    <img
                      src={image}
                      className="d-block w-100 object-cover"
                      alt="..."
                      height={350}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="col-md-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white px-0 mb-0 py-3">
              <li className="breadcrumb-item">
                <Link className="text-muted" to="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="text-muted" to="/products">
                  Product
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Detail
              </li>
            </ol>
          </nav>
          <h2 className="fw-bold h1 mb-1">{product.title}</h2>
          <p className="mb-0 text-muted text-end">
            <del>NT$${product.origin_price}</del>
          </p>
          <p className="h4 fw-bold text-end">NT$${product.price}</p>
          <div className="row align-items-center">
            <div className="col-6">
              <div className="input-group my-3 bg-light rounded">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-dark border-0 py-2"
                    type="button"
                    id="button-addon1"
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control border-0 text-center my-auto shadow-none bg-light"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-dark border-0 py-2"
                    type="button"
                    id="button-addon2"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <a
                href="./checkout.html"
                className="text-nowrap btn btn-dark w-100 py-2"
              >
                加入購物車
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-4">
          <p>{product.content}</p>
        </div>
        <div className="col-md-3">
          <p className="text-muted">{product.description}</p>
        </div>
      </div>
      <h3 className="fw-bold">其他 {product.category} 的商品</h3>
      <Swiper
        modules={[Pagination, Navigation]}
        navigation
        pagination={{ clickable: true }} //頁數
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {productSwiper?.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src={product.imageUrl}
                  className="card-img-top rounded-0 object-cover"
                  height={400}
                  alt="..."
                />
                <a href="#" className="text-dark"></a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </h4>
                  <p className="card-text mb-0">
                    NT${product.price}{' '}
                    <span className="text-muted ">
                      <del>NT${product.origin_price}</del>
                    </span>
                  </p>
                  <p className="text-muted mt-3"></p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
export default ProductDetail;
