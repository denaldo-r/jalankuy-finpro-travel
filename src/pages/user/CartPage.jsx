import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, CreditCard, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "../../context/CartContext";
import useTransaction from "../../hooks/useTransaction";
import useCart from "../../hooks/useCart";
import Toast from "../../components/Toast";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import Navbar from "../../components/Navbar";

/* ────────────────────────────────────────────── */
/*                PRESENTATIONAL COMPONENTS      */
/* ────────────────────────────────────────────── */

// A simple loading screen for when cart data is being fetched.
const LoadingScreen = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

// Header with the title and a "select all" checkbox.
const CartHeader = ({ totalItems, allSelected, onSelectAll }) => (
  <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
      Activity Cart
    </h1>
    {totalItems > 0 && (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">Select All</span>
      </div>
    )}
  </div>
);

// Renders a single cart item.
const CartItem = React.memo(
  ({ item, isSelected, onToggleSelect, onChangeQty, onRequestDelete }) => {
    const { id, quantity, activity } = item;
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
      >
        <div className="flex gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(id)}
              className="mt-2 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <img
            src={activity.imageUrls[0]}
            alt={activity.title}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {activity.title}
            </h3>
            <p className="text-gray-600 mt-1">
              {activity.city}, {activity.province}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onChangeQty(id, quantity, -1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </motion.button>
                <motion.span
                  key={quantity}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="font-medium w-8 text-center"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onChangeQty(id, quantity, 1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, color: "#ef4444" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onRequestDelete(id, activity.title)}
                  className="p-2 rounded-full hover:bg-red-50 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  IDR {(activity.price * quantity).toLocaleString("id-ID")}
                </div>
                {activity.price_discount && (
                  <div className="text-sm text-gray-500 line-through">
                    IDR{" "}
                    {(activity.price_discount * quantity).toLocaleString(
                      "id-ID"
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

// Displays a summary of the selected items and total price.
const SummaryCard = ({ selectedCount, totalPrice }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-lg font-semibold mb-4">Summary</h2>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Total Selected</span>
        <span>{selectedCount} items</span>
      </div>
      <div className="flex justify-between">
        <span>Total Price</span>
        <span>IDR {totalPrice.toLocaleString("id-ID")}</span>
      </div>
    </div>
  </div>
);

// Renders available payment methods.
const PaymentMethodCard = ({
  paymentMethods,
  selectedPayment,
  onSelectPayment,
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <motion.div
          key={method.id}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => onSelectPayment(method.id)}
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            selectedPayment === method.id
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {method.type === "CREDIT_CARD" ? (
              <CreditCard className="w-6 h-6 text-gray-600" />
            ) : (
              <Wallet className="w-6 h-6 text-gray-600" />
            )}
          </div>
          <div className="ml-4">
            <h3 className="font-medium">{method.name}</h3>
            <p className="text-sm text-gray-500">{method.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/* ────────────────────────────────────────────── */
/*                CONTAINER COMPONENT            */
/*from Custom Hooks*/

const CartPage = () => {
  const navigate = useNavigate();
  const { updateCartCount } = useCartContext();
  const {
    cartItems,
    loading,
    updateQuantity,
    deleteCartItem,
    selectedItems,
    toggleItemSelection,
    toggleAllItems,
    getSelectedItemsTotal,
  } = useCart();
  const {
    paymentMethods,
    createTransaction,
    loading: creatingTransaction,
  } = useTransaction();

  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [deleteItem, setDeleteItem] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Determine if every cart item is selected.
  const allSelected = useMemo(
    () => cartItems.length > 0 && selectedItems.length === cartItems.length,
    [cartItems, selectedItems]
  );

  // Total price for the selected items.
  const totalPrice = useMemo(
    () => getSelectedItemsTotal(),
    [selectedItems, getSelectedItemsTotal]
  );

  // Memoized event handlers
  const handleSelectAll = useCallback(
    (checked) => {
      toggleAllItems(checked);
    },
    [toggleAllItems]
  );

  const handleToggleItem = useCallback(
    (id) => {
      toggleItemSelection(id);
    },
    [toggleItemSelection]
  );

  const handleChangeQty = useCallback(
    async (id, currentQuantity, delta) => {
      const newQty = currentQuantity + delta;
      if (newQty > 0) {
        const success = await updateQuantity(id, newQty);
        if (!success) {
          setToast({
            show: true,
            message: "Failed to update quantity",
            type: "error",
          });
        }
      }
    },
    [updateQuantity]
  );

  const handleRequestDelete = useCallback((id, name) => {
    setDeleteItem({ id, name });
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteItem) return;
    const success = await deleteCartItem(deleteItem.id);
    if (success) {
      await updateCartCount();
    }
    setToast({
      show: true,
      message: success
        ? `Successfully removed ${deleteItem.name}`
        : "Failed to remove item",
      type: success ? "success" : "error",
    });
    setDeleteItem(null);
  }, [deleteItem, deleteCartItem, updateCartCount]);

  const handleCreateTransaction = useCallback(async () => {
    if (!selectedItems.length) {
      setToast({
        show: true,
        message: "Please select items to checkout",
        type: "error",
      });
      return;
    }
    if (!selectedPayment) {
      setToast({
        show: true,
        message: "Please select a payment method",
        type: "error",
      });
      return;
    }
    try {
      // Assume selectedItems is an array of cart item IDs.
      const result = await createTransaction(selectedItems, selectedPayment);
      if (result.success) {
        navigate(`/payments/${result.transactionId}`);
      } else {
        setToast({
          show: true,
          message: result.error || "Transaction creation failed",
          type: "error",
        });
      }
    } catch (error) {
      setToast({ show: true, message: error.message, type: "error" });
    }
  }, [selectedItems, selectedPayment, createTransaction, navigate]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <CartHeader
          totalItems={cartItems.length}
          allSelected={allSelected}
          onSelectAll={handleSelectAll}
        />
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button
                onClick={() => navigate("/activity")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Activities
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    isSelected={selectedItems.includes(item.id)}
                    onToggleSelect={handleToggleItem}
                    onChangeQty={handleChangeQty}
                    onRequestDelete={handleRequestDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
            <div className="w-full lg:w-1/3 space-y-4">
              <SummaryCard
                selectedCount={selectedItems.length}
                totalPrice={totalPrice}
              />
              <PaymentMethodCard
                paymentMethods={paymentMethods}
                selectedPayment={selectedPayment}
                onSelectPayment={setSelectedPayment}
              />
              <button
                onClick={handleCreateTransaction}
                className="w-full px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
                disabled={creatingTransaction}
              >
                {creatingTransaction ? "Processing..." : "Create Transaction"}
              </button>
            </div>
          </div>
        )}
      </div>
      <DeleteConfirmationModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        itemName={deleteItem?.name}
      />
    </div>
  );
};

export default CartPage;
