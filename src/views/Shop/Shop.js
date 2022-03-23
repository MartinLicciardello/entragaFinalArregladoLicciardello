import React, { useState, useContext } from "react";

// Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import "./Shop.css";
import MessageSuccess from "../../components/MessageSuccess/MessageSuccess";

import CartContext from "../../CartContext/CartContext"; //context
import CardComponent from "../../components/CardComponent/CardComponent";

import TextField from "@mui/material/TextField";

//material ui

import Button from "@mui/material/Button";

//creo un initial state (padre)
const initialState = {
  name: "",
  phone: "",
  email: "",
};

const styles = {
  containerShop: {
    textAlign: "center",
    paddingTop: 25,
  },
};

//purchases sera nuestra base de ids

const Shop = () => {
  const { cart, removeItem } = useContext(CartContext);

  const [values, setValues] = useState(initialState);
  // Este estado está destinado a guardar el id de la compra
  const [purchaseID, setPurchaseID] = useState("");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "purchases"), {
      values,
    });
    setPurchaseID(docRef.id);
    setValues(initialState);
  };

  const totalPrice = () => {
    if (cart.length > 1) {
      return cart.reduce(
        (a, b) =>
          parseInt(a.precio) * a.quantity + parseInt(b.precio) * b.quantity
      );
    }
    if (cart.length === 1) {
      return cart[0].precio;
    }

    return 0;
  };

  //utilizo values del set inicial con la propiedad name ,email etc y la guardo
  return (
    <>
      <u><h1>Samsung Carrito</h1></u>
      {/* <h2 className="totalPrice">Total: ${totalPrice()}</h2> */}
      <button className="btn btn-1 hover-filled-slide-down">
                  <span>Total: ${totalPrice()}</span>
                </button>
      <div className="shop-container">
        <form className="FormContainer" onSubmit={onSubmit}>
          <TextField
            placeholder="Name"
            style={{ margin: 10, width: 400 }}
            value={values.name}
            name="name"
            onChange={handleOnChange}
          />
          <TextField
            placeholder="Phone"
            style={{ margin: 10, width: 400 }}
            value={values.phone}
            name="phone"
            onChange={handleOnChange}
          />
          <TextField
            placeholder="Email"
            style={{ margin: 10, width: 400 }}
            value={values.email}
            name="email"
            onChange={handleOnChange}
          />
          <button className="btnASendAction">Enviar</button>
          {purchaseID && <MessageSuccess purchaseID={purchaseID} />}
        </form>

        {cart && (
          <div>
            {cart.map((product) => (
              <section>
                <CardComponent celularData={product} showAddCart={false} />
                <p><strong>{product.quantity} seleccionados.</strong></p>
                {/* <Button
                  onClick={() => removeItem(product.id)}
                  variant="outlined" size="small"
                >
                  <strong>Eliminar del carrito</strong>
                </Button> */}
                <div className="btn-holder">
                <button  onClick={() => removeItem(product.id)} className="btn btn-1 hover-filled-slide-down">
                  <span>Eliminar del carrito</span>
                </button>
              </div>
                <hr style={{ marginBottom: "10px" }} />
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
