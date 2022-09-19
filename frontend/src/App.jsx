import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from "./components/Navbar"
import NewsTabs from "./components/NewsTabs"

export default function App() {
  const [articleInfo, setArticleInfo] = useState([])

  // useEffect(() => {
  //   axios.get("https://dog.ceo/api/breeds/image/random")
  //     .then((response) => {
  //       setArticleInfo(response.data)
  //     });
  // }, []);

  console.log({ articleInfo })
  return (
    <div>
      <Navbar />
      <br></br>
      <NewsTabs />
    </div>

  );
}


