import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function SearchWithButton() {
  const [query, setquery] = useState({
    type : "all",
    search : ""
  });
  const [data, setdata] = useState([]);
  const [valid, setvalid] = useState("");

  console.log(query)
  
  let handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let searchdata = await axios.get(
        `http://localhost:5000/search?key=${query.search}&type=${query.type}`
      );
      setdata(searchdata.data.data);
      setvalid(searchdata.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  function getHighlightedText(text, higlight) {
    var parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return parts.map((part, index) => (
      <span key={index}>
        {part.toLowerCase() === higlight.toLowerCase() ? (
          <b style={{ backgroundColor: "#e8bb49" }}>{part}</b>
        ) : (
          part
        )}
      </span>
    ));
  }

  return (
    <div className="App">
      <form onSubmit={handlesubmit}>
      <select
            name="type"
        
            onChange={(e) => {
              setquery({ ...query, [e.target.name]: e.target.value });
            }}
            
            
           
            >
              <option name="all">all</option>
              <option name="article">article</option>
              <option name="abstract">abstract</option>
              <option name="aurthors">aurthors</option>
              <option name="keywords">keywords</option>
             
            </select>
        <input
          type="text"
          placeholder="Live search..."
          className="searchwithbut"
          name= "search"
          onChange={(e) => {
            setquery({ ...query, [e.target.name]: e.target.value });
          }}
          
        />
        <button type="submit" className="but">
          Search
        </button>

        {valid !== "" ? <div>{valid}</div> : null}
      </form>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Article</th>

            <th scope="col">Keyword</th>
            <th scope="col">Abstract</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((article, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{article.article}</td>

                    <td>{getHighlightedText(`${article.keywords}`, query.search)}</td>
                    <td>{getHighlightedText(`${article.abstract}`, query.search)}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default SearchWithButton;
