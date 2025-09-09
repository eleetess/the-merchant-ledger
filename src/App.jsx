import { useState, useEffect } from "react";
import "./App.scss";

function App() {
  return (
    <>
      <header>
        <h1>The Merchant Ledger</h1>
      </header>
      <main>
        <form>
          <h2>Shopping List</h2>
          <label>Item Name</label>
          <input type="text" name="itemName" required />
          <br />
          <label>Price</label>
          <input type="number" name="desiredPrice" required />
          <label>Status</label>
          <select id="status" name="status">
            <option value="needed">Needed</option>
            <option value="found">Found</option>
            <option value="bought">Bought</option>
          </select>
          <button type="submit">Add to Ledger</button>
        </form>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
