// "use client";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";


// export default function LoginPage() {
//   const { signIn, googleSignIn } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ------------------------------------------------
//   // EMAIL + PASSWORD LOGIN
//   // ------------------------------------------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await signIn(email, password);
//       navigate("/"); // redirect to main feed
//     } catch (err) {
//       setError(err.message);
//     }

//     setLoading(false);
//   };

//   // ------------------------------------------------
//   // GOOGLE LOGIN
//   // ------------------------------------------------
//   const handleGoogleLogin = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       await googleSignIn();
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       setError(err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

//         {error && (
//           <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//         )}

//         <form className="space-y-5" onSubmit={handleLogin}>
//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">Email</label>
//             <input
//               type="email"
//               className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-blue-500"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-blue-500"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="cursor-pointer w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2"
//         >
//           <span className="">Continue with Google</span>
//         </button>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don’t have an account?{" "}
//           <a href="/auth/register" className="text-blue-600 font-semibold">
//             Create one
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext); // use backend login
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call backend login
      await loginUser(email, password);

      // Redirect to main feed
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-600 font-semibold">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
