import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, ArrowLeft, X, FileUp } from "lucide-react";
import useTransaction from "../../hooks/useTransaction.jsx";
import Navbar from "../../components/Navbar/index.jsx";
import Toast from "../../components/Toast.jsx";

const TransactionDetailPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const { uploadProofOfPayment, updateProofPayment, fetchTransaction } =
    useTransaction();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const getTransaction = async () => {
      setLoading(true);
      const result = await fetchTransaction(transactionId);
      if (result.success) {
        setTransaction(result.transaction);
        setUploadedImageUrl(result.transaction.proofPaymentUrl);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    getTransaction();
  }, [transactionId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProofImage(null);
    setPreviewUrl(null);
  };

  const handleUploadProof = async () => {
    if (proofImage) {
      const uploadResult = await uploadProofOfPayment(proofImage);
      if (uploadResult.success) {
        const updateResult = await updateProofPayment(
          transactionId,
          uploadResult.imageUrl
        );
        if (updateResult.success) {
          setToast({
            show: true,
            message: "Payment proof uploaded successfully",
            type: "success",
          });
          setUploadedImageUrl(uploadResult.imageUrl);
          // Refresh transaction details
          window.location.reload();
        } else {
          setToast({
            show: true,
            message: updateResult.error,
            type: "error",
          });
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-red-500">
            {error === "Transaction not found"
              ? "Transaction not found."
              : "Failed to load transaction details."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toast
        {...toast}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          {/* Page Header */}
          <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
            Transaction Detail
          </h1>

          {/* Two-column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Transaction Detail Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Invoice & Status */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4">
                <div>
                  <p className="text-sm text-gray-500">Invoice ID</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {transaction?.invoiceId}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-gray-500 text-right">Status</p>
                  <span
                    className={`inline-block mt-1 px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                      transaction?.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : transaction?.status === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction?.status}
                  </span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="mb-8">
                <p className="text-3xl font-bold text-gray-900">
                  IDR{" "}
                  {transaction?.totalAmount?.toLocaleString("id-ID") ?? "N/A"}
                </p>
              </div>

              {/* Payment Method */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-4">Payment Method</p>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm flex items-center justify-center">
                    <img
                      src={transaction?.payment_method?.imageUrl}
                      alt={transaction?.payment_method?.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {transaction?.payment_method?.name}
                    </p>
                    <p className="text-gray-500">
                      {transaction?.payment_method?.virtual_account_number}
                    </p>
                    <p className="text-xs text-gray-400">
                      VA Name:{" "}
                      {transaction?.payment_method?.virtual_account_name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Proof of Payment */}
              {uploadedImageUrl && (
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-4">Proof of Payment</p>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={uploadedImageUrl}
                      alt="Proof of Payment"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Order Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(transaction?.orderDate).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created: {new Date(transaction?.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Expiration Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(transaction?.expiredDate).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Last Updated:{" "}
                    {new Date(transaction?.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-6">
                <p className="text-sm text-gray-500 mb-4">Items</p>
                {transaction?.transaction_items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 p-4 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={item.imageUrls[0]}
                      alt={item.title}
                      className="w-24 h-24 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-1">
                        {item.quantity} x IDR{" "}
                        {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Update Proof of Payment Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Upload Proof of Payment
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="proof-upload"
                  accept="image/*"
                />
                {previewUrl ? (
                  <div className="relative w-full max-w-md mx-auto">
                    <img
                      src={previewUrl}
                      alt="Payment proof preview"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <p className="mt-4 text-sm text-gray-500">
                      Click "Change Image" to upload this proof of payment
                    </p>
                  </div>
                ) : (
                  <label
                    htmlFor="proof-upload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <FileUp className="w-10 h-10 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Drag your file here or{" "}
                      <span className="text-blue-600">browse</span>
                    </span>
                    <p className="text-xs text-gray-400">
                      Supported formats: JPG, PNG, JPEG
                    </p>
                  </label>
                )}
              </div>
              {proofImage && (
                <button
                  onClick={handleUploadProof}
                  className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Change Image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailPage;
