import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  IoLocationOutline,
  IoWifiOutline,
  IoWaterOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { FaParking, FaSwimmingPool, FaBath, FaDoorOpen } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdKitchen, MdSmokeFree, MdShower } from "react-icons/md";
import { RiFirstAidKitLine, RiHotelBedFill } from "react-icons/ri";
import { BiCctv } from "react-icons/bi";
import { PiPottedPlant } from "react-icons/pi";
import StudentNavbar from "../../StudentNavbar/StudentNavbar";
import RatingDisplay from "../../Components/Rating/RatingDisplay";
import "./HostelDetails.css";

const HostelDetails = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/hostels/${id}`);
        setHostel(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load hostel details");
        setLoading(false);
      }
    };

    fetchHostelDetails();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!hostel) return <div className="text-center p-8">Hostel not found</div>;

  // Helper function to render amenities
  const renderAmenity = (icon, label, available) => {
    if (available) {
      return (
        <div className="flex items-center gap-2">
          {icon} {label}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <StudentNavbar />
      <div className="hostel-details-container">
        <div className="hostel-header">
          <h1>{hostel.name}</h1>
          <div className="hostel-location">
            <IoLocationOutline />
            <p>{hostel.location}</p>
          </div>
          <RatingDisplay
            rating={hostel.average_rating}
            reviewsCount={hostel.reviews_count}
          />
        </div>

        {/* Image Gallery */}
        <div className="hostel-image-gallery">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {hostel.image_urls?.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt={`${hostel.name} view ${index + 1}`}
                  className="hostel-image"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Details Section */}
        <div className="hostel-details-grid">
          <div className="hostel-overview">
            <h2>Overview</h2>
            <div className="hostel-overview-grid">
              <div>
                <p>Room Type</p>
                <p>{hostel.room_type}</p>
              </div>
              <div>
                <p>Price per Month</p>
                <p>KES {hostel.price_per_month}</p>
              </div>
              <div>
                <p>Available Units</p>
                <p>{hostel.available_units}</p>
              </div>
              <div>
                <p>Bedrooms</p>
                <p>{hostel.bedrooms}</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="hostel-amenities">
            <h2>Amenities</h2>
            <div className="hostel-amenities-grid">
              {renderAmenity(<IoWifiOutline />, "Wi-Fi", hostel.wifi)}
              {renderAmenity(<FaParking />, "Parking", hostel.parking)}
              {renderAmenity(
                <IoShieldCheckmarkOutline />,
                "Security",
                hostel.security
              )}
              {renderAmenity(<MdKitchen />, "Kitchen", hostel.kitchen)}
              {renderAmenity(
                <IoWaterOutline />,
                "Water Supply",
                hostel.water_supply
              )}
              {renderAmenity(
                <FaSwimmingPool />,
                "Swimming Pool",
                hostel.swimming_pool
              )}
              {renderAmenity(<CgGym />, "Gym", hostel.gym)}
              {renderAmenity(<FaBath />, "Bathroom", hostel.bathroom)}
              {renderAmenity(<FaDoorOpen />, "Wardrobe", hostel.wardrobe)}
              {renderAmenity(<PiPottedPlant />, "Garden", hostel.garden)}
              {renderAmenity(
                <MdSmokeFree />,
                "Smoke Alarm",
                hostel.smoke_alarm
              )}
              {renderAmenity(
                <RiFirstAidKitLine />,
                "First Aid Kit",
                hostel.first_aid_kit
              )}
              {renderAmenity(<MdShower />, "Hot Shower", hostel.hot_shower)}
              {renderAmenity(<BiCctv />, "CCTV Cameras", hostel.cctv_cameras)}
              {renderAmenity(
                <RiHotelBedFill />,
                "Laundry Services",
                hostel.laundry_services
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="hostel-reviews">
          <h2>Reviews</h2>
          {hostel.reviews?.length > 0 ? (
            hostel.reviews.map((review, index) => (
              <div key={index} className="review">
                <p className="review-author">{review.author}</p>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>
              No reviews yet. Be the first to leave a{" "}
              <NavLink to="/leave-review">review</NavLink>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default HostelDetails;