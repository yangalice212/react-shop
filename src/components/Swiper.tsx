import { Link } from 'react-router-dom';
import { Product } from './types/product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface SwiperProps {
  productSwiper: Product[];
  title: string;
}

function SwiperComponent({ productSwiper, title }: SwiperProps) {
  return (
    <>
      <h3 className="fw-bold">{title}</h3>
      <Swiper
        modules={[Pagination, Navigation]}
        navigation
        pagination={{ clickable: true }} //頁數
        spaceBetween={50}
        slidesPerView={1}
      >
        {productSwiper.map((product) => {
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
                    NT${product.price.toLocaleString()}{' '}
                    <span className="text-muted ">
                      <del>NT${product.origin_price.toLocaleString()}</del>
                    </span>
                  </p>
                  <p className="text-muted mt-3"></p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SwiperComponent;
