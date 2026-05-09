import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from "styled-components";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from './pages/userlist/UserList';
import User from "./pages/user/User";
import NewUser from './pages/newuser/NewUser';
import ProductList from './pages/productlist/ProductList';
import Product from "./pages/product/Product"
import NewProduct from './pages/newproduct/NewProduct';
import Login from './pages/login/Login';

const TopbarContainer = styled.div`
position: sticky;
    top: 0;
    z-index: 100;
`

const Container = styled.div`
display: flex;
`;

const Others = styled.div`
flex:4;
margin-top: 20px;
min-height:80vh;
`;

function App() {
  const accessToken = useSelector((state) => state.currentUser.accessToken);
  const isAdmin = useSelector((state) => state.currentUser.isAdmin);

  return (
    <Router>
      <TopbarContainer>
        <Topbar />
      </TopbarContainer>
      <Container>
        <Sidebar />
        <Others>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userID" element={<User />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productID" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Others>
      </Container>
    </Router>
  );
}

export default App;
