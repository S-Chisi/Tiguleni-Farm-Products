import React, { useState } from "react";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Card, Row, Col, Button } from 'react-bootstrap';
import StarRating from './StarRating';
import FeedbackForm from './FeedbackForm';
import './RatingAndReviews.css';

const ProductBuyNowPage = ({ feedbacks }) => {
  const [quantity, setQuantity] = useState(1);
  const [visibleFeedbacks, setVisibleFeedbacks] = useState(3);
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [allFeedbacks, setAllFeedbacks] = useState(feedbacks);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleBuyNow = async () => {
    const total = quantity * productId;
    console.log(total);
  };

  const handleSeeMore = () => {
    setVisibleFeedbacks(allFeedbacks.length);
    setShowAllFeedbacks(true);
  };

  const handleSeeLess = () => {
    setVisibleFeedbacks(3);
    setShowAllFeedbacks(false);
  };

  const handleFeedbackSubmit = (newFeedback) => {
    setAllFeedbacks([...allFeedbacks, newFeedback]);
  };

  const cardStyle = {
    margin: '0 auto',
    float: 'none',
  };

  return (
    <div>
      <Navbar />
      <div className="flex mt-24 ml-[230px] items-center bg-white">
        <div className="flex bg-white rounded-lg p-5 max-w-4xl">
          <div className="w-[700px] h-[700px] object-cover">
            <img
              src="src/assets/ProductpIs.png"
              alt="Fresh Beef"
              className="rounded-lg"
            />
          </div>

          <div className="ml-24 mt-8">
            <h1 className="text-2xl font-bold mb-2">Fresh Beef</h1>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-lg mr-2">★★★★☆</span>
              <span className="text-gray-500">(150 Reviews)</span>
            </div>

            <p className="text-xl text-black mb-2">MWK 6500/kg</p>
            <p className="text-gray-600 mb-4">
              Enjoy premium fresh beef, sourced from local farms.
              <br /> Tender and flavorful, it's perfect for grilling,
              roasting, or stews. Elevate your meals with our quality cuts.
            </p>

            <div className="flex items-center mb-6">
              <button
                onClick={handleDecrease}
                className="bg-white border-l border-t border-b text-black px-3 py-1 border-gray-600 rounded-l"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="text-center w-12 border-gray-600 border-b px-2 py-1"
              />
              <button
                onClick={handleIncrease}
                className="bg-red-600 text-white border-b border-r border-t border-gray-600 px-3 py-1 rounded-r focus:outline-none"
              >
                +
              </button>
              <button
                onClick={handleBuyNow}
                className="ml-4 h-[34px] w-32 bg-red-500 text- text-white rounded-[4px] hover:bg-red-600 focus:outline-none"
              >
                Buy Now
              </button>
              <button className="ml-4 h-[34px] w-[40px] bg-gray-100 text-black border border-gray-600 rounded-lg hover:bg-red-600 focus:outline-none">
                <i className="fas fa-heart"></i>{" "}
                <FontAwesomeIcon icon={farHeart} />
              </button>
            </div>
            <div className="mt-4">
              <button className="flex text-gray-500 hover:text-gray-700 focus:outline-none">
                <i className="fas fa-comments mr-2"></i>
                Do you have Questions?{" "}
                <button className="ml-1 text-red-500">Message</button>
              </button>
            </div>
            <div className="mt-4">
              <Button variant="success" onClick={() => setShowFeedbackForm(!showFeedbackForm)}>
                Rate The Product
              </Button>
              {showFeedbackForm && <FeedbackForm onSubmit={handleFeedbackSubmit} />}
            </div>
            <div>
              <h1>REVIEWS</h1>
              <div id="reviews">
                <Row className="justify-content-center">
                  {allFeedbacks.slice(0, visibleFeedbacks).map((feedback, index) => (
                    <Col key={index} md={4} className="mb-4">
                      <Card style={cardStyle}>
                        <Card.Body>
                          <div className="feedback-header">
                            <img src={feedback.profilePic} alt="Profile" className="profile-pic" />
                            <div className="feedback-info">
                              <Card.Title>{feedback.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">{feedback.dateTime}</Card.Subtitle>
                            </div>
                          </div>
                          <StarRating rating={feedback.rating} />
                          <Card.Text>{feedback.review}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {visibleFeedbacks < allFeedbacks.length && !showAllFeedbacks && (
                  <Button variant="primary" onClick={handleSeeMore} className='seeMore'>
                    See More
                  </Button>
                )}
                {showAllFeedbacks && (
                  <Button variant="secondary" onClick={handleSeeLess} className='seeLess'>
                    See Less
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductBuyNowPage;
