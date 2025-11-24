"use client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function RegisterPage() {
  const { createUser } = useContext(AuthContext);
  //   const router = useRouter();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //   const handleRegister = async (e) => {
  //     e.preventDefault();
  //     setError("");
  //     setLoading(true);

  //     try {
  //       // 1️⃣ Create user
  //       const result = await createUser(email, password);

  //       // 2️⃣ Update profile with full name
  //       await updateUserProfile(`${firstName} ${lastName}`);

  //       // 3️⃣ Redirect to login or feed
  //       //   router.push("/auth/login");
  //       navigate("/auth/login");
  //     } catch (err) {
  //       console.error(err);
  //       setError(err.message);
  //     }

  //     setLoading(false);
  //   };
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call backend register API with firstname & lastname
      await createUser(email, password, firstName, lastName);

      // Redirect to login page
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleRegister}>
          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-blue-500"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-blue-500"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
