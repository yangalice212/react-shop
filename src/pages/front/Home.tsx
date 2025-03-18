import { Link, useOutletContext } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { CartData } from '../../components/types/cart';
import { Product } from '../../components/types/product';

function Home() {
  const { cartData, productAll } = useOutletContext<{
    cartData: CartData;
    productAll: Product[];
  }>();
  return (
    <>
      <div className="position-relative">
        <div
          className="position-absolute"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: `url('https://images.pexels.com/photos/269252/pexels-photo-269252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
            backgroundPosition: 'bottom center',
            opacity: 0.1,
            zIndex: -1,
          }}
        ></div>
        <div
          className="container d-flex flex-column"
          style={{ minHeight: '100vh' }}
        >
          <Navbar cartData={cartData} />
          <div className="row justify-content-center my-auto">
            <div className="col-md-4 text-center">
              <h2>FUrniTURE</h2>
              <p className="text-muted mb-0">
                專為熱愛生活的你打造高品質家具電商平台！我們嚴選時尚與實用兼具的家具，無論是簡約、北歐、工業風，皆能滿足你的居家需求。讓
                FUrniTURE 陪你打造理想空間，提升生活品味！
              </p>
              <Link to="/products" className="btn btn-dark rounded-0 mt-6">
                前往選購
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          {productAll
            .filter((product) => product.category === '精選')
            .slice(0, 3)
            .map((product) => {
              return (
                <div className="col-md-4 mt-md-4" key={product.id}>
                  <div className="card border-0 mb-4">
                    <img
                      src={product.imageUrl}
                      className="card-img-top rounded-0 object-cover"
                      height={200}
                      alt="..."
                    />
                    <div className="card-body text-center">
                      <h4>{product.title}</h4>
                      <div className="d-flex justify-content-between">
                        <p className="card-text text-muted mb-0">
                          {product.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="bg-light mt-7">
        <div className="container">
          <div className="row justify-content-center py-7">
            <div className="col-md-6 text-center">
              <h3>探索理想居家，打造專屬風格</h3>
              <p className="my-5">
                “發現完美家具，為每個角落注入活力！瀏覽我們的各式系列，找到最適合你的家居風格。不論是客廳、臥室還是書房，我們都有精心挑選的設計等你來選擇。”
              </p>
              <p>
                <small>—FUrniTURE—</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-7">
        {productAll
          .filter((product) => product.category !== '精選')
          .slice(0, 2)
          .map((product, id) => {
            return (
              <div
                className={`row ${
                  id === 1
                    ? 'flex-row-reverse justify-content-between mt-4'
                    : ''
                }`}
              >
                <div className="col-md-6">
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="object-cover"
                    style={{
                      maxWidth: '100%',
                      width: '450px',
                      height: '300px',
                    }}
                  />
                </div>
                <div className="col-md-4 m-auto text-center">
                  <h4 className="mt-4">{product.title}</h4>
                  <p className="text-muted">{product.content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Home;
