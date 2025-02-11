import React, { useEffect, useState } from "react";
import Data from "./Data";
const App = () => {
  const [search, setSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("assending");
  const [filteredData, setFilteredData] = useState(Data);

  useEffect(() => {
    const filtered = Data.filter((user) =>
      user.userName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search]);

  useEffect(() => {
    const filterButton = Data.filter((user) =>
      user.cityName.toLowerCase().includes(filterSearch.toLowerCase())
    );
    setFilteredData(filterButton);
  }, [filterSearch]);

  useEffect(() => {
    const filterSort = filteredData.sort((a, b) =>
      sortOrder === "assending"
        ? a.userName.localeCompare(b.userName)
        : b.userName.localeCompare(a.userName)
    );
    setFilteredData([...filterSort]);
  }, [sortOrder]);

  return (
    <div className="max-w-5xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
        Link Filter Short
      </h1>
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by Name"
          className="w-full p-2 my-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <h3 className="text-lg font-medium text-gray-700 mt-4">
          {search
            ? `Showing ${filteredData.length} result(s) for "${search}"`
            : `Total records available: ${filteredData.length}`}
        </h3>
      </div>
      {search ? (
        ""
      ) : (
        <div className="flex gap-10">
          <div className="mb-4">
            <span className="text-gray-700 mr-2">Filter by city:</span>
            <select
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select City</option>
              {Data.map((user, index) => (
                <option key={index} value={user.cityName}>
                  {user.cityName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="text-gray-700 mr-2">sort by A-Z:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="assending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
      )}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((user, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={user.profileImage}
                alt="profile"
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  {user.userName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.cityName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
