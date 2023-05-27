import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProductRow1 from "./Routes/small";
import ProductList from "./Components/abcd";
import ProductList1 from "./Routes/Demo";
import ExchangeFormPage from "./Routes/Exchange";

function App() {
  return (
    <div className="App">
       <Navbar />  
     <AllRoutes />
      <Footer /> 
     
      {/* <ExchangeFormPage/> */}
      
    
    </div>
  );
}

export default App;
