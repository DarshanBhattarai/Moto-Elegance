import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { api, API_URL } from "../config/api";
import {
  FaStar,
  FaUserCircle,
  FaThumbsUp,
  FaCheck,
  FaCar,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import { format } from "date-fns";
import { useAuth } from "../App";

// Sample static reviews data for default view
const sampleReviews = [
  {
    id: 1,
    user: {
      name: "Michael Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true,
    },
    car: {
      id: 1,
      model: "Camry Hybrid",
      brand: {
        name: "Toyota",
        logo: "https://www.carlogos.org/car-logos/toyota-logo-2019-1350x1500.png",
      },
      year: 2023,
      imageUrl:
        "https://www.cnet.com/a/img/resize/c770348a7a4c39549cab267c012a9e5111dd7242/hub/2022/11/09/34765dfd-4ef0-4f55-9c2a-80d943f97715/honda-accord-hybrid-2023-739229.jpg?auto=webp&fit=crop&height=675&width=1200",
    },
    rating: 5,
    title: "Best Car Buying Experience Ever",
    content:
      "The advanced safety features give me confidence when driving with my family. Lane keeping assist and adaptive cruise control are game changers for highway driving. The fuel efficiency exceeds what was advertised, and I'm consistently getting over 50 mpg in mixed driving conditions.",
    pros: "Amazing fuel efficiency, comfortable seats, quiet cabin, reliable performance",
    cons: "Infotainment system could be more intuitive, limited cargo space",
    helpful_count: 24,
    createdAt: "2023-12-15",
    verified: true,
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      verified: true,
    },
    car: {
      id: 2,
      model: "Model 3",
      brand: {
        name: "Tesla",
        logo: "https://www.carlogos.org/car-logos/tesla-logo-2200x2800.png",
      },
      year: 2023,
      imageUrl:
        "https://www.topgear.com/sites/default/files/2022/12/TopGear%20-%20Tesla%20Model%203%20-%20001.jpg",
    },
    rating: 4,
    title: "Great Electric Vehicle, Some Software Issues",
    content:
      "The acceleration and handling are phenomenal, and the minimalist interior has grown on me. The autopilot feature works well in most situations, though it can get confused on poorly marked roads. Charging at home is convenient but I wish the supercharger network was a bit more extensive in rural areas.",
    pros: "Instant acceleration, minimal maintenance, regular software updates",
    cons: "Occasional software glitches, limited service centers",
    helpful_count: 18,
    createdAt: "2023-11-22",
    verified: true,
  },
  {
    id: 3,
    user: {
      name: "James Rodriguez",
      avatar: null,
      verified: false,
    },
    car: {
      id: 3,
      model: "Civic",
      brand: {
        name: "Honda",
        logo: "https://www.carlogos.org/logo/Honda-logo-1920x1080.png",
      },
      year: 2023,
      imageUrl:
        "https://cars.usnews.com/images/article/202209/128845/1_Title_2022_Honda_Civic_Si.jpg",
    },
    rating: 5,
    title: "Perfect Daily Driver",
    content:
      "I've put 10,000 miles on my Civic in the first 6 months and have zero complaints. The fuel economy is excellent, even in heavy city traffic. The redesigned interior feels much more premium than previous generations. Honda Sensing safety features give great peace of mind.",
    pros: "Fuel efficient, reliable, spacious for a compact car",
    cons: "Road noise could be better dampened at highway speeds",
    helpful_count: 15,
    createdAt: "2023-10-05",
    verified: false,
  },
  {
    id: 4,
    user: {
      name: "Emily Parker",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      verified: true,
    },
    car: {
      id: 4,
      model: "Grand Cherokee",
      brand: {
        name: "Jeep",
        logo: "https://www.carlogos.org/car-logos/jeep-logo-1993-show.png",
      },
      year: 2023,
      imageUrl:
        "https://www.topgear.com/sites/default/files/cars-car/image/2021/10/grand_cherokee_5.jpg",
    },
    rating: 4,
    title: "Great SUV with Some Premium Features",
    content:
      "The new Grand Cherokee has an impressive blend of off-road capability and on-road comfort. The interior quality is significantly improved over previous generations, and the tech features are intuitive to use. My only complaint is the fuel economy, which is what you'd expect from an SUV of this size.",
    pros: "Comfortable ride, capable off-road, luxurious interior",
    cons: "Fuel economy could be better, some options are pricey",
    helpful_count: 12,
    createdAt: "2023-09-02",
    verified: true,
  },
];

