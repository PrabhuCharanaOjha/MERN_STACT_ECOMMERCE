import React from "react";
import Footer from "./partial/Footer";
import Header from "./partial/Header";
import ShoppingComponent from "./ShoppingComponent";
import ContactComponent from "./ContactComponent";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container-fluid banner-clr">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 mt-4">
              <h1 className="text-center my-4 text-danger fw-bold text-cursive">
                WELCOME TO OUR
              </h1>
              <h2 className="text-center my-5 text-light bg-primary fw-bolder text-cursive">
                E-COMMERCE WEBSITE
              </h2>
              <p className="font-monospace text-justify my-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
                natus dolore architecto accusantium soluta doloribus libero quo
                corrupti? Eius dolorem ea voluptas deserunt aut non doloribus
                numquam aliquam deleniti odit inventore molestiae, doloremque
                maiores temporibus ducimus vel incidunt nobis, quod libero
                veniam! Assumenda, reiciendis veritatis.
              </p>
            </div>
            <div className="col-sm-6 my-3">
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/banner.png"}
                      className="d-block w-100"
                      alt="banner.png"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>First slide label</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/banner.png"}
                      className="d-block w-100"
                      alt="banner.png"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Second slide label</h5>
                      <p>
                        Some representative placeholder content for the second
                        slide.
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src={process.env.PUBLIC_URL + "/assets/images/banner.png"}
                      className="d-block w-100"
                      alt="banner.png"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <h5>Third slide label</h5>
                      <p>
                        Some representative placeholder content for the third
                        slide.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <h1 className="text-center text-warning fw-bold text-cursive">
              <u>Our Products</u>
            </h1>

            <div className="col-sm-4">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/no-image-available.jpg"
                }
                alt=""
                className="img-height1"
              />
            </div>
            <div className="col-sm-8">
              <div className="row">
                <div className="col-sm-6">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/no-image-available.jpg"
                    }
                    alt=""
                    className="img-height2"
                  />
                </div>
                <div className="col-sm-6">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/no-image-available.jpg"
                    }
                    alt=""
                    className="img-height2"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/no-image-available.jpg"
                    }
                    alt=""
                    className="img-height2"
                  />
                </div>
                <div className="col-sm-6">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/no-image-available.jpg"
                    }
                    alt=""
                    className="img-height2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShoppingComponent />
      <ContactComponent />
      <Footer />
    </>
  );
};

export default Home;
