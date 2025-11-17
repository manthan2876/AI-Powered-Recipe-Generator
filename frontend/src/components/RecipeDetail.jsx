import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { submitReview, toggleFavorite } from "../services/recipes";
import { generateShoppingListFromRecipe } from "../services/shoppingLists";

const RecipeDetail = ({ recipe, onClose, onUpdate }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  const [isSaved, setIsSaved] = useState(recipe?.isSaved || false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [isGeneratingList, setIsGeneratingList] = useState(false);

  useEffect(() => {
    if (recipe) {
      setCurrentRecipe(recipe);
      setIsSaved(recipe.isSaved || false);
      // Check if user has already reviewed
      if (user && recipe.reviews) {
        const review = recipe.reviews.find(r => {
          const reviewUserId = typeof r.user === 'object' ? (r.user._id || r.user) : r.user;
          return reviewUserId === user._id || reviewUserId?.toString() === user._id?.toString();
        });
        if (review) {
          setUserReview(review);
          setRating(review.rating);
          setComment(review.comment || '');
        } else {
          setUserReview(null);
          setRating(0);
          setComment('');
        }
      } else {
        setUserReview(null);
        setRating(0);
        setComment('');
      }
    }
  }, [recipe, user]);

  if (!currentRecipe) return null;

  const handleSave = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      alert("Please login to save recipes");
      return;
    }

    try {
      const result = await toggleFavorite(currentRecipe._id);
      setIsSaved(result.isSaved);
      setCurrentRecipe({ ...currentRecipe, isSaved: result.isSaved });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to save recipe. Please try again.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please login to rate recipes");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitReview(currentRecipe._id, rating, comment);
      // Refresh recipe data
      if (onUpdate) {
        onUpdate();
      }
      setShowReviewForm(false);
      alert("Review submitted successfully!");
      // Reset form
      setComment("");
      if (!userReview) {
        setRating(0);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateShoppingList = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      alert("Please login to generate shopping lists");
      return;
    }

    setIsGeneratingList(true);
    try {
      const shoppingList = await generateShoppingListFromRecipe(currentRecipe);
      // Close the recipe detail modal
      onClose();
      // Navigate to shopping lists page
      navigate("/shopping-lists");
    } catch (error) {
      console.error("Error generating shopping list:", error);
      alert(error.message || "Failed to generate shopping list. Please try again.");
    } finally {
      setIsGeneratingList(false);
    }
  };

  const formatTime = (minutes) => {
    if (!minutes) return "N/A";
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const totalTime = (currentRecipe.prepTime || 0) + (currentRecipe.cookTime || 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    }}
    onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
    >
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: 'clamp(16px, 4vw, 30px)',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        margin: '10px'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: '#666',
            transition: 'background-color 0.2s',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          aria-label="Close"
        >
          ×
        </button>

        {/* Header with Save Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }} className="recipe-detail-header">
          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 28px)',
            fontWeight: 'bold',
            color: '#333',
            margin: 0,
            flex: 1
          }}>
            {currentRecipe.title}
          </h2>
          {user && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleGenerateShoppingList}
                disabled={isGeneratingList}
                style={{
                  padding: '8px 16px',
                  backgroundColor: isGeneratingList ? '#cccccc' : '#4caf50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isGeneratingList ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                aria-label="Generate shopping list"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                {isGeneratingList ? 'Generating...' : 'Generate Shopping List'}
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: '8px 16px',
                  backgroundColor: isSaved ? '#ff4444' : '#f0f0f0',
                  color: isSaved ? '#ffffff' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={isSaved ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>
          )}
        </div>

        {/* Image */}
        {currentRecipe.image && (
          <img
            src={currentRecipe.image}
            alt={currentRecipe.title}
            style={{
              width: '100%',
              height: 'clamp(200px, 40vw, 300px)',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '24px'
            }}
          />
        )}

        {/* Recipe Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px'
        }}>
          {currentRecipe.prepTime && (
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Prep Time</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{formatTime(currentRecipe.prepTime)}</div>
            </div>
          )}
          {currentRecipe.cookTime && (
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Cook Time</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{formatTime(currentRecipe.cookTime)}</div>
            </div>
          )}
          {totalTime > 0 && (
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Total Time</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{formatTime(totalTime)}</div>
            </div>
          )}
          {currentRecipe.servings && (
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Servings</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{currentRecipe.servings}</div>
            </div>
          )}
          {currentRecipe.difficulty && (
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Difficulty</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{currentRecipe.difficulty}</div>
            </div>
          )}
          {currentRecipe.cuisine && (
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Cuisine</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{currentRecipe.cuisine}</div>
            </div>
          )}
          {currentRecipe.mealType && (
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Meal Type</div>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>{currentRecipe.mealType}</div>
            </div>
          )}
        </div>

        {/* Description */}
        {currentRecipe.description && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '12px'
            }}>
              Description
            </h3>
            <p style={{
              color: '#666',
              lineHeight: '1.8',
              fontSize: '15px'
            }}>
              {currentRecipe.description}
            </p>
          </div>
        )}

        {/* Dietary Restrictions */}
        {currentRecipe.dietaryRestrictions && currentRecipe.dietaryRestrictions.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '12px'
            }}>
              Dietary Information
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {currentRecipe.dietaryRestrictions.map((restriction, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >
                  {restriction}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '12px'
          }}>
            Ingredients
          </h3>
          <ul style={{
            listStyle: 'disc',
            paddingLeft: '20px',
            color: '#666',
            lineHeight: '1.8'
          }}>
            {(currentRecipe.ingredients || []).map((ing, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>{ing}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '12px'
          }}>
            Instructions
          </h3>
          {Array.isArray(currentRecipe.instructions) ? (
            <ol style={{
              paddingLeft: '20px',
              color: '#666',
              lineHeight: '1.8'
            }}>
              {currentRecipe.instructions.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>{step}</li>
              ))}
            </ol>
          ) : (
            <p style={{
              whiteSpace: 'pre-line',
              color: '#666',
              lineHeight: '1.8'
            }}>
              {currentRecipe.instructions}
            </p>
          )}
        </div>

        {/* Ratings Section */}
        <div style={{ marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px'
              }}>
                Ratings & Reviews
              </h3>
              {currentRecipe.rating > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
                    {currentRecipe.rating.toFixed(1)}
                  </span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} style={{ fontSize: '20px', color: star <= currentRecipe.rating ? '#ffc107' : '#e0e0e0' }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    ({currentRecipe.numReviews || 0} {currentRecipe.numReviews === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              ) : (
                <p style={{ fontSize: '14px', color: '#666' }}>No ratings yet</p>
              )}
            </div>
            {user && !userReview && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4caf50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {showReviewForm ? 'Cancel' : 'Rate This Recipe'}
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && user && !userReview && (
            <form onSubmit={handleSubmitReview} style={{
              padding: '16px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
                  Your Rating *
                </label>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        fontSize: '32px',
                        color: (hoverRating >= star || rating >= star) ? '#ffc107' : '#e0e0e0',
                        transition: 'color 0.2s'
                      }}
                    >
                      ★
                    </button>
                  ))}
                  {rating > 0 && (
                    <span style={{ marginLeft: '8px', fontSize: '14px', color: '#666' }}>
                      {rating} {rating === 1 ? 'star' : 'stars'}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
                  Your Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts about this recipe..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                style={{
                  padding: '10px 20px',
                  backgroundColor: rating === 0 ? '#ccc' : '#4caf50',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: rating === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}

          {/* User's Review */}
          {userReview && (
            <div style={{
              padding: '16px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#333' }}>Your Review</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} style={{ fontSize: '16px', color: star <= userReview.rating ? '#ffc107' : '#e0e0e0' }}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {new Date(userReview.createdAt).toLocaleDateString()}
                </span>
              </div>
              {userReview.comment && (
                <p style={{ color: '#666', lineHeight: '1.6', margin: 0 }}>{userReview.comment}</p>
              )}
            </div>
          )}

          {/* Other Reviews */}
          {currentRecipe.reviews && currentRecipe.reviews.length > 0 && (
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '12px'
              }}>
                All Reviews
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentRecipe.reviews
                  .filter(review => {
                    if (!user) return true;
                    const reviewUserId = typeof review.user === 'object' ? (review.user._id || review.user) : review.user;
                    const userId = user._id || user;
                    return reviewUserId?.toString() !== userId?.toString();
                  })
                  .map((review, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '12px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '600', color: '#333' }}>
                            {typeof review.user === 'object' ? review.name : review.name}
                          </span>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span key={star} style={{ fontSize: '14px', color: star <= review.rating ? '#ffc107' : '#e0e0e0' }}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {review.comment && (
                        <p style={{ color: '#666', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>{review.comment}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @media (min-width: 640px) {
            .recipe-detail-header {
              flex-direction: row !important;
              align-items: flex-start !important;
            }
            .recipe-detail-header h2 {
              padding-right: 40px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default RecipeDetail;
