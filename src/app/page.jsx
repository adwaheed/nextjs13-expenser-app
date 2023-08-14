"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  QuerySnapshot,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(120);

  //  Add items to Database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price.trim(),
      });
    } else {
      alert("Item Name or Item Price is missed...!");
    }
    setNewItem({ name: "", price: "" });
  };

  // Read items from Database

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsArray = [];

      QuerySnapshot.forEach((doc) => {
        itemsArray.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArray);

      /// Total from itemsArray
      const calculateTotal = () => {
        const totalPrice = itemsArray.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  // Delete items from Database

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-purple-400">
      <div>
        <h1 className="font-bold text-[32px] text-white">Expenser App</h1>
      </div>
      <div className="mt-10">
        <form className="flex items-center justify-center gap-2 flex-wrap bg-purple-300 p-4 rounded">
          <input
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            value={newItem.name}
            className="outline-none p-2 w-52 rounded"
            type="text"
            placeholder="Item name"
            required
          />
          <input
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            value={newItem.price}
            className="outline-none p-2 w-32 rounded"
            type="number"
            placeholder="Amount Rs"
            required
          />
          <button
            onClick={addItem}
            className="bg-purple-500 px-4 rounded text-white font-semibold text-[28px] hover:bg-purple-600 outline-none"
          >
            +
          </button>
        </form>
        <div className="bg-purple-300 rounded rounded-b-none p-4 mt-2 pb-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="my-4 w-full flex justify-between bg-purple-500 rounded text-white font-semibold"
            >
              <div className="p-4 w-full flex justify-between">
                <span className="capitalize">{item.name}</span>
                <span>Rs. {item.price}.00/-</span>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className="ml-8 p-4 rounded hover:bg-purple-600 w-16"
              >
                X
              </button>
            </div>
          ))}
        </div>
        {items.length < 1 ? (
          ""
        ) : (
          <div className="flex justify-between p-3 font-semibold bg-purple-300 rounded rounded-t-none">
            <span>Total</span>
            <span>Rs. {total}.00/-</span>
          </div>
        )}
      </div>
    </main>
  );
}
