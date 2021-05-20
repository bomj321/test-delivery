import React from "react";

const ProductList = ({ rows, buyProduct }) => {
  return (
    <>
      <div className="row">
        {rows.map((value, i) => (
          <div
            className="col-lg-4 col-md-6 col-sm-6 col-12"
            key={i}
            onClick={() => buyProduct(value)}
          >
            <div className="blog blog-style--1">
              <div className="thumbnail">
                <a href="/blog-details">
                  <img
                    className="w-100"
                    src={
                      value.image
                        ? value.image
                        : `/assets/images/blog/blog-01.jpg`
                    }
                    alt="Blog Images"
                  />
                </a>
              </div>
              <div className="content">
                <p className="blogtype">
                  {value.description && value.description.length > 100
                    ? value.description.substr(0, 100) + " ..."
                    : value.description}
                </p>
                <h4 className="title">
                  <a href="/blog-details">
                    {value.name} x{value.stock}
                  </a>
                </h4>
                <div className="blog-btn">
                  <button className="rn-btn text-white">Comprar unidad</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ProductList;
