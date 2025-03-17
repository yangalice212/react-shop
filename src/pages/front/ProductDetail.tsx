import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../components/types/product';
import axios from 'axios';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import SwiperComponent from '../../components/Swiper';

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
  const [cartQuantity, setCartQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const { getCartData } = useOutletContext<{ getCartData: () => void }>();

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

  const addToCart = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/v2/api/${import.meta.env.VITE_API_PATH}/cart`, {
        data: {
          product_id: product.id,
          qty: cartQuantity,
        },
      });
      getCartData();
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <del>NT$${product.origin_price.toLocaleString()}</del>
          </p>
          <p className="h4 fw-bold text-end">
            NT$${product.price.toLocaleString()}
          </p>
          <div className="row align-items-center">
            <div className="col-6">
              <div className="input-group my-3 bg-light rounded">
                <div className="input-group-prepend">
                  <button
                    className="btn btn-outline-dark border-0 py-2"
                    type="button"
                    id="button-addon1"
                    onClick={() => {
                      setCartQuantity((pre) => (pre === 1 ? 1 : pre - 1));
                    }}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                </div>
                <input
                  type="number"
                  className="form-control border-0 text-center my-auto shadow-none bg-light"
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  readOnly
                  value={cartQuantity}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-dark border-0 py-2"
                    type="button"
                    id="button-addon2"
                    onClick={() => setCartQuantity((pre) => pre + 1)}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <button
                type="button"
                className="text-nowrap btn btn-dark w-100 py-2"
                onClick={() => addToCart()}
                disabled={isLoading}
              >
                加入購物車
              </button>
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
      <SwiperComponent
        productSwiper={productSwiper?.filter((item) => item.id !== product.id)}
        title={`其他 ${product.category} 的商品`}
      />
    </div>
  );
}
export default ProductDetail;
