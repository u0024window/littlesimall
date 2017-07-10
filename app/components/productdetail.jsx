import {productDetail as productDetailApi,webRoot} from '../assets/api.json';
import '../sass/changeantdstyle/tabs.sass';
import '../sass/product_detail.sass';
import {ajaxSuccess, ajaxFail,_$$} from '../js/publicmethod.js';

class ProductDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            productDetail:{
                top_img_path:"",
                title:"",
                detailImageList:[],
            }
        }
        this.HowClick = ()=>{
            this.props.history.push("/about/1");
        }
    }
    componentDidMount() {
        $.ajax({
            type:  _$$.env == "product" ? "post" : "get",
            url: _$$.env == "product" ? webRoot + productDetailApi.url :  productDetailApi.mockUrl,
            dataType: 'json',
            data:{
                product_id:this.props.match.params.id
            }
        }).done((res) => {
            if (!ajaxSuccess(res)) return;
            this.setState({
                productDetail:res.body
            })
        }).fail((xhr, text, errorThrow) => {
            ajaxFail(xhr, text, errorThrow);
        });
    }
    render() {
        return (
            <div>
                <section id="head">
                    <img src={this.state.productDetail.top_img_path} alt="" />
                    <p>{this.state.productDetail.title}</p>
                    <p>
                        <span>¥</span><span>{this.state.productDetail.market_price}</span>
                        <span style={{color:"#04aaf4",letterSpacing:'3px'}} >vip</span><span style={{color:"#ff4b4a"}}>{this.state.productDetail.vip_price}</span>
                    </p>
                    <p><span>编码：</span><span>{this.state.productDetail.product_number}</span></p>
                    <p><span>尺码：{this.state.productDetail.shoes_size}</span><span>颜色：{this.state.productDetail.color}</span></p>
                </section>
                <section id="body">
                    <p className="line">product details</p>
                    <p>宝贝详情</p>
                    {
                        this.state.productDetail.detailImageList.map((i,key)=><img src={i.image_path} key={key} alt=""/>)
                    }
                </section>
                <div id="buy" onClick={this.HowClick}>联系卖家</div>
            </div>
        )
    }
}

ProductDetail.defaultProps = {
  id: 2
};


export default ProductDetail;