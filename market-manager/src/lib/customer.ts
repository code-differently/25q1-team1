// Functions to create and fetch customer profile data in Firestore

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Replace with your Firebase setup path
import { Customer } from '@/src/types/customer';

export const fetchCustomerProfile = async (customerId: string): Promise<Customer | null> => {
  try {
    const customerRef = doc(db, "customers", customerId);
    const snapshot = await getDoc(customerRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        id: customerId,
        name: data.name,
        email: data.email,
        cartId: data.cartId,
      };
    } else {
      console.log("Customer profile not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    return null;
  }
};