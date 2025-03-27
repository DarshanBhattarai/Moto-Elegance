import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  FaStar,
  FaUserCircle,
  FaThumbsUp,
  FaRegThumbsUp,
  FaCheck,
  FaChevronLeft,
  FaClock,
  FaArrowRight,
  FaFilter,
  FaSortAmountDown,
  FaPen,
} from "react-icons/fa";
import { format } from "date-fns";
import { api, API_URL } from "../config/api";
import { useAuth } from "../App";

// Sample static car data
const carData = {
  id: 1,
  model: "Camry Hybrid",
  brand: {
    name: "Toyota",
    logo: "https://www.carlogos.org/car-logos/toyota-logo-2019-1350x1500.png",
  },
  year: 2023,
  price: 3299000,
  imageUrl:
    "https://www.cnet.com/a/img/resize/c770348a7a4c39549cab267c012a9e5111dd7242/hub/2022/11/09/34765dfd-4ef0-4f55-9c2a-80d943f97715/honda-accord-hybrid-2023-739229.jpg?auto=webp&fit=crop&height=675&width=1200",
};

// Sample static reviews data with diverse ratings and dates
const sampleReviews = [
  {
    id: 1,
    user: {
      name: "Michael Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true,
    },
    rating: 5,
    title: "Best Car Buying Experience Ever",
    content:
      "The advanced safety features give me confidence when driving with my family. Lane keeping assist and adaptive cruise control are game changers for highway driving. The fuel efficiency exceeds what was advertised, and I'm consistently getting over 50 mpg in mixed driving conditions.",
    pros: "Amazing fuel efficiency, comfortable seats, quiet cabin, reliable performance",
    cons: "Infotainment system could be more intuitive, limited cargo space",
    helpful_count: 24,
    createdAt: "2023-07-15",
    verified: true,
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      verified: true,
    },
    rating: 4,
    title: "Great Value for Money",
    content:
      "I've been driving this car for about three months now and I'm very impressed with its performance. The ride is smooth and the cabin is quiet. The only drawback I've noticed is that the infotainment system can be a bit laggy at times. Overall, I'm very satisfied with my purchase.",
    pros: "Great value, comfortable ride, excellent fuel economy",
    cons: "Laggy infotainment system, limited color options",
    helpful_count: 18,
    createdAt: "2023-08-22",
    verified: true,
  },
  {
    id: 3,
    user: {
      name: "James Rodriguez",
      avatar: null,
      verified: false,
    },
    rating: 3,
    title: "Decent Car, But Expected More",
    content:
      "It's a decent car, but I expected more from a vehicle in this price range. The acceleration is a bit sluggish, especially when merging onto highways. The interior feels somewhat cramped for taller passengers in the back seat. On the positive side, the fuel economy is excellent.",
    pros: "Good fuel economy, reliable, nice exterior design",
    cons: "Sluggish acceleration, cramped back seats for taller passengers",
    helpful_count: 7,
    createdAt: "2023-09-10",
    verified: false,
  },
  {
    id: 4,
    user: {
      name: "David Chen",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      verified: true,
    },
    rating: 5,
    title: "Exceeded All My Expectations",
    content:
      "This car has exceeded all my expectations. The handling is responsive and the acceleration is smooth. I've taken it on several long road trips and it's been incredibly comfortable, with no fatigue even after hours of driving. The fuel economy is impressive, and I've been averaging better than the EPA estimates.",
    pros: "Responsive handling, comfortable for long trips, excellent fuel economy",
    cons: "Premium fuel recommended for best performance",
    helpful_count: 32,
    createdAt: "2023-10-05",
    verified: true,
  },
  {
    id: 5,
    user: {
      name: "Lisa Thompson",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      verified: true,
    },
    rating: 2,
    title: "Disappointed with Quality Issues",
    content:
      "I've had this car for about six months and have experienced several quality issues. The Bluetooth connectivity is unreliable, there's a rattle in the dashboard that the dealer can't seem to fix, and the paint on the hood already shows signs of chipping. Not what I expected from this brand.",
    pros: "Good gas mileage, comfortable seats",
    cons: "Quality control issues, unreliable Bluetooth, paint chips easily",
    helpful_count: 15,
    createdAt: "2023-11-18",
    verified: true,
  },
  {
    id: 6,
    user: {
      name: "Emily Parker",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      verified: false,
    },
    rating: 5,
    title: "The Perfect Family Car",
    content:
      "As a mother of three, I find this car to be perfect for our family needs. There's enough space for everyone, the safety features are comprehensive, and the fuel economy helps us save on our monthly expenses. The car seat anchors are easy to use.",
    pros: "Spacious interior, excellent safety features, good fuel economy",
    cons: "Could use more USB ports for charging devices",
    helpful_count: 12,
    createdAt: "2023-12-02",
    verified: true,
  },
];

