import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const url = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

  const createUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "لم يتم تعبئة البيانات",
        text: "قم بتعبئة البيانات ",
      });
      return;
    }

    if (password.length <= 6) {
      Swal.fire({
        icon: "error",
        title: "كلمة المرور قصيرة",
        text: "كلمة المرور يجب أن تكون أكثر من 6 أحرف",
      });
      return;
    }

    try {
      const res = await axios.post(url, { email, password });
      Swal.fire({
        icon: "success",
        title: "تم التسجيل بنجاح سيتم نقلك لصفحة تسجيل الدخول",
      });
      navigate("/login");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8  rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">
          إنشاء حساب
        </h2>
        <form onSubmit={createUser} className="space-y-4">
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
            تسجيل
          </button>

          <p className="text-center text-sm mt-4">
            لديك حساب بالفعل؟
            <Link to="/login" className="text-blue-600 ml-2 hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
