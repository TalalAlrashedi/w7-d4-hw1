import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const HomeCharacter = () => {
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("ذكر");
  const [status, setStatus] = useState("حي");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const apiUrl = "https://6836b885664e72d28e41d28e.mockapi.io/api/char";

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const res = await axios.get(apiUrl);
      setCharacters(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire("يجب تسجيل الدخول لإضافة شخصية");
      return;
    }
    if (!name || !image || !gender || !status) {
      Swal.fire("يرجى تعبئة جميع الحقول");
      return;
    }

    try {
      await axios.post(apiUrl, {
        name,
        image,
        gender,
        status,
        userId: user.id,
      });

      fetchCharacters();
      setName("");
      setImage("");
      setStatus("حي");
      setGender("");
      Swal.fire("تمت الإضافة بنجاح");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "هل أنت متأكد؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: " احذف",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`${apiUrl}/${id}`);
      fetchCharacters();
    }
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    Swal.fire({
      title: "تم تسجيل الخروج بنجاح",
    });

    navigate("/login");
  };
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-3xl mx-auto text-right">
      <nav className="bg-violet-700 text-white p-4 shadow-md mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">شخصياتي</h1>
          <div className="space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="flex gap-5">
                <Link to="/" className="hover:underline hover:text-amber-50">
                  التسجيل
                </Link>
                <Link to="/login" className="hover:underline">
                  تسجيل الدخول
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <form
        onSubmit={handleAdd}
        className="space-y-3 bg-white p-4  rounded-lg shadow mb-6"
      >
        <h2 className="text-lg font-bold text-right">إضافة شخصية</h2>
        <input
          type="text"
          placeholder="اسم الشخصية"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2 text-right "
        />
        <input
          type="text"
          placeholder="رابط الصورة"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded p-2 text-right"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border rounded p-2 text-right"
        >
          <option value="ذكر">ذكر</option>
          <option value="أنثى">أنثى</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded p-2 text-right"
        >
          <option value="حي">حي</option>
          <option value="ميت">ميت</option>
        </select>
        <button
          type="submit"
          className="bg-violet-600 text-white py-2 px-4 rounded text-right"
        >
          إضافة
        </button>
      </form>

      <input
        type="text"
        placeholder="ابحث عن شخصية"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 border rounded p-2 text-right"
      />

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCharacters.map((char) => (
          <div
            key={char.id}
            className="border p-4 rounded shadow flex flex-col items-center"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-50 h-50 object-cover mb-2"
            />
            <h3 className="text-lg font-bold">{char.name}</h3>
            <p className="text-sm">الجنس: {char.gender}</p>
            <p className="text-sm">الحالة: {char.status}</p> 
            {user?.id === char.userId && (
              <button
                onClick={() => handleDelete(char.id)}
                className="mt-2 text-red-600 hover:underline"
              >
                حذف
              </button>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-red-500">Oops! لا توجد شخصية بهذا الاسم</p>
    </div>
  );
};

export default HomeCharacter;
