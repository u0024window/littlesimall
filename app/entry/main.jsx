import IndexCom from '../components/index.jsx';
import AboutLittleSi from '../components/aboutlittlesi.jsx';
import CategoryDisplay from '../components/categorydisplay.jsx';
import ProductDetail from '../components/productdetail.jsx';
import SearchCate from '../components/searchcate.jsx';
import {HashRouter,Route,Switch} from 'react-router-dom';
ReactDom.render(
  <HashRouter>
    <Switch>
    <Route exact path="/" component={IndexCom} />
    <Route path="/about/:type" component={AboutLittleSi} />
    <Route path="/searchcate" component={SearchCate} />
    <Route path="/categorydisplay/:type" component={CategoryDisplay} />
    <Route path="/productdetail/:id" component={ProductDetail} />
    </Switch>
  </HashRouter>
, document.querySelector("#main"));

window.onresize = ()=>{
    document.body.style.fontSize = (document.body.clientWidth*32)/750;
  };