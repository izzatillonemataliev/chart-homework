import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import "./App.css";

function App() {
  const themeFromLocalStorage = () => localStorage.getItem("theme") || "light";
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [theme, setTheme] = useState(themeFromLocalStorage);

  const getData = (userName) => {
    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then((user) => setUserData(user));

    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((response) => response.json())
      .then((repos) => setReposData(repos));
  };

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen p-8 ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white-800 ">devfinder</h1>
          <label className="swap swap-rotate">
            {/* This hidden checkbox controls the state */}
            <input
              onClick={handleTheme}
              type="checkbox"
              checked={theme === "dark"}
              readOnly
            />

            {/* Sun icon */}
            <IoMdSunny className="swap-on fill-current w-10 h-10" />

            {/* Moon icon */}
            <IoMdMoon className="swap-off fill-current w-10 h-10" />
          </label>
        </div>
        <Form getData={getData} />
        {userData && (
          <div className="mt-8 p-6 bg-white  shadow-md rounded-lg">
            <div className="flex items-center mb-6">
              <div className="avatar mr-6">
                <div className="w-24 rounded-full ring ring-offset-base-100 ring-offset-2 ring-primary">
                  <img src={userData.avatar_url} alt="User Avatar" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 ">
                  {userData.login}
                </h2>
                <p className="text-gray-500 ">
                  {userData.bio || "This profile has no bio"}
                </p>
                <p className="text-sm text-gray-400 ">
                  Joined {new Date(userData.created_at).toDateString()}
                </p>
              </div>
            </div>
            <div className="flex justify-around text-center border-t border-gray-200  pt-6">
              <div>
                <h4 className="text-gray-600 ">Repos</h4>
                <p className="text-lg font-semibold text-gray-800 ">
                  {reposData.length}
                </p>
              </div>
              <div>
                <h4 className="text-gray-600 ">Followers</h4>
                <p className="text-lg font-semibold text-gray-800 ">
                  {userData.followers}
                </p>
              </div>
              <div>
                <h4 className="text-gray-600 ">Following</h4>
                <p className="text-lg font-semibold text-gray-800 ">
                  {userData.following}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-600 ">
                <span className="font-semibold">Location:</span>{" "}
                {userData.location || "Not Available"}
              </p>
              <p className="text-gray-600 ">
                <span className="font-semibold">Blog:</span>{" "}
                <a
                  href={userData.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userData.blog || "Not Available"}
                </a>
              </p>
              <p className="text-gray-600 ">
                <span className="font-semibold">Company:</span>{" "}
                {userData.company || "Not Available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

