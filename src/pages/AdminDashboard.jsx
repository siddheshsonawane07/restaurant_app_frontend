// import { useState, useEffect } from "react";
// import { Navbar } from "../components/Navbar";
// import { IngredientForm } from "../components/IngredientForm";
// import { DishForm } from "../components/DishForm";
// import { api } from "../services/api";
// import toast from "react-hot-toast";

// export const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [ingredients, setIngredients] = useState([]);
//   const [dishes, setDishes] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [dashboard, setDashboard] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [showIngredientForm, setShowIngredientForm] = useState(false);
//   const [showDishForm, setShowDishForm] = useState(false);
//   const [editingIngredient, setEditingIngredient] = useState(null);
//   const [editingDish, setEditingDish] = useState(null);

//   useEffect(() => {
//     if (activeTab === "dashboard") {
//       fetchDashboard();
//     } else if (activeTab === "orders") {
//       fetchOrders();
//     } else if (activeTab === "ingredients") {
//       fetchIngredients();
//     } else if (activeTab === "dishes") {
//       fetchDishes();
//     }
//   }, [activeTab]);

//   const fetchDashboard = async () => {
//     setLoading(true);
//     try {
//       console.log(
//         "Fetching dashboard from:",
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/dashboard`
//       );
//       const data = await api.getAdminDashboard();
//       console.log("Dashboard data:", data);
//       setDashboard(data);
//     } catch (error) {
//       console.error("Failed to load dashboard:", error);
//       toast.error(`Failed to load dashboard: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       console.log(
//         "Fetching orders from:",
//         `${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`
//       );
//       const data = await api.getAllOrders();
//       console.log("Orders data:", data);
//       setOrders(data.orders || []);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//       toast.error(`Failed to load orders: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchIngredients = async () => {
//     setLoading(true);
//     try {
//       const response = await api.getIngredients();
//       setIngredients(response.ingredients);
//     } catch (error) {
//       console.error("Failed to fetch ingredients:", error);
//       toast.error("Failed to load ingredients");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDishes = async () => {
//     setLoading(true);
//     try {
//       const response = await api.getMenu();
//       setDishes(response.menu);
//     } catch (error) {
//       console.error("Failed to fetch dishes:", error);
//       toast.error("Failed to load dishes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       console.log("Updating order status:", { orderId, newStatus });
//       await api.updateOrderStatus(orderId, { newStatus });
//       toast.success(`Order ${newStatus}`);
//       fetchOrders();
//       if (activeTab === "dashboard") {
//         fetchDashboard();
//       }
//     } catch (error) {
//       console.error("Failed to update order:", error);
//       toast.error(`Failed to update order: ${error.message}`);
//     }
//   };

//   const handleViewOrderDetails = async (orderId) => {
//     try {
//       const orderDetails = await api.getOrderDetails(orderId);
//       setSelectedOrder(orderDetails);
//       setShowOrderDetails(true);
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//       toast.error("Failed to fetch order details");
//     }
//   };

//   const handleDeleteIngredient = async (ingredientName) => {
//     if (window.confirm(`Are you sure you want to delete ${ingredientName}?`)) {
//       try {
//         await api.deleteIngredient(ingredientName);
//         toast.success("Ingredient deleted successfully");
//         fetchIngredients();
//       } catch (error) {
//         console.error("Failed to delete ingredient:", error);
//         toast.error("Failed to delete ingredient");
//       }
//     }
//   };

//   const handleDeleteDish = async (dishName) => {
//     if (window.confirm(`Are you sure you want to delete ${dishName}?`)) {
//       try {
//         await api.deleteDish(dishName);
//         toast.success("Dish deleted successfully");
//         fetchDishes();
//       } catch (error) {
//         console.error("Failed to delete dish:", error);
//         toast.error("Failed to delete dish");
//       }
//     }
//   };

//   const handleEditIngredient = (ingredient) => {
//     setEditingIngredient(ingredient);
//     setShowIngredientForm(true);
//   };

//   const handleEditDish = (dish) => {
//     setEditingDish(dish);
//     setShowDishForm(true);
//   };

//   const handleCloseIngredientForm = () => {
//     setShowIngredientForm(false);
//     setEditingIngredient(null);
//   };

//   const handleCloseDishForm = () => {
//     setShowDishForm(false);
//     setEditingDish(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">
//           Admin Dashboard
//         </h1>

//         <div className="bg-white rounded-lg shadow">
//           <div className="border-b border-gray-200">
//             <nav className="flex -mb-px">
//               <button
//                 onClick={() => setActiveTab("dashboard")}
//                 className={`py-4 px-6 text-sm font-medium ${
//                   activeTab === "dashboard"
//                     ? "border-b-2 border-blue-500 text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Dashboard
//               </button>
//               <button
//                 onClick={() => setActiveTab("orders")}
//                 className={`py-4 px-6 text-sm font-medium ${
//                   activeTab === "orders"
//                     ? "border-b-2 border-blue-500 text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Manage Orders
//               </button>
//               <button
//                 onClick={() => setActiveTab("ingredients")}
//                 className={`py-4 px-6 text-sm font-medium ${
//                   activeTab === "ingredients"
//                     ? "border-b-2 border-blue-500 text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Manage Ingredients
//               </button>
//               <button
//                 onClick={() => setActiveTab("dishes")}
//                 className={`py-4 px-6 text-sm font-medium ${
//                   activeTab === "dishes"
//                     ? "border-b-2 border-blue-500 text-blue-600"
//                     : "text-gray-500 hover:text-gray-700"
//                 }`}
//               >
//                 Manage Dishes
//               </button>
//             </nav>
//           </div>

//           <div className="p-6">
//             {activeTab === "dashboard" && (
//               <div>
//                 {loading ? (
//                   <div className="flex justify-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   </div>
//                 ) : dashboard ? (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {Object.entries(dashboard.counts).map(([status, count]) => (
//                       <div
//                         key={status}
//                         className="bg-white border border-gray-200 rounded-lg p-6 text-center"
//                       >
//                         <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
//                           {status}
//                         </p>
//                         <p className="text-3xl font-bold text-gray-900">
//                           {count}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 text-center py-8">
//                     No dashboard data available
//                   </p>
//                 )}
//               </div>
//             )}

//             {activeTab === "orders" && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-6">Active Orders</h2>

//                 {loading ? (
//                   <div className="flex justify-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   </div>
//                 ) : orders.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8">
//                     No active orders
//                   </p>
//                 ) : (
//                   <div className="space-y-4">
//                     {orders.map((order) => (
//                       <div
//                         key={order.orderId}
//                         className="border border-gray-200 rounded-lg p-4"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <div>
//                             <p className="font-semibold text-lg text-gray-900">
//                               Order #{order.orderId.slice(-6)}
//                             </p>
//                             {/* <p className="text-sm text-gray-600 mt-1">
//                               {order.customerName}
//                             </p> */}
//                             <span
//                               className={`inline-flex mt-2 text-xs leading-5 font-semibold rounded-full px-2 py-1 capitalize ${
//                                 order.status === "pending"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : order.status === "accepted"
//                                   ? "bg-blue-100 text-blue-800"
//                                   : order.status === "preparing"
//                                   ? "bg-purple-100 text-purple-800"
//                                   : "bg-green-100 text-green-800"
//                               }`}
//                             >
//                               {order.status}
//                             </span>
//                           </div>
//                           {/* 
//                           <button
//                             onClick={() => handleViewOrderDetails(order.orderId)}
//                             className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                           >
//                             View Full Details
//                           </button> */}
//                         </div>

//                         <div className="bg-gray-50 rounded p-3 mb-3">
//                           <p className="text-xs font-medium text-gray-700 mb-2">
//                             Order Items:
//                           </p>
//                           <div className="space-y-1">
//                             {order.items.map((item, index) => (
//                               <div
//                                 key={index}
//                                 className="flex justify-between text-sm"
//                               >
//                                 <span className="text-gray-700">
//                                   {item.quantity}x {item.dishName}
//                                 </span>
//                                 <span className="text-gray-600">
//                                   $
//                                   {(item.priceAtOrder * item.quantity).toFixed(
//                                     2
//                                   )}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                           <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
//                             <span className="text-sm font-semibold text-gray-900">
//                               Total
//                             </span>
//                             <span className="text-sm font-bold text-green-600">
//                               ${order.totalAmount.toFixed(2)}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="flex gap-2 justify-end">
//                           {order.status === "pending" && (
//                             <>
//                               <button
//                                 onClick={() =>
//                                   updateOrderStatus(order.orderId, "accepted")
//                                 }
//                                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                               >
//                                 Accept
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   updateOrderStatus(order.orderId, "rejected")
//                                 }
//                                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//                               >
//                                 Reject
//                               </button>
//                             </>
//                           )}

//                           {order.status === "accepted" && (
//                             <button
//                               onClick={() =>
//                                 updateOrderStatus(order.orderId, "preparing")
//                               }
//                               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                             >
//                               Start Preparing
//                             </button>
//                           )}

//                           {order.status === "preparing" && (
//                             <button
//                               onClick={() =>
//                                 updateOrderStatus(order.orderId, "ready")
//                               }
//                               className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//                             >
//                               Mark Ready
//                             </button>
//                           )}

//                           {order.status === "ready" && (
//                             <button
//                               onClick={() =>
//                                 updateOrderStatus(order.orderId, "completed")
//                               }
//                               className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
//                             >
//                               Complete
//                             </button>
//                           )}

//                           {(order.status === "completed" ||
//                             order.status === "rejected") && (
//                             <span className="text-sm text-gray-500 italic">
//                               Order {order.status}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === "ingredients" && (
//               <div>
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-semibold">Ingredients</h2>
//                   <button
//                     onClick={() => setShowIngredientForm(true)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Add New Ingredient
//                   </button>
//                 </div>

//                 {loading ? (
//                   <div className="flex justify-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   </div>
//                 ) : ingredients.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8">
//                     No ingredients added yet
//                   </p>
//                 ) : (
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Name
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Unit
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Quantity
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Reorder Level
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Cost
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Status
//                           </th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {ingredients.map((ingredient) => (
//                           <tr key={ingredient.name}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                               {ingredient.name}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {ingredient.unit}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {ingredient.quantity}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {ingredient.reorderLevel || "N/A"}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {ingredient.cost
//                                 ? `$${ingredient.cost.toFixed(2)}`
//                                 : "N/A"}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               {ingredient.reorderLevel &&
//                               ingredient.quantity < ingredient.reorderLevel ? (
//                                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                   Low Stock
//                                 </span>
//                               ) : (
//                                 <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                   In Stock
//                                 </span>
//                               )}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                               <button
//                                 onClick={() => handleEditIngredient(ingredient)}
//                                 className="text-blue-600 hover:text-blue-900 mr-4"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   handleDeleteIngredient(ingredient.name)
//                                 }
//                                 className="text-red-600 hover:text-red-900"
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === "dishes" && (
//               <div>
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-semibold">Dishes</h2>
//                   <button
//                     onClick={() => setShowDishForm(true)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Add New Dish
//                   </button>
//                 </div>

//                 {loading ? (
//                   <div className="flex justify-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//                   </div>
//                 ) : dishes.length === 0 ? (
//                   <p className="text-gray-500 text-center py-8">
//                     No dishes added yet
//                   </p>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {dishes.map((dish) => (
//                       <div
//                         key={dish.name}
//                         className="border border-gray-200 rounded-lg p-4"
//                       >
//                         {dish.imageUrl && (
//                           <img
//                             src={dish.imageUrl}
//                             alt={dish.name}
//                             className="w-full h-32 object-cover rounded mb-3"
//                           />
//                         )}
//                         <h3 className="font-semibold text-lg mb-1">
//                           {dish.name}
//                         </h3>
//                         <p className="text-gray-600 text-sm mb-2">
//                           {dish.description}
//                         </p>
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="text-lg font-bold text-green-600">
//                             ${dish.price.toFixed(2)}
//                           </span>
//                           <span
//                             className={`text-xs px-2 py-1 rounded ${
//                               dish.available
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {dish.available ? "Available" : "Unavailable"}
//                           </span>
//                         </div>
//                         <div className="mb-3">
//                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
//                             {dish.category}
//                           </span>
//                         </div>
//                         <div className="flex gap-2 pt-2 border-t border-gray-200">
//                           <button
//                             onClick={() => handleEditDish(dish)}
//                             className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDeleteDish(dish.name)}
//                             className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showIngredientForm && (
//         <IngredientForm
//           ingredient={editingIngredient}
//           onSuccess={() => {
//             fetchIngredients();
//             handleCloseIngredientForm();
//           }}
//           onClose={handleCloseIngredientForm}
//         />
//       )}

//       {showDishForm && (
//         <DishForm
//           dish={editingDish}
//           onSuccess={() => {
//             fetchDishes();
//             handleCloseDishForm();
//           }}
//           onClose={handleCloseDishForm}
//         />
//       )}

//       {showOrderDetails && selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Order #{selectedOrder.orderId.slice(-6)}
//                   </h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {new Date(selectedOrder.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => setShowOrderDetails(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">
//                   Customer Information
//                 </h3>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   {/* <p className="text-sm">
//                     <span className="font-medium">Name:</span> {selectedOrder.customerName}
//                   </p>
//                   {selectedOrder.customerEmail && (
//                     <p className="text-sm mt-1">
//                       <span className="font-medium">Email:</span> {selectedOrder.customerEmail}
//                     </p>
//                   )} */}
//                   <p className="text-sm mt-1">
//                     <span className="font-medium">Status:</span>
//                     <span
//                       className={`ml-2 inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 capitalize ${
//                         selectedOrder.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : selectedOrder.status === "accepted"
//                           ? "bg-blue-100 text-blue-800"
//                           : selectedOrder.status === "preparing"
//                           ? "bg-purple-100 text-purple-800"
//                           : selectedOrder.status === "ready"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {selectedOrder.status}
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-sm font-medium text-gray-700 mb-3">
//                   Order Items
//                 </h3>
//                 <div className="space-y-3">
//                   {selectedOrder.items.map((item, index) => (
//                     <div key={index} className="bg-gray-50 rounded-lg p-4">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <p className="font-medium text-gray-900">
//                             {item.dishName}
//                           </p>
//                           <p className="text-sm text-gray-600 mt-1">
//                             Quantity: {item.quantity} × $
//                             {item.priceAtOrder.toFixed(2)}
//                           </p>
//                         </div>
//                         <p className="font-semibold text-gray-900">
//                           ${item.subtotal.toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 pt-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-semibold text-gray-900">
//                     Total Amount
//                   </span>
//                   <span className="text-2xl font-bold text-green-600">
//                     ${selectedOrder.totalAmount.toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6 flex gap-3">
//                 {selectedOrder.status === "pending" && (
//                   <>
//                     <button
//                       onClick={() => {
//                         updateOrderStatus(selectedOrder.orderId, "accepted");
//                         setShowOrderDetails(false);
//                       }}
//                       className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     >
//                       Accept Order
//                     </button>
//                     <button
//                       onClick={() => {
//                         updateOrderStatus(selectedOrder.orderId, "rejected");
//                         setShowOrderDetails(false);
//                       }}
//                       className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//                     >
//                       Reject Order
//                     </button>
//                   </>
//                 )}

//                 {selectedOrder.status === "accepted" && (
//                   <button
//                     onClick={() => {
//                       updateOrderStatus(selectedOrder.orderId, "preparing");
//                       setShowOrderDetails(false);
//                     }}
//                     className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Start Preparing
//                   </button>
//                 )}

//                 {selectedOrder.status === "preparing" && (
//                   <button
//                     onClick={() => {
//                       updateOrderStatus(selectedOrder.orderId, "ready");
//                       setShowOrderDetails(false);
//                     }}
//                     className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//                   >
//                     Mark as Ready
//                   </button>
//                 )}

//                 {selectedOrder.status === "ready" && (
//                   <button
//                     onClick={() => {
//                       updateOrderStatus(selectedOrder.orderId, "completed");
//                       setShowOrderDetails(false);
//                     }}
//                     className="flex-1 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
//                   >
//                     Complete Order
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { IngredientForm } from "../components/IngredientForm";
import { DishForm } from "../components/DishForm";
import { api } from "../services/api";
import toast from "react-hot-toast";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [ingredients, setIngredients] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [showDishForm, setShowDishForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [editingDish, setEditingDish] = useState(null);

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchDashboard();
    } else if (activeTab === "orders") {
      fetchOrders();
    } else if (activeTab === "ingredients") {
      fetchIngredients();
    } else if (activeTab === "dishes") {
      fetchDishes();
    }
  }, [activeTab]);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      console.log(
        "Fetching dashboard from:",
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/dashboard`
      );
      const data = await api.getAdminDashboard();
      console.log("Dashboard data:", data);
      setDashboard(data);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      toast.error(`Failed to load dashboard: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log(
        "Fetching orders from:",
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`
      );
      const data = await api.getAllOrders();
      console.log("Orders data:", data);
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error(`Failed to load orders: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredients = async () => {
    setLoading(true);
    try {
      const response = await api.getIngredients();
      setIngredients(response.ingredients);
    } catch (error) {
      console.error("Failed to fetch ingredients:", error);
      toast.error("Failed to load ingredients");
    } finally {
      setLoading(false);
    }
  };

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const response = await api.getMenu();
      setDishes(response.menu);
    } catch (error) {
      console.error("Failed to fetch dishes:", error);
      toast.error("Failed to load dishes");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log("Updating order status:", { orderId, newStatus });
      await api.updateOrderStatus(orderId, { newStatus });
      toast.success(`Order ${newStatus}`);
      fetchOrders();
      if (activeTab === "dashboard") {
        fetchDashboard();
      }
    } catch (error) {
      console.error("Failed to update order:", error);
      toast.error(`Failed to update order: ${error.message}`);
    }
  };

  const handleViewOrderDetails = async (orderId) => {
    try {
      const orderDetails = await api.getOrderDetails(orderId);
      setSelectedOrder(orderDetails);
      setShowOrderDetails(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to fetch order details");
    }
  };

  const handleDeleteIngredient = async (ingredientName) => {
    if (window.confirm(`Are you sure you want to delete ${ingredientName}?`)) {
      try {
        await api.deleteIngredient(ingredientName);
        toast.success("Ingredient deleted successfully");
        fetchIngredients();
      } catch (error) {
        console.error("Failed to delete ingredient:", error);
        toast.error("Failed to delete ingredient");
      }
    }
  };

  const handleDeleteDish = async (dishName) => {
    if (window.confirm(`Are you sure you want to delete ${dishName}?`)) {
      try {
        await api.deleteDish(dishName);
        toast.success("Dish deleted successfully");
        fetchDishes();
      } catch (error) {
        console.error("Failed to delete dish:", error);
        toast.error("Failed to delete dish");
      }
    }
  };

  const handleEditIngredient = (ingredient) => {
    setEditingIngredient(ingredient);
    setShowIngredientForm(true);
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
    setShowDishForm(true);
  };

  const handleCloseIngredientForm = () => {
    setShowIngredientForm(false);
    setEditingIngredient(null);
  };

  const handleCloseDishForm = () => {
    setShowDishForm(false);
    setEditingDish(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "dashboard"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "orders"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Manage Orders
              </button>
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "ingredients"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Manage Ingredients
              </button>
              <button
                onClick={() => setActiveTab("dishes")}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === "dishes"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Manage Dishes
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "dashboard" && (
              <div>
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : dashboard ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(dashboard.counts).map(([status, count]) => (
                      <div
                        key={status}
                        className="bg-white border border-gray-200 rounded-lg p-6 text-center"
                      >
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                          {status}
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {count}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No dashboard data available
                  </p>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Active Orders</h2>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No active orders
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.orderId}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-lg text-gray-900">
                              Order #{order.orderId.slice(-6)}
                            </p>
                            {/* <p className="text-sm text-gray-600 mt-1">
                              {order.customerName}
                            </p> */}
                            <span
                              className={`inline-flex mt-2 text-xs leading-5 font-semibold rounded-full px-2 py-1 capitalize ${
                                order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "accepted"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "preparing"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          {/* 
                          <button
                            onClick={() => handleViewOrderDetails(order.orderId)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Full Details
                          </button> */}
                        </div>

                        <div className="bg-gray-50 rounded p-3 mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-2">
                            Order Items:
                          </p>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-gray-700">
                                  {item.quantity}x {item.dishName}
                                </span>
                                <span className="text-gray-600">
                                  $
                                  {(item.priceAtOrder * item.quantity).toFixed(
                                    2
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                            <span className="text-sm font-semibold text-gray-900">
                              Total
                            </span>
                            <span className="text-sm font-bold text-green-600">
                              ${order.totalAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end">
                          {order.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateOrderStatus(order.orderId, "accepted")
                                }
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  updateOrderStatus(order.orderId, "rejected")
                                }
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {order.status === "accepted" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.orderId, "preparing")
                              }
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                              Start Preparing
                            </button>
                          )}

                          {order.status === "preparing" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.orderId, "ready")
                              }
                              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                            >
                              Mark Ready
                            </button>
                          )}

                          {order.status === "ready" && (
                            <button
                              onClick={() =>
                                updateOrderStatus(order.orderId, "completed")
                              }
                              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                            >
                              Complete
                            </button>
                          )}

                          {(order.status === "completed" ||
                            order.status === "rejected") && (
                            <span className="text-sm text-gray-500 italic">
                              Order {order.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "ingredients" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Ingredients</h2>
                  <button
                    onClick={() => setShowIngredientForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add New Ingredient
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : ingredients.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No ingredients added yet
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unit
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reorder Level
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {ingredients.map((ingredient) => (
                          <tr key={ingredient.name}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {ingredient.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ingredient.unit}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ingredient.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ingredient.reorderLevel || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ingredient.cost
                                ? `$${ingredient.cost.toFixed(2)}`
                                : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {ingredient.reorderLevel &&
                              ingredient.quantity < ingredient.reorderLevel ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  Low Stock
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  In Stock
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEditIngredient(ingredient)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteIngredient(ingredient.name)
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "dishes" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Dishes</h2>
                  <button
                    onClick={() => setShowDishForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add New Dish
                  </button>
                </div>

                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : dishes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No dishes added yet
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dishes.map((dish) => (
                      <div
                        key={dish.name}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        {dish.imageUrl && (
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            className="w-full h-32 object-cover rounded mb-3"
                          />
                        )}
                        <h3 className="font-semibold text-lg mb-1">
                          {dish.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {dish.description}
                        </p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-bold text-green-600">
                            ${dish.price.toFixed(2)}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              dish.available
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {dish.available ? "Available" : "Unavailable"}
                          </span>
                        </div>
                        <div className="mb-3">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {dish.category}
                          </span>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-gray-200">
                          <button
                            onClick={() => handleEditDish(dish)}
                            className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDish(dish.name)}
                            className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showIngredientForm && (
        <IngredientForm
          ingredient={editingIngredient}
          onSuccess={() => {
            fetchIngredients();
            handleCloseIngredientForm();
          }}
          onClose={handleCloseIngredientForm}
        />
      )}

      {showDishForm && (
        <DishForm
          dish={editingDish}
          onSuccess={() => {
            fetchDishes();
            handleCloseDishForm();
          }}
          onClose={handleCloseDishForm}
        />
      )}

      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order #{selectedOrder.orderId.slice(-6)}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Customer Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {/* <p className="text-sm">
                    <span className="font-medium">Name:</span> {selectedOrder.customerName}
                  </p>
                  {selectedOrder.customerEmail && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Email:</span> {selectedOrder.customerEmail}
                    </p>
                  )} */}
                  <p className="text-sm mt-1">
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 capitalize ${
                        selectedOrder.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedOrder.status === "accepted"
                          ? "bg-blue-100 text-blue-800"
                          : selectedOrder.status === "preparing"
                          ? "bg-purple-100 text-purple-800"
                          : selectedOrder.status === "ready"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.dishName}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Quantity: {item.quantity} × $
                            {item.priceAtOrder.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${selectedOrder.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {selectedOrder.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.orderId, "accepted");
                        setShowOrderDetails(false);
                      }}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Accept Order
                    </button>
                    <button
                      onClick={() => {
                        updateOrderStatus(selectedOrder.orderId, "rejected");
                        setShowOrderDetails(false);
                      }}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Reject Order
                    </button>
                  </>
                )}

                {selectedOrder.status === "accepted" && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.orderId, "preparing");
                      setShowOrderDetails(false);
                    }}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Start Preparing
                  </button>
                )}

                {selectedOrder.status === "preparing" && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.orderId, "ready");
                      setShowOrderDetails(false);
                    }}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Mark as Ready
                  </button>
                )}

                {selectedOrder.status === "ready" && (
                  <button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.orderId, "completed");
                      setShowOrderDetails(false);
                    }}
                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                  >
                    Complete Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