const ReviewPage = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [car, setCar] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [helpfulReviews, setHelpfulReviews] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reviewsPerPage = 4;

  // Form state for new review
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    title: "",
    content: "",
    pros: "",
    cons: "",
  });

  useEffect(() => {
    const fetchCarAndReviews = async () => {
      try {
        setLoading(true);
        // Fetch car details
        const carResponse = await api.get(`/cars/${carId}`);
        setCar(carResponse.data);

        // Fetch reviews for this car
        const reviewsResponse = await api.get(`/reviews/car/${carId}`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCarAndReviews();
    }
  }, [carId]);

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Handle helpful votes
  const handleHelpfulClick = async (reviewId) => {
    if (!isAuthenticated) {
      alert("Please log in to mark reviews as helpful");
      return;
    }

    try {
      await api.post(`/reviews/${reviewId}/helpful`);
      setHelpfulReviews((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(reviewId)) {
          newSet.delete(reviewId);
        } else {
          newSet.add(reviewId);
        }
        return newSet;
      });
    } catch (err) {
      console.error("Error marking review as helpful:", err);
      alert("Failed to mark review as helpful. Please try again.");
    }
  };

  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please log in to submit a review");
      return;
    }

    try {
      const response = await api.post(`/reviews/car/${carId}`, reviewForm);
      setReviews((prev) => [response.data, ...prev]);
      setShowWriteReview(false);
      setReviewForm({
        rating: 0,
        title: "",
        content: "",
        pros: "",
        cons: "",
      });
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  // Filter and sort reviews
  const filteredReviews = reviews.filter((review) => {
    if (!filter) return true;
    return review.rating === parseInt(filter);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sort === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sort === "highest") {
      return b.rating - a.rating;
    } else if (sort === "lowest") {
      return a.rating - b.rating;
    } else if (sort === "helpful") {
      return b.helpful_count - a.helpful_count;
    }
    return 0;
  });

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <span className="ml-4 text-gray-700 font-medium">
          Loading reviews...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded text-center">
          <h3 className="text-xl font-semibold mb-2">Error</h3>
          <p>{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-space pb-12">
      {/* Hero Header with Car Info */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-300 hover:text-white mb-8 transition-colors duration-200"
          >
            <FaChevronLeft className="mr-2" />
            <span>Back to Car Details</span>
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Car Image */}
            <div className="w-full md:w-2/5 lg:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={car?.imageUrl}
                  alt={`${car?.brand?.name} ${car?.model}`}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>

            {/* Car Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={car?.brand?.logo}
                  alt={`${car?.brand?.name} logo`}
                  className="h-12 w-auto"
                />
                <h1 className="text-3xl font-bold">
                  {car?.brand?.name} {car?.model}
                </h1>
              </div>
              <p className="text-gray-300 mb-4">{car?.year}</p>

              {/* Review Summary */}
              <div className="bg-gray-800 rounded-lg p-6 mt-4">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-white mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-xl ${
                            index < Math.round(averageRating)
                              ? "text-yellow-400"
                              : "text-gray-500"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-gray-400 text-sm mt-2">
                      Based on {reviews.length} reviews
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-1 gap-2">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = reviews.filter(
                          (r) => r.rating === stars
                        ).length;
                        const percentage = (count / reviews.length) * 100;

                        return (
                          <div key={stars} className="flex items-center gap-3">
                            <div className="flex items-center w-16">
                              <span className="mr-1 text-gray-300">
                                {stars}
                              </span>
                              <FaStar className="text-yellow-400 text-sm" />
                            </div>
                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-red-600 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-10 text-gray-400 text-sm">
                              {count}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 md:mt-0">
                    <button
                      onClick={() => setShowWriteReview(!showWriteReview)}
                      className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 shadow-lg"
                    >
                      <FaPen className="mr-2" />
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
        {/* Review Form */}
        {showWriteReview && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-10 border-t-4 border-red-600 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Write Your Review
            </h2>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Rating Stars */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Rating
                </label>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <FaStar
                        key={index}
                        className={`cursor-pointer text-2xl ${
                          ratingValue <= reviewForm.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } hover:text-yellow-400`}
                        onClick={() =>
                          setReviewForm((prev) => ({
                            ...prev,
                            rating: ratingValue,
                          }))
                        }
                      />
                    );
                  })}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Review Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={reviewForm.title}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Summarize your experience in a few words..."
                  required
                />
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="review"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Your Review
                </label>
                <textarea
                  id="review"
                  value={reviewForm.content}
                  onChange={(e) =>
                    setReviewForm((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Share your experience with this car..."
                  required
                />
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="pros"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Pros
                  </label>
                  <textarea
                    id="pros"
                    value={reviewForm.pros}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        pros: e.target.value,
                      }))
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="What did you like about this car?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cons"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Cons
                  </label>
                  <textarea
                    id="cons"
                    value={reviewForm.cons}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        cons: e.target.value,
                      }))
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="What could be improved about this car?"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowWriteReview(false)}
                  className="mr-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter and Sort Section */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              Customer Reviews
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredReviews.length})
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter by Rating */}
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Sort by */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
                <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {currentReviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-600 mb-4">
              No reviews match your current filters.
            </div>
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg border-l-4 border-red-600"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {review.user.avatar ? (
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          <FaUserCircle className="w-10 h-10" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900 mr-2">
                            {review.user.name}
                          </h4>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                              <FaCheck className="mr-1" size={10} />
                              Verified Owner
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaClock className="mr-1" size={12} />
                          {format(new Date(review.createdAt), "MMMM d, yyyy")}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          size={18}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {review.title}
                  </h3>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {review.content}
                  </p>

                  {(review.pros || review.cons) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {review.pros && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h5 className="font-medium text-green-800 mb-1">
                            Pros
                          </h5>
                          <p className="text-green-700 text-sm">
                            {review.pros}
                          </p>
                        </div>
                      )}
                      {review.cons && (
                        <div className="bg-red-50 p-3 rounded-lg">
                          <h5 className="font-medium text-red-800 mb-1">
                            Cons
                          </h5>
                          <p className="text-red-700 text-sm">{review.cons}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleHelpfulClick(review.id)}
                      className={`flex items-center text-sm ${
                        helpfulReviews.has(review.id)
                          ? "text-red-600"
                          : "text-gray-600 hover:text-red-600"
                      } transition-colors duration-200`}
                    >
                      {helpfulReviews.has(review.id) ? (
                        <FaThumbsUp className="mr-2" />
                      ) : (
                        <FaRegThumbsUp className="mr-2" />
                      )}
                      Helpful (
                      {helpfulReviews.has(review.id)
                        ? review.helpful_count + 1
                        : review.helpful_count}
                      )
                    </button>
                    <Link
                      to="#"
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                      Report
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors duration-200`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add keyframe animation for fade-in effect */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ReviewPage;
