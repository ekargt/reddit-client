import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import PostDetail from "./components/Posts/PostDetail"

function App(){

  return(
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/posts/:id" element={<PostDetail/>}/>
      </Routes>

  )
}

export default App