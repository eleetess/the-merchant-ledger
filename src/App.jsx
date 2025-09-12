import { useState, useEffect } from "react";
import "./App.scss";
import {
  createItem,
  listAllItems,
  updateItem,
  deleteItem,
} from "./utils/dynamo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
    const { itemName, price, status } = itemToUpdate;
    console.log(itemToUpdate.id);
    await updateItem(
      "ShoppingList",
      { id: itemToUpdate.id, itemName: itemToUpdate.name },
      { itemName, price, status }
    );
    fetchedItems((oldItems) => {
      return oldItems.map((itemObject) => {
        return itemObject.id === itemToUpdate.id ? itemToUpdate : itemObject;
      });
    });
    setItemToUpdate(null);
  };
  const deleteShoppingListHandler = async (id) => {
    await deleteItem("ShoppingList", { id });
    fetchedItems((oldItems) => {
      return oldItems.filter((itemObject) => itemObject.id !== id);
    });
  };

  return (
    <>
      <header>
        <h1>The Merchant Ledger</h1>
      </header>
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">
            “Greetings, traveler! Care to browse my wares?”
          </h1>
          <p className="hero-subtitle">
            A trader’s scroll to track wares, treasures, and rare finds across
            Tamriel.
          </p>
          <p className="hero-description">
            Whether bartering in Alinor, haggling in Wayrest, or prowling the
            <br />
            Grand Exchange of Vivec City — this ledger ensures no deal slips
            <br />
            through your fingers. Record desired items, mark them as found or
            bought, and keep your fortune in check.
          </p>
        </div>
      </section>
      <main>
        <form onSubmit={createShoppingListHandler}>
          <h2>Traveler Scroll</h2>
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
        <ul className="form-render">
          {items.map((item) => (
            <li key={item.id}>
              {item.itemName} — {item.price} gold ({item.status})
              <button onClick={() => setItemToUpdate(item)}>
                <EditIcon style={{ marginRight: "4px" }} />
                Edit
              </button>
              <button
                className="beGone"
                onClick={() => deleteShoppingListHandler(item.id)}
              >
                <DeleteIcon style={{ marginRight: "4px" }} />
                Remove
              </button>
            </li>
          ))}
        </ul>
        {itemToUpdate && (
          <div className="update-form">
            <h3>Update Item</h3>
            <form onSubmit={updateShoppingListHandler}>
              <label>Price</label>
              <input
                type="number"
                value={itemToUpdate.price}
                onChange={(e) =>
                  setItemToUpdate({
                    ...itemToUpdate,
                    price: Number(e.target.value),
                  })
                }
              />
              <br />

              <label>Status</label>
              <select
                value={itemToUpdate.status}
                onChange={(e) =>
                  setItemToUpdate({ ...itemToUpdate, status: e.target.value })
                }
              >
                <option value="needed">Needed</option>
                <option value="found">Found</option>
                <option value="bought">Bought</option>
              </select>
              <br />

              <button type="submit">Save</button>
              <button type="button" onClick={() => setItemToUpdate(null)}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2025 Dawnstar Dealers. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;
