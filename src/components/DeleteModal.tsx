import { Product } from '../pages/admin/AdminProducts';

interface DeleteModalProps {
  closeDeleteModal: () => void;
  product: Product;
  handleDelete: (id: string) => void;
  id: string;
}

function DeleteModal({
  closeDeleteModal,
  product,
  handleDelete,
  id,
}: DeleteModalProps) {
  return (
    <div
      className="modal fade"
      tabIndex={-1}
      id="deleteModal"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h1 className="modal-title text-white fs-5" id="deleteModalLabel">
              刪除確認
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeDeleteModal}
            />
          </div>
          <div className="modal-body">刪除品項 {product.title}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeDeleteModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(id)}
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
