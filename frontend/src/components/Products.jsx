import React, { useState } from 'react';
import { Container, Grid, Pagination } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';
import { BasicButton } from '../utils/buttonStyles';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { addStuff } from '../redux/userHandle';

const Products = ({ productData }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const itemsPerPage = 9;

  const { currentRole, responseSearch } = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (event, product) => {
    event.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleUpload = (event, product) => {
    event.stopPropagation();
    console.log(product);
    dispatch(addStuff("ProductCreate", product));
  };

  const messageHandler = (event) => {
    event.stopPropagation();
    setMessage("You have to login or register first")
    setShowPopup(true)
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (responseSearch) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <ProductGrid container spacing={3}>
        {currentItems.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} onClick={() => navigate("/product/view/" + data._id)}>
            <ProductCard>
              <ProductImage src={data.productImage} alt={data.productName} />
              <ProductDetails>
                <ProductName>{data.productName}</ProductName>
                <CategoryName>{data.category}</CategoryName>
                <PriceSection>
                  <PriceCost>Rs.{data.price.cost}</PriceCost>
                  <PriceMrp>Rs.{data.price.mrp}</PriceMrp>
                  <PriceDiscount>{data.price.discountPercent}% off</PriceDiscount>
                </PriceSection>
                <AddToCart>
                  {currentRole === "Customer" && (
                    <BasicButton onClick={(event) => handleAddToCart(event, data)}>
                      Add To Cart
                    </BasicButton>
                  )}
                  {currentRole === "Shopcart" && (
                    <BasicButton onClick={(event) => handleUpload(event, data)}>
                      Upload
                    </BasicButton>
                  )}
                  {currentRole === null && (
                    <BasicButton onClick={messageHandler}>
                      Add To Cart
                    </BasicButton>
                  )}
                </AddToCart>
              </ProductDetails>
            </ProductCard>
          </Grid>
        ))}
      </ProductGrid>

      <Container sx={{ mt: 10, mb: 10, display: "flex", justifyContent: 'center', alignItems: "center" }}>
        <Pagination
          count={Math.ceil(productData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Container>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default Products;

const ProductGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  text-align: center;
  &:hover {
    transform: scale(1.03);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const CategoryName = styled.p`
  font-size: 14px;
  color: #777;
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: baseline;
`;

const PriceMrp = styled.span`
  text-decoration: line-through;
  color: gray;
`;

const PriceCost = styled.span`
  font-size: 20px;
  color: #4CAF50;
  font-weight: bold;
`;

const PriceDiscount = styled.span`
  color: darkgreen;
`;

const AddToCart = styled.div`
  margin-top: 10px;
`;