import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import gsap from "gsap";

const Home = () => {
  const [offerListings, setOfferListing] = useState([]);
  const [saleListings, setSaleListing] = useState([]);
  const [rentListings, setRentListing] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fethOfferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    };

    fethOfferListing();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        ".name-animation",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "bounce.out",
          stagger: 0.2,
        }
      )
      .fromTo(
        ".description-animation",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.5"
      )
      .fromTo(
        ".link-animation",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="p-4">
      {/* TOP */}

      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="name-animation text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">Perfect</span>
          <br />
          place with ease
        </h1>
        <div className="description-animation text-gray-400 text-xs sm:text-sm">
          Estate Ease will help you find your home, fast, easy, and comfortable. <br />
          Our expert support is always available.
        </div>
        <Link
          to={"/search"}
          className="link-animation text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's start now...
        </Link>
      </div>
      {/* SWIPER  */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* LISTING RESULTS FOR OFFER, SALES AND RENT */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;