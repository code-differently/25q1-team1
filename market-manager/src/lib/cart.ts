import { db } from "./firebase"; // Your Firestore instance
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

export async function addToCart(customerId: string, itemId: string, quantity: number): Promise<void> {
  const itemRef = doc(db, "items", itemId);
  const itemSnap = await getDoc(itemRef);

  if (!itemSnap.exists()) {
    throw new Error("Item not found in inventory");
  }

  const itemData = itemSnap.data();
  if (itemData.quantity < quantity) {
    throw new Error("Insufficient item stock");
  }

  const cartItemRef = doc(db, "customers", customerId, "cart", itemId);
  const cartSnap = await getDoc(cartItemRef);

  if (cartSnap.exists()) {
    // Update quantity if already in cart
    await updateDoc(cartItemRef, {
      quantity: increment(quantity),
    });
  } else {
    // Add new item to cart
    await setDoc(cartItemRef, {
      itemId,
      name: itemData.name,
      price: itemData.price,
      quantity,
      addedAt: new Date().toISOString(),
    });
  }

  // Deduct from inventory
  await updateDoc(itemRef, {
    quantity: itemData.quantity - quantity,
  });
}