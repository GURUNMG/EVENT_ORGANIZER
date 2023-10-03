
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Frontpage from './components/Frontpage';
import Homepage from './components/Postdisplay';
import Signin from './components/Signin';
import { AdminRegister } from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import Userpost from './components/Userpost';
import Postdisplay from './components/Postdisplay';
import Home from './components/Home';
import Home1 from './components/Home1';
import PostDisplay1 from './components/PostDisplay1';
 function App(){

  const handlePostSubmit = (caption:any, image:any) => {
    // Implement your logic to submit the post with caption and image
    console.log('Caption:', caption);
    console.log('Image:', image);
  };
  
  return (
    <div className='App'> 
      {/* <Home/> */}
      <Home1/> 
      <PostDisplay1></PostDisplay1>
    <BrowserRouter>
      <Routes>
          <Route path="event/app/v1/" element={<Frontpage/>} />
          <Route path="event/app/v1/admin-register" element={<AdminRegister/>} />
          <Route path="event/app/v1/login" element={<Signin/>} />
          <Route path="event/app/v1/admin-login" element={<AdminLogin/>} />
          <Route path="/event/app/v1/homepage/:email" element={<Postdisplay/>}></Route>
          <Route path="/event/app/v1/admin-homepage/:email" element={<AdminHome/>}></Route>
          {/* <Route path="/chatease/register" element={<Register/>}></Route> */}
          {/* <Route path='/chatease/reset' element={<Forgot/>}></Route>    */}
      </Routes>
    </BrowserRouter> 
  </div>)
}
export default App;
