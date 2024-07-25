import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

function Form({ getData }) {
  const input = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    getData(input.current.value);
  };

  return (
    <div className="flex justify-center mt-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center bg-white  shadow-md p-4" >
          <FaSearch className="w-6 h-6 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search GitHub username..."
            className="flex-grow px-4 py-2 text-gray-700 bg-transparent outline-none"
            ref={input}
          />
          <button type="submit" className="btn btn-primary ml-2">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
