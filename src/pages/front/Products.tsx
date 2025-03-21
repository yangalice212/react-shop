import { useCallback, useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import { Product } from '../../components/types/product';
import { Link, useOutletContext } from 'react-router-dom';
import Loading from '../../components/Loading';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { productAll } = useOutletContext<{
    productAll: Product[];
  }>();

  const getProducts = async (page = 1, category?: string | null) => {
    try {
      setIsLoading(true);
      const productRes = await axios.get(
        `/v2/api/${import.meta.env.VITE_API_PATH}/products?page=${page}` +
          (category ? '&category=' + category : '')
      );
      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategory = useCallback(() => {
    const categories = [...new Set(productAll.map(({ category }) => category))];
    setCategories(categories);
  }, [productAll]);

  useEffect(() => {
    getCategory();
  }, [productAll, getCategory]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: '400px' }}
      >
        <div
          className="position-absolute"
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage: `url(https://images.pexels.com/photos/269252/pexels-photo-269252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=650&dpr=2)`,
            backgroundPosition: 'bottom center',
            opacity: 0.1,
          }}
        ></div>
        <h2 className="fw-bold">FUrniTURE</h2>
      </div>
      <div className="container mt-md-5 mt-3 mb-7">
        <Loading isLoading={isLoading} />

        <div className="row">
          <div className="col-md-4">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">Category</h4>
                    <i className="bi bi-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <a
                          className="py-2 d-block text-muted"
                          onClick={() => {
                            setCategory(null);
                            getProducts(1);
                          }}
                        >
                          All
                        </a>
                      </li>
                      {categories.map((category, i) => (
                        <li key={i}>
                          <a
                            className="py-2 d-block text-muted"
                            onClick={() => {
                              setCategory(category);
                              getProducts(1, category);
                            }}
                          >
                            {category}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              {products.map((product) => {
                return (
                  <div className="col-md-6" key={product.id}>
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img
                        src={product.imageUrl}
                        className="card-img-top rounded-0 object-cover"
                        height={200}
                        alt="..."
                      />
                      {/* <a href="#" className="text-dark">
                        <i
                          className="bi bi-heart position-absolute"
                          style={{ right: '16px', top: '16px' }}
                        ></i>
                      </a> */}
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                          <Link className="link" to={`/product/${product.id}`}>
                            {product.title}
                          </Link>
                        </h4>
                        <p className="card-text mb-0">
                          NT${product.price.toLocaleString()}{' '}
                          <span className="text-muted ">
                            <del>
                              NT${product.origin_price.toLocaleString()}
                            </del>
                          </span>
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <nav className="d-flex justify-content-center">
              <Pagination
                pagination={pagination}
                changePage={(page) => getProducts(page, category)}
              />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
