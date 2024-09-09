import React from "react";
import "../pages/styles.css";
import Reviews from "./Reviews";

const ReviewsUsers = () => {
  return (
    <div>
      <div className='pb-3 mt-5 d-flex justify-content-center userReviewsMain'>
        <h4 className='fw-bold text-center userReviewsBlocks hide-on-mobile'>
          <p style={{ margin: 0 }}>Более 6 000 предпринимателей уже</p>{" "}
          <p style={{ margin: 0 }}>используют Radar Analytica для начала</p>{" "}
          <p style={{ margin: 0 }}>и развития бизнеса на маркетплейсах</p>
        </h4>

        <h4 className='fw-bold text-center userReviewsBlocks mobile-version'>
          Более 6 000 предпринимателей уже используют Radar Analytica
          для началаи развития бизнеса на маркетплейсах
        </h4>
      </div>
      <div className='ReviewsUsersIP'>
        <Reviews />
      </div>
    </div>
  );
};

export default ReviewsUsers;