const UserReviews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [helpfulReviews, setHelpfulReviews] = useState(new Set());

  // Determine if we're showing car-specific reviews, user reviews, or all reviews
  const isCarReviews = location.pathname.includes("/car/");
  const isMainReviewsPage = location.pathname === "/reviews";

  useEffect(() => {
    // For user reviews, redirect to login if not authenticated
    if (!isCarReviews && !isMainReviewsPage && !isAuthenticated) {
      console.log("User not authenticated, redirecting to home");
      navigate("/");
      return;
    }

    const fetchReviews = async () => {
      try {
        setLoading(true);

        if (isMainReviewsPage) {
          // For main reviews page, use sample data
          setReviews(sampleReviews);
          // Calculate average rating
          const avg =
            sampleReviews.reduce((acc, review) => acc + review.rating, 0) /
            sampleReviews.length;
          setAverageRating(avg.toFixed(1));
          setLoading(false);
          return;
        }

        if (isCarReviews && id) {
          // Fetch car-specific reviews
          console.log("Fetching car reviews for car ID:", id);
          const carResponse = await api.get(`/cars/${id}`);
          setCar(carResponse.data);

          const reviewsResponse = await api.get(`/reviews/car/${id}`);
          setReviews(reviewsResponse.data);

          // Calculate average rating
          if (reviewsResponse.data.length > 0) {
            const avg =
              reviewsResponse.data.reduce(
                (acc, review) => acc + review.rating,
                0
              ) / reviewsResponse.data.length;
            setAverageRating(avg.toFixed(1));
          }
        } else {
          // Fetch user reviews - token automatically included by api interceptor
          console.log("Fetching user reviews. Auth status:", isAuthenticated);

          const response = await api.get(`/reviews/user`);

          console.log(
            "User reviews response received:",
            response.data.length,
            "reviews"
          );
          setReviews(response.data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);

        // Enhanced error logging
        if (err.response) {
          console.error("Error status:", err.response.status);
          console.error("Error details:", err.response.data);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error message:", err.message);
        }

        setError(
          isCarReviews
            ? "Failed to load car reviews"
            : "Failed to load your reviews. Please make sure you're logged in and the server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [isAuthenticated, navigate, id, isCarReviews, isMainReviewsPage, user]);

  // Handle helpful votes
  const handleHelpfulClick = (reviewId) => {
    setHelpfulReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <span className="ml-4 text-gray-700 font-medium">
          Loading reviews...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-8 min-h-screen bg-gray-50">
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

  // Render main reviews page
  if (isMainReviewsPage) {
    return (
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Hero Header */}
        <div className="bg-black text-white">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Read authentic reviews from our community of car owners. Discover
              real experiences and make informed decisions for your next vehicle
              purchase.
            </p>

            <div className="mt-6 bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-white mb-2">
                    {averageRating}
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
                            <span className="mr-1 text-gray-300">{stars}</span>
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
                  <Link
                    to="/cars"
                    className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 shadow-lg"
                  >
                    <FaCar className="mr-2" />
                    Browse Cars to Review
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filter and Sort Section */}
          <div className="bg-white rounded-lg shadow-md p-5 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                Recent Reviews
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredReviews.length})
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Filter by Rating */}
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
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
                    onChange={(e) => setSort(e.target.value)}
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
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg border-l-4 border-red-600"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
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
                        <p className="text-sm text-gray-500">
                          {format(new Date(review.createdAt), "MMMM d, yyyy")}
                        </p>
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

                  {/* Car Info */}
                  <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                    <Link
                      to={`/car/${review.car.id}`}
                      className="flex items-center gap-3 text-gray-800 hover:text-red-600 transition-colors"
                    >
                      <img
                        src={review.car.brand.logo}
                        alt={review.car.brand.name}
                        className="h-8 w-auto"
                      />
                      <div>
                        <span className="font-semibold">
                          {review.car.brand.name} {review.car.model}
                        </span>
                        <span className="text-gray-500 ml-2">
                          {review.car.year}
                        </span>
                      </div>
                    </Link>
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
                      <FaThumbsUp className="mr-2" />
                      Helpful (
                      {helpfulReviews.has(review.id)
                        ? review.helpful_count + 1
                        : review.helpful_count}
                      )
                    </button>
                    <Link
                      to={`/car/${review.car.id}`}
                      className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
                    >
                      View Car Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render car-specific reviews
  if (isCarReviews) {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-red-600 hover:text-red-800 mb-4 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Car Details
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reviews for {car?.brand?.name} {car?.model}
          </h1>

          {/* Average Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-2xl ${
                    index < Math.round(averageRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-700">
              {averageRating} / 5
            </span>
            <span className="ml-2 text-gray-600">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-600">
                No reviews yet. Be the first to review this car!
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-600"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {review.user?.name || "Anonymous User"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-lg ${
                          index < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {review.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Render user reviews
  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Reviews</h1>

      {reviews.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">
            You haven't written any reviews yet.
          </p>
          <Link
            to="/cars"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            Browse Cars to Review
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-600"
            >
              <div className="flex justify-between mb-4">
                <Link
                  to={`/car/${review.car.id}`}
                  className="text-xl font-semibold text-red-600 hover:text-red-800"
                >
                  {review.car.model}
                </Link>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-lg ${
                        index < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap mb-4">
                {review.content}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>
                  {format(new Date(review.createdAt), "MMMM d, yyyy")}
                </span>
                <div className="flex space-x-4">
                  <Link
                    to={`/car/${review.car.id}`}
                    className="text-red-600 hover:text-red-800"
                  >
                    View Car Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
