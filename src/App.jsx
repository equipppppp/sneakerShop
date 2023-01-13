import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import MainContent from "./components/maincontent/MainContent";
import Overlay from "./components/overlay/Overlay";
import Favorites from "./components/favorites/Favorites";
import axios from "axios";
import Orders from "./components/orders/orders";

export const AppContext = React.createContext({});

function App() {
  const [sneakers, setSneakers] = React.useState([]);
  const [sneakersInBasket, setSneakersInBasket] = React.useState([]);
  const [favoriteSneakers, setFavoriteSneakers] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOrdered, setIsOrdered] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const [
          favoriteSneakersResponse,
          snekearsInBasketResponse,
          sneakersResponse,
          ordersResponse,
        ] = await Promise.all([
          axios.get("https://63629b1266f75177ea33fe5e.mockapi.io/favorites"),
          axios.get("https://63629b1266f75177ea33fe5e.mockapi.io/basket"),
          axios.get("https://63629b1266f75177ea33fe5e.mockapi.io/sneakers"),
          axios.get("https://63629b1266f75177ea33fe5e.mockapi.io/orders"),
        ]);
        setIsLoading(false);
        setFavoriteSneakers(favoriteSneakersResponse.data);
        setSneakersInBasket(snekearsInBasketResponse.data);
        setSneakers(sneakersResponse.data);
        setOrders(
          ordersResponse.data.reduce((prev, obj) => [...prev, ...obj.items], [])
        );
      } catch (error) {
        alert("Ошибка при получении данных");
        console.log(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://63629b1266f75177ea33fe5e.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert("Произошла ошибка в загрузке данных о покупках");
        console.log(error);
      }
    })();
  }, [isOrdered]);

  const addToBasket = async (sneaker) => {
    const findedItem = sneakersInBasket.find(
      (item) => item._id === sneaker._id
    );
    if (findedItem) {
      const filteredItems = sneakersInBasket.filter(
        (item) => item._id !== sneaker._id
      );
      setSneakersInBasket(filteredItems);
      await axios.delete(
        `https://63629b1266f75177ea33fe5e.mockapi.io/basket/${findedItem.id}`
      );
    } else {
      setSneakersInBasket([...sneakersInBasket, sneaker]);
      const { data } = await axios.post(
        "https://63629b1266f75177ea33fe5e.mockapi.io/basket",
        sneaker
      );
      setSneakersInBasket((prev) =>
        prev.map((item) => {
          if (item._id === data._id) {
            return {
              ...item,
              id: data.id,
            };
          }
          return item;
        })
      );
    }
  };

  const addToFavorite = async (sneaker) => {
    const findedItem = favoriteSneakers.find(
      (item) => item._id === sneaker._id
    );
    if (findedItem) {
      const filteredItems = favoriteSneakers.filter(
        (item) => item._id !== sneaker._id
      );
      setFavoriteSneakers(filteredItems);
      await axios.delete(
        `https://63629b1266f75177ea33fe5e.mockapi.io/favorites/${findedItem.id}`
      );
    } else {
      setFavoriteSneakers([...favoriteSneakers, sneaker]);
      const { data } = await axios.post(
        "https://63629b1266f75177ea33fe5e.mockapi.io/favorites",
        sneaker
      );
      setFavoriteSneakers((prev) =>
        prev.map((item) => {
          if (item._id === data._id) {
            return {
              ...item,
              id: data.id,
            };
          }
          return item;
        })
      );
    }
  };

  const onRemoveItem = (id) => {
    setSneakersInBasket((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
    axios.delete(`https://63629b1266f75177ea33fe5e.mockapi.io/basket/${id}`);
  };

  const totalPrice = sneakersInBasket.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const isItemAdded = (_id) => {
    return sneakersInBasket.some((item) => item._id === _id);
  };
  return (
    <>
      <AppContext.Provider
        value={{
          sneakers,
          sneakersInBasket,
          setSneakersInBasket,
          isItemAdded,
          favoriteSneakers,
          addToBasket,
          addToFavorite,
          isLoading,
          orders,
          setOrders,
          isOrdered,
          setIsOrdered,
        }}
      >
        <Overlay onRemove={onRemoveItem} />
        <div className="wrapper">
          <Header price={totalPrice} />
          <div className="line"></div>
          <Routes>
            <Route path="/" exact element={<MainContent />} />
            <Route path="/favorites" exact element={<Favorites />} />
            <Route path="/orders" exact element={<Orders />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
