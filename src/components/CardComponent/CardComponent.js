import * as React from "react";
import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CartContext from "../../CartContext/CartContext";
import Button from "@mui/material/Button";
import "./CardComponent.css";

// Card component extraida de material ui, en esta extraigo las caracteristicas de la db que quiero

const CardComponent = ({ celularData, showAddCart = true }) => {
  const { addItem } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const increment = () =>
    quantity < celularData.stock && setQuantity(quantity + 1);
  const decrement = () => quantity > 0 && setQuantity(quantity - 1);

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        image={celularData.img}
        alt="green iguana"
        style={{ maxHeight: "150px", objectFit: "contain" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ color: "Black", textTransform: "uppercase" }}
        >
          <b>{celularData.nombre}</b>
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          style={{
            color: "white",
            backgroundColor: "Blue",
            backgroundSize: "contain",
          }}
        >
          <b>${celularData.precio}</b>
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          style={{ color: "Green", fontSize: 23 }}
        >
          <b>{celularData.stock} disponibles.</b>
        </Typography>
        {showAddCart && (
          <>
    
            <div className="btn-holder">
                <button onClick={() => addItem(celularData, quantity)} className="btn btn-1 hover-filled-slide-down">
                  <span>Agregar al carrito</span>
                </button>
              </div>
            
            <section style={{ display: "flex", gap: "5px " }}>
              
              <div className="btn-holder">
                <button onClick={decrement} className="btn btn-1 hover-filled-slide-down">
                  <span>-</span>
                </button>
              </div>
              <p className="btn-holder"><strong>CANTIDAD: {quantity}</strong></p> 
              <div className="btn-holder">
                <button onClick={increment} className="btn btn-1 hover-filled-slide-down">
                  <span>+</span>
                </button>
              </div>
             
              
              
             
            </section>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
