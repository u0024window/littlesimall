import { Drawer, List } from 'antd-mobile';
import CarouselCom from '../components/carousel.jsx';
import TabContent from '../components/tabcontent.jsx';
import '../sass/index.sass';
import '../sass/changeantdstyle/drawer.sass'
import { ajaxSuccess, ajaxFail, _$$ } from '../js/publicmethod.js';
import { categoryList as categoryListApi, webRoot } from '../assets/api.json';

class IndexCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            position: 'left',
            category: [{
                cateName: '',
                catePic: ''
            }]
        }
        this.navClick = () => {
            this.setState({ open: !this.state.open })
        }
    }
    componentDidMount() {
        $("#gotop").click(() => {
            $("#nav")[0].scrollIntoView(true);
        });
        this.search = () => {
            $.ajax({
                type: _$$.env == "product" ? "post" : "get",
                url: _$$.env == "product" ? webRoot + categoryListApi.url : categoryListApi.mockUrl,
                dataType: 'json',
                data: {}
            }).done((res) => {
                if (!ajaxSuccess(res)) return;
                const category = res.body.list.map((val, index) => ({
                    cateName: val.cate_name,
                    catePic: val.cate_image_url,
                    cateId: val.cate_id
                }));
                this.setState({
                    category: category
                })
            }).fail((xhr, text, errorThrow) => {
                ajaxFail(xhr, text, errorThrow);
            })
        }
            const categoryList = [
            {
                "cate_id": 1,
                "cate_name": "Air Jordan",
                "cate_image_url": require("../assets/images/logo/jordan.png")
            },
            {
                "cate_id": 2,
                "cate_name": "NIKE",
                "cate_image_url": require("../assets/images/logo/nike.png")
            },
            {
                "cate_id": 3,
                "cate_name": "ADIDAS",
                "cate_image_url": require("../assets/images/logo/adidas.png")
            },
            {
                "cate_id": 4,
                "cate_name": "OTHERS",
                "cate_image_url": require("../assets/images/logo/others.png")
            }
        ];
            const category = categoryList.map((val, index) => ({
                cateName: val.cate_name,
                catePic: val.cate_image_url,
                cateId: val.cate_id

            }));
            this.setState({
                category: category
            })
       
    }

    render() {
        const sidebar = (<List>
            {this.state.category.map((i, index) => {
                return (<List.Item
                    thumb={i.catePic}
                    arrow="horizontal"
                    key={index}
                    onClick={() => {
                        this.props.history.push('categorydisplay/' + index);
                    }}
                >{i.cateName}</List.Item>);
            })}
        </List>);

        const drawerProps = {
            open: this.state.open,
            position: this.state.position,
        };


        return (<div >
            <Drawer
                className="my-drawer"
                open={this.state.open}
                onOpenChange={this.navClick}
                style={{ minHeight: document.documentElement.clientHeight }}
                dragHandleStyle={{ display: 'none' }}
                contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
                sidebar={sidebar}
                docked={false}
                {...drawerProps}
            >
                <div id="nav">
                    <div className="nav" onClick={this.navClick}></div>
                    <form action="#"
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.history.push('/searchcate')
                        }}>
                        <input type="text" ref="productVal1" disabled />
                    </form>
                </div>
                <CarouselCom />
                <TabContent {...this.props} />
            </Drawer>
            <a id="gotop" href="javascript:scrollTo(0,-100000);"></a>
        </div>)
    }
}

export default IndexCom;