// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './camponants/AppBar';
import Home from './camponants/home/Home';
import Movies from './camponants/movies/Movies';
import BookMarks from './camponants/movies/BookMarks';
import Index from './admin';
import AddNew from './admin/AddNew';

function App() {
  return (
    <div className='h-screen text-white'>
      {/* <h1 className='text-2xl font-extrabold float-riogth'>Hello dear</h1> */}
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Movies' element={<Movies type='movie' />} />
        <Route path='/Tv' element={<Movies type='tv' />} />
        <Route path='/Web' element={<Movies type='web' />} />
        <Route path='/BookMarks' element={<BookMarks />} />
        <Route path='/admin' element={<Index />} />
        
        <Route path='/AddNew' element={<AddNew />} />
      </Routes>
      
      
    </div>
  );
}

export default App;
