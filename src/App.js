import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Home from "./Pages/Home";
import { SocketProvider } from "./Provider/Socket";
import Room from "./Pages/Room";
import { PeerProvider } from "./Provider/peer";
function App() {
  return (
    <div>
        <SocketProvider >  
          <PeerProvider>     
      <Router>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/room/:id" element={<Room/>} />
</Routes>
      </Router>
      </PeerProvider>   
</SocketProvider>
    </div>
 
  );
}


export default App;
