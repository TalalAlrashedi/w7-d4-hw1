import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(url);
      const users = await res.data;
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        Swal.fire({
          icon: "success",
          title: "تم تسجيل الدخول",
        });
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "بيانات غير صحيحة",
          text: "تأكد من البريد الإلكتروني وكلمة المرور",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">
          تسجيل الدخول
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-right mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-right mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition"
          >
            دخول
          </button>

          <p className="text-center text-sm mt-4">
            مستخدم جديد؟
            <Link to="/" className="text-blue-600 ml-2 hover:underline">
              إنشاء حساب
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
