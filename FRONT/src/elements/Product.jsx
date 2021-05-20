import React, { useState, useEffect } from "react";
import PageHelmet from "../component/common/Helmet";
import Breadcrumb from "../elements/common/Breadcrumb";
import Pagination from "@material-ui/lab/Pagination";
import ProductList from "../elements/product/ProductList";
import ScrollToTop from "react-scroll-up";
import { FiChevronUp } from "react-icons/fi";
import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";
import { SpinnerCircular } from "spinners-react";
import Grid from "@material-ui/core/Grid";
import toastr from "toastr";

/********Services***** */
import ProductService from "../services/Product";

import "toastr/build/toastr.min.css";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  const [numberPages, setNumberPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = (page = 1) => {
    ProductService.getProducts(page, 5)
      .then((response) => {
        setRows(response.data.products);
        setNumberPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        toastr.error("Hubo un error al obtener los productos.");
        setLoading(false);
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
    getProducts(value);
  };

  return (
    <>
      <PageHelmet pageTitle="Blog" />

      {loading && (
        <Grid
          container
          spacing={1}
          className="d-flex justify-content-center mt-5"
        >
          <SpinnerCircular size={200} />
        </Grid>
      )}

      {!loading && rows && (
        <>
          <Header
            headertransparent="header--transparent"
            colorblack="color--black"
            logoname="logo.png"
          />
          {/* Start Breadcrump Area */}
          <Breadcrumb title={"Productos"} />
          {/* End Breadcrump Area */}
          {/* Start Blog Area */}
          <div className="rn-blog-area ptb--120 bg_color--1">
            <div className="container">
              {rows.length > 0 && <ProductList rows={rows} />}
              <div className="row mt--20">
                <div className="col-lg-12 d-flex justify-content-center">
                  {/* Start Pagination Area */}

                  <Pagination
                    onChange={(event, value) => handleChange(event, value)}
                    count={numberPages}
                    page={page}
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End Blog Area */}
          {/* Start Back To Top */}
          <div className="backto-top">
            <ScrollToTop showUnder={160}>
              <FiChevronUp />
            </ScrollToTop>
          </div>
          {/* End Back To Top */}
          <Footer />
        </>
      )}
    </>
  );
};
export default Product;
