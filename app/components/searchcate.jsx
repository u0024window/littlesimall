import ShoesCards from '../components/common/shoescard.jsx';
import { Tabs, WhiteSpace } from "antd-mobile";
import '../sass/changeantdstyle/tabs.sass';
import '../sass/searchcate.sass';
import { productList as productListApi } from '../assets/api.json';
import { productListByAjax } from '../js/publicmethod.js';
const TabPane = Tabs.TabPane;

class SearchCate extends React.Component {
    constructor(props) {
        super(props);
        this.types = ['货品', '尺码', '价格'];
        this.state = {
            productList: [],
            currentType: 0,
            showTabPane: true
        };
        this.handleTabClick = (key) => {
            this.setState({
                currentType: key,
                showTabPane: !this.state.showTabPane
            });
        };
        this.searchClick = () => {
            productListByAjax.call(this, {
                price1: this.refs.productVal2.value,
                price2: this.refs.productVal3.value,
            });
        }
        this.TabPaneClick = () => {
            this.setState({
                showTabPane: !this.state.showTabPane
            })
        }
        this.handleSubmit = (e) => {
            e.preventDefault();
            switch (this.state.currentType*1) {
                case 0:
                    productListByAjax.call(this, {
                        product_name: this.refs.productVal1.value
                    });
                    break;
                case 1:
                    productListByAjax.call(this, {
                        shoes_size: this.refs.productVal1.value
                    });
                    break;
            }

        }
    }
    componentDidMount() {
        productListByAjax.call(this, {});
        let h = window.innerHeight;
        $("input").focus(()=>{
            $('body').height(h);
        }).blur(()=>{
            setTimeout(()=>{
                $('body').height("auto");
            },100)
        })
    }
    render() {
        return (<div>
            <section id="searchterm" >
                <div className={this.state.showTabPane ? "nav trgup" : "nav"} ref="nav" onClick={this.TabPaneClick}>{this.types[this.state.currentType]} </div>
                <form action="" onSubmit={this.handleSubmit} className={this.state.currentType>1 ? "tab-hide" : "cate-size"}>
                    <input type="text" ref="productVal1" />
                </form>
                <form action="" className={this.state.currentType>1 ? "pricestyle" : "tab-hide"} onSubmit={this.handleSubmit}>
                    <input type="number" ref="productVal2" /><div></div><input type="number" ref="productVal3" />
                    <span onClick={this.searchClick}>搜索</span>
                </form>
            </section>
            <section className={this.state.showTabPane ? "" : "tab-hide"} id="searchtab">
                <Tabs defaultActiveKey="0" animated={false} onTabClick={this.handleTabClick}>
                    <TabPane tab={this.types[0]} key="0"></TabPane>
                    <TabPane tab={this.types[1]} key="1"></TabPane>
                    <TabPane tab={this.types[2]} key="2"></TabPane>
                </Tabs>
            </section>
            <section>
                <ShoesCards productList={this.state.productList} {...this.props} />
            </section>
        </div>)
    }
}

export default SearchCate;