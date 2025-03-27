import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ carId, carModel, brandName }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      setError("Please select a rating");
      return;
    }

    if (!title.trim()) {
      setError("Please provide a review title");
      return;
    }

    if (!review.trim()) {
      setError("Please write your review");
      return;
    }

    // Show loading state
    setLoading(true);
    setError(null);

    // Log form data to console (for demonstration purposes)
    console.log("Review submitted:", {
      carId,
      rating,
      title,
      content: review,
      pros: pros.trim() || null,
      cons: cons.trim() || null,
    });

    // Simulate successful submission after a short delay
    setTimeout(() => {
      setSuccess(true);
      setRating(0);
      setTitle("");
      setReview("");
      setPros("");
      setCons("");
      setLoading(false);

      // Reset success message after 2 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-t-4 border-red-600">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Write a Review for {brandName} {carModel}
      </h3>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-600 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-600 text-green-700 px-4 py-3 rounded mb-6 animate-pulse">
          Thank you for your review! It has been submitted successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Stars */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Rating <span className="text-red-600">*</span>
          </label>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  className={`cursor-pointer text-2xl ${
                    ratingValue <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } hover:scale-110 transition-transform duration-200`}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              );
            })}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {rating > 0
              ? `You selected ${rating} star${rating > 1 ? "s" : ""}`
              : "Click to rate"}
          </p>
        </div>

        {/* Review Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Review Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Summarize your experience in a few words..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>

        {/* Review Text */}
        <div>
          <label
            htmlFor="review"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Your Review <span className="text-red-600">*</span>
          </label>
          <textarea
            id="review"
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Share your experience with this car..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            maxLength={1000}
          />
          <p className="text-right text-xs text-gray-500 mt-1">
            {review.length}/1000 characters
          </p>
        </div>

        {/* Pros & Cons in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros (Optional) */}
          <div>
            <label
              htmlFor="pros"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Pros (Optional)
            </label>
            <textarea
              id="pros"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="What did you like about this car?"
              value={pros}
              onChange={(e) => setPros(e.target.value)}
            />
          </div>

          {/* Cons (Optional) */}
          <div>
            <label
              htmlFor="cons"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Cons (Optional)
            </label>
            <textarea
              id="cons"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="What could be improved about this car?"
              value={cons}
              onChange={(e) => setCons(e.target.value)}
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
          <p>
            By submitting your review, you agree to our review guidelines. We
            reserve the right to remove any review that doesn't comply with our
            terms and conditions.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 bg-red-600 text-white rounded-md transition-colors duration-300 shadow-md hover:bg-red-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
