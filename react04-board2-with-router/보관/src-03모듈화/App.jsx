import { BrowserRouter } from "react-router-dom";
import {Routes, Route} from "react-router-dom";

import List from './components/board/List.jsx';
import Write from './components/board/Write.jsx';
import View from './components/board/View.jsx';
import NotFound from './components/common/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element = {<List></List>} />
          <Route path='/list' element = {<List></List>} />
          <Route path='/view' element = {<View></View>} />
          <Route path='/write' element = {<Write></Write>} />
          <Route path='*' element = {<NotFound></NotFound>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
