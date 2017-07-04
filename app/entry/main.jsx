import IndexCom from '../components/index.jsx';
import AboutLittleSi from '../components/aboutlittlesi.jsx';
import CategoryDisplay from '../components/categorydisplay.jsx';
import ProductDetail from '../components/productdetail.jsx';
import SearchCate from '../components/searchcate.jsx';
import '../js/heightview.js';

class App extends React.Component {

  render() {
    function GetQueryString(name) {
      var r = window.location.hash.substr(1).split("=");
      if (r[1] != null) return unescape(r[1]); return null;
    }

    let route = this.props.route || "";
    if (route.includes('about')) {
      return (
        <AboutLittleSi type={GetQueryString('type')} />
      )
    }
    if (route.includes('searchcate')) {
      return (
        <SearchCate type={GetQueryString('id')} />
      )
    }
    if (route.includes('categorydisplay')) {
      return (
        <CategoryDisplay type={GetQueryString('type')} />
      )
    }
    if (route.includes('productdetail')) {
      return (
        <ProductDetail type={GetQueryString('id')} />
      )
    }
    return (
      <IndexCom />
    )

  }
}
ReactDom.render(
  <App />, document.querySelector("#main")
)

// ReactDom.render(
//   <Router history={hashHistory}>
//     <div>
//     <Route path="/" component={IndexCom} />
//     <Route path="/about" component={AboutLittleSi} />
//     <Route path="/searchcate" component={SearchCate} />
//     <Route path="/categorydisplay" component={CategoryDisplay} />
//     <Route path="/productdetail" component={ProductDetail} />
//     </div>
//  </Router>
// , document.querySelector("#main"))

function renderListen() {
  var route = window.location.hash.substr(1);
      if (route.includes('about') || route.includes('productdetail') || route.includes('categorydisplay')) {
        $('#gotop').hide()
      }else{
        $('#gotop').show()
      }
  ReactDom.render(<App route={route} />, document.querySelector("#main"));
}



window.addEventListener('hashchange', renderListen);
renderListen(); // render initially

$("#gotop").click(()=>{
  scrollTo(0,0);
})