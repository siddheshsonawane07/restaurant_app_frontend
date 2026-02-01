// components/AIAssistant.jsx
import { useState } from "react";

export const AIAssistant = ({ context, data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSuggestions = () => {
    switch (context) {
      case "dashboard":
        return [
          {
            icon: "📊",
            title: "Analyze Sales Trends",
            description: "Get insights on peak hours and popular dishes",
            action: "analyze_sales",
          },
          {
            icon: "⚠️",
            title: "Check Low Stock Items",
            description: "View ingredients that need reordering",
            action: "check_stock",
          },
          {
            icon: "💡",
            title: "Optimize Menu Pricing",
            description: "AI recommendations for pricing adjustments",
            action: "optimize_pricing",
          },
          {
            icon: "📈",
            title: "Revenue Forecast",
            description: "Predict next week's revenue based on trends",
            action: "forecast_revenue",
          },
        ];

      case "orders":
        return [
          {
            icon: "⏱️",
            title: "Estimate Preparation Time",
            description: "Calculate total prep time for pending orders",
            action: "estimate_prep_time",
          },
          {
            icon: "🔔",
            title: "Prioritize Orders",
            description: "Get AI suggested order priority",
            action: "prioritize_orders",
          },
          {
            icon: "📞",
            title: "Notify Delayed Orders",
            description: "Send automated updates to customers",
            action: "notify_delays",
          },
          {
            icon: "📋",
            title: "Batch Similar Orders",
            description: "Group orders with common dishes for efficiency",
            action: "batch_orders",
          },
        ];

      case "ingredients":
        return [
          {
            icon: "🛒",
            title: "Generate Shopping List",
            description: "Auto-create list based on low stock items",
            action: "generate_shopping_list",
          },
          {
            icon: "💰",
            title: "Find Cost Savings",
            description: "Identify alternatives for expensive ingredients",
            action: "find_savings",
          },
          {
            icon: "📅",
            title: "Predict Reorder Dates",
            description: "AI estimates when to reorder each ingredient",
            action: "predict_reorder",
          },
          {
            icon: "⚡",
            title: "Optimize Stock Levels",
            description: "Adjust reorder levels based on usage patterns",
            action: "optimize_stock",
          },
        ];

      case "dishes":
        return [
          {
            icon: "🌟",
            title: "Suggest New Dishes",
            description: "Get recommendations based on trending cuisines",
            action: "suggest_dishes",
          },
          {
            icon: "🎯",
            title: "Analyze Dish Performance",
            description: "See which dishes are most profitable",
            action: "analyze_dishes",
          },
          {
            icon: "🔄",
            title: "Update Menu Availability",
            description: "Auto-disable dishes with low stock ingredients",
            action: "update_availability",
          },
          {
            icon: "📸",
            title: "Improve Dish Descriptions",
            description: "AI-enhanced descriptions to boost sales",
            action: "improve_descriptions",
          },
        ];

      default:
        return [];
    }
  };

  const suggestions = getSuggestions();

  const handleSuggestionClick = (action) => {
    console.log(`AI Action triggered: ${action}`);
    // TODO: Implement action handlers
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
        aria-label="AI Assistant"
      >
        <div className="relative">
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
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          AI Suggestions
        </div>
      </button>

      {/* Suggestions Panel */}
      {isExpanded && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-2xl z-50 border border-gray-200 max-h-[600px] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-purple-100">
                  Suggested actions for {context}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-5 h-5"
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

          {/* Suggestions List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {suggestions.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">No suggestions available</p>
              </div>
            ) : (
              suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion.action)}
                  className="w-full text-left bg-gradient-to-r from-gray-50 to-white hover:from-purple-50 hover:to-blue-50 border border-gray-200 hover:border-purple-300 rounded-lg p-4 transition-all hover:shadow-md group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {suggestion.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-purple-700 transition-colors">
                        {suggestion.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {suggestion.description}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>AI Ready</span>
              </div>
              <span>{suggestions.length} suggestions available</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};