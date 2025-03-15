import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import ProductModal from '../../components/ProductModal';
import { Modal } from 'bootstrap';
import DeleteModal from '../../components/DeleteModal';

export interface Product {
  category: string;
  content: string;
  description: string;
  id: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  num: number;
  imageUrl: string;
  imagesUrl: string[];
}

interface Pagination {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
  category: string;
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);
  const [type, setType] = useState<'create' | 'edit'>('create');
  const [tempProduct, setTempProduct] = useState<Product>({} as Product);

  const productModal = useRef<Modal | null>(null);
  const deleteProductModal = useRef<Modal | null>(null);

  useEffect(() => {
    productModal.current = new Modal('#productModal', {
      backdrop: 'static',
    });
    deleteProductModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getProducts();
  }, []);

  const getProducts = async () => {
    const productRes = await axios.get(
      `/v2/api/${import.meta.env.VITE_API_PATH}/admin/products`
    );
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  const openProductModal = (type: 'create' | 'edit', product?: Product) => {
    setType(type);
    if (product) {
      setTempProduct(product);
    }
    productModal.current?.show();
  };

  const closeProductModal = () => {
    productModal.current?.hide();
  };

  const openDeleteProductModal = (product: Product) => {
    setTempProduct(product);
    deleteProductModal.current?.show();
  };

  const closeDeleteProductModal = () => {
    deleteProductModal.current?.hide();
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await axios.delete(
        `/v2/api/${import.meta.env.VITE_API_PATH}/admin/product/${id}`
      );
      if (res.data.success) {
        closeDeleteProductModal();
        getProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3">
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        type={type}
        tempProduct={tempProduct}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteProductModal}
        product={tempProduct}
        handleDelete={deleteProduct}
        id={tempProduct.id}
      />
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openProductModal('create')}
        >
          建立新商品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>NT${product.price}</td>
                <td>{product.is_enabled === 1 ? '啟用' : '未啟用'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openProductModal('edit', product)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteProductModal(product)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link disabled" href="/" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {[...new Array(5)].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li className="page-item" key={`${i}_page`}>
              <a className={`page-link ${i + 1 === 1 && 'active'}`} href="/">
                {i + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="/" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminProducts;
