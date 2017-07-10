import { Tabs, WhiteSpace } from "antd-mobile";
import ShoesCards from '../components/common/shoescard.jsx';
import '../sass/changeantdstyle/tabs.sass';
import { indexProduct as indexProductApi, newProduct as newProductApi,webRoot } from '../assets/api.json';
import { ajaxSuccess, ajaxFail,getProductList ,_$$} from '../js/publicmethod.js';

const TabPane = Tabs.TabPane;
class Tabcontent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            currentKey: 1,
            productList: [{
                resource: '',
                imgSrc: '',
                title: '',
                price: ''
            }]
        };
        this.handleTabClick = (key) => {
            //拉取商品数据
            switch (key) {
                case "1":
                    $.ajax({
                        type:  _$$.env == "product" ? "post" : "get",
                        url: _$$.env == "product" ? webRoot + indexProductApi.url : indexProductApi.mockUrl ,
                        data: indexProductApi.data,
                        dataType: 'json'
                    }).done((res) => {
                        if (!ajaxSuccess(res)) return;
                        getProductList.call(this, res.body.rows);
                    }).fail((xhr, text, errorThrow) => {
                        ajaxFail(xhr, text, errorThrow);
                    });
                    break;
                case "2":
                    $.ajax({
                        type:  _$$.env == "product" ? "post" : "get",
                        url: _$$.env == "product" ? webRoot + newProductApi.url : newProductApi.mockUrl,
                        dataType: 'json',
                        data: newProductApi.data
                    }).done((res) => {
                        if (!ajaxSuccess(res)) return;
                        getProductList.call(this, res.body.rows);
                    }).fail((xhr, text, errorThrow) => {
                        ajaxFail(xhr, text, errorThrow);
                    });
                    break;
                case "3":
                    this.props.history.push("/about/1");
                    break;
                case "4":
                    this.props.history.push("/about/2");
                    break;

            }
        }
    }
    componentDidMount() {
        $.ajax({
            type:  _$$.env == "product" ? "post" : "get",
            url: _$$.env == "product" ? webRoot + indexProductApi.url : indexProductApi.mockUrl ,
            dataType: 'json',
            data: indexProductApi.data
        }).done((res) => {
            if (!ajaxSuccess(res)) return;
            getProductList.call(this, res.body.rows);
        }).fail((xhr, text, errorThrow) => {
            ajaxFail(xhr, text, errorThrow);
        });
    }
    render() {

        return (
            <div>
                <Tabs defaultActiveKey="1" animated={false} onTabClick={this.handleTabClick} 
                    swipeable={false} destroyInactiveTabPane={false}>
                    <TabPane tab="首页" key="1">
                        <div style={{  backgroundColor: '#fff' , alignContent: 'flex-start'}}>
                            <ShoesCards productList={this.state.productList} {...this.props}/>
                        </div>
                    </TabPane>
                    <TabPane tab="新品到货" key="2">
                        <div style={{ backgroundColor: '#fff' ,alignContent: 'flex-start'}}>
                            <ShoesCards productList={this.state.productList} />
                        </div>
                    </TabPane>

                    <TabPane tab="如何购买" key="3">
                    </TabPane>
                    <TabPane tab="关于小思" key="4">
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Tabcontent;