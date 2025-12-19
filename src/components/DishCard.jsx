export const DishCard = ({ dish, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {dish.imageUrl && (
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-48 object-cover"
        />
      )}
      {!dish.imageUrl && (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{dish.name}</h3>
          <span className="text-lg font-bold text-green-600">${dish.price.toFixed(2)}</span>
        </div>
        
        {dish.description && (
          <p className="text-gray-600 text-sm mb-3">{dish.description}</p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {dish.category}
          </span>
          {dish.preparationTime && (
            <span className="text-xs text-gray-500">
              {dish.preparationTime} min
            </span>
          )}
        </div>
        
        {dish.available ? (
          <button
            onClick={() => onAddToCart(dish)}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 rounded cursor-not-allowed"
          >
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
};