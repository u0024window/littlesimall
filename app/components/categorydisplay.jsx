import { Tabs, WhiteSpace } from "antd-mobile";
import { productList as productListApi } from '../assets/api.json';
import ShoesCards from '../components/common/shoescard.jsx';
import '../sass/changeantdstyle/tabs.sass';
import '../sass/categorydisplay.sass';
import { productListByAjax } from '../js/publicmethod.js';

import { ajaxSuccess, ajaxFail, getProductList } from '../js/publicmethod.js';

const TabPane = Tabs.TabPane;

class CategoryDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productList: [],
            types: [
                ["Air Jordan", require('../assets/images/banner/jordan.png'), require('../assets/images/jordan.png')],
                ["NIKE", require('../assets/images/banner/nike.png'), require('../assets/images/nike.png')],
                ["ADIDAS", require('../assets/images/banner/adidas.png'), require('../assets/images/adidas.png')],
                ["OTHERS", require('../assets/images/banner/other.png'), require('../assets/images/others.png')],
            ]
        };

        this.handleTabClick = (key) => {
            productListByAjax.call(this, {
                sex: key,
                cateId:this.props.match.params.type
            });
        }
    }
    componentWillMount() {
        productListByAjax.call(this, {
            sex: 0,
            cateId:this.props.match.params.type
        });
    }
    render() {
        return (<div>
            <section id="catebanner">
                <img src={this.props.match.params.type ? this.state.types[this.props.match.params.type][1] : this.state.types[0][1]} alt="" />
                <img src={this.props.match.params.type ? this.state.types[this.props.match.params.type][2] : this.state.types[0][2]} alt="" />
                <span>{this.props.match.params.type ? this.state.types[this.props.match.params.type][0] : this.state.types[0][0]}</span>
            </section>
            <section id="displaytab">
                <Tabs defaultActiveKey="0" animated={true} onTabClick={this.handleTabClick} swipeable={false} destroyInactiveTabPane={false}>
                    <TabPane tab="全部" key="0">
                        <div style={{ backgroundColor: '#fff' , justifyContent: 'left'}}>
                            <ShoesCards productList={this.state.productList} {...this.props}/>
                        </div>
                    </TabPane>
                    <TabPane tab="男鞋" key="1">
                        <div style={{  backgroundColor: '#fff',justifyContent: 'left' }}>
                            <ShoesCards productList={this.state.productList} {...this.props}/>
                        </div>
                    </TabPane>

                    <TabPane tab="女鞋" key="2">
                        <div style={{  backgroundColor: '#fff', justifyContent: 'left' }}>
                            <ShoesCards productList={this.state.productList} {...this.props}/>
                        </div>
                    </TabPane>
                </Tabs>
            </section>
        </div>)
    }
}

CategoryDisplay.defaultProps={type:0};
export default CategoryDisplay;