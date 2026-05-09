import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { useSelector } from 'react-redux';



const TopbarContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Container = styled.div`
  display: flex;
`;

const Others = styled.div`
  flex:4;
  margin-top: 20px;
  min-height:80vh;
`;

function App() {
  const currentUser = useSelector(state => state.currentUser);
  const isAdmin = currentUser && currentUser.isAdmin;

  return (
    <Router>
      <TopbarContainer>
        {isAdmin && <Topbar />}
      </TopbarContainer>
      <Container>
        {isAdmin && <Sidebar />}
        <Others>
          <Routes>
            <Route path="/" element={isAdmin ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAdmin ? <Home /> : <Login />} />
            {isAdmin && (
              <>
                <Route path="/users" element={<UserList />} />
                <Route path="/user/:userID" element={<User />} />

                <Route path="/newuser" element={<NewUser />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/newproduct" element={<NewProduct />} />
              </>
            )}
          </Routes>
        </Others>
      </Container>
    </Router>
  );
}

export default App;
