
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Frontpage from './components/Frontpage';
import Signin from './components/Signin';
import { AdminRegister } from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';
import Postdisplay from './components/Postdisplay';
import FeedbackForm from './components/FeedbackFrom';

 function App(){
  
  return (
    <div className='App'> 
    <BrowserRouter>
      <Routes>
          <Route path="event/app/v1/" element={<Frontpage/>} />
          <Route path="event/app/v1/admin-register" element={<AdminRegister/>} />
          <Route path="event/app/v1/login" element={<Signin/>} />
          <Route path="event/app/v1/admin-login" element={<AdminLogin/>} />
          <Route path="/event/app/v1/homepage/:email" element={<Postdisplay/>}></Route>
          <Route path="/event/app/v1/admin-homepage/:email" element={<AdminHome/>}></Route>
          <Route path="/event/app/v1/feedback/store/:email/:postId" element={<FeedbackForm/>}></Route>
          {/* <Route path="/chatease/register" element={<Register/>}></Route> */}
          {/* <Route path='/chatease/reset' element={<Forgot/>}></Route>    */}
      </Routes>
    </BrowserRouter> 
  </div>)
}
export default App;
