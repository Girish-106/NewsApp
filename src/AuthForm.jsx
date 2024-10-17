import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthForm = ({ onAuthStateChanged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignIn) {
        // Sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onAuthStateChanged(userCredential.user);
      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        onAuthStateChanged(userCredential.user);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{isSignIn ? "Sign In" : "Sign Up"}</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleAuth} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md transition duration-300"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => setIsSignIn(!isSignIn)}
        className="mt-4 text-indigo-600 hover:text-indigo-800 hover:font-bold hover:underline w-full text-center transition-all"
      >
        {isSignIn ? "Switch to Sign Up" : "Switch to Sign In"}
      </button>
    </div>
  );
};
export default AuthForm;