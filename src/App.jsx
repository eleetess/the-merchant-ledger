import { useState, useEffect } from "react";
import "./App.scss";
import {
  createItem,
  listAllItems,
  updateItem,
  deleteItem,
} from "./utils/dynamo";
import Button from "@mui/material/Button";

function App() {
  const [items, fetchedItems] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  useEffect(() => {
    (async () => {
      const items = await listAllItems("ShoppingList");
      console.log(items);
      fetchedItems(items);
    })();
  }, []);
  const createShoppingListHandler = async (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now().toString(),
      itemName: e.target.itemName.value,
      price: Number(e.target.desiredPrice.value),
      status: e.target.status.value,
    };
    await createItem("ShoppingList", newItem);
    fetchedItems([...items, newItem]);
  };
  const updateShoppingListHandler = async (event) => {
    event.preventDefault();
    const { price, status } = itemToUpdate;
    console.log(itemToUpdate.id);
  };

  return (
    <>
      <header>
        <h1>The Merchant Ledger</h1>
      </header>
      <main>
        <form onSubmit={createShoppingListHandler}>
          <h2>Shopping Scroll</h2>
          <label>Item Name</label>
          <input type="text" name="itemName" required />
          <br />
          <label>Price</label>
          <input type="number" name="desiredPrice" required />
          <br />
          <label>Status</label>
          <select id="status" name="status">
            <option value="needed">Needed</option>
            <option value="found">Found</option>
            <option value="bought">Bought</option>
          </select>
          <br />
          <button type="submit">Add to Ledger</button>
        </form>
        <h2>Trade Manifest</h2>
        {}
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.itemName} — {item.price} gold ({item.status})
              <button onClick={() => setItemToUpdate(item)}>Edit</button>
            </li>
          ))}
        </ul>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
