import '../../sass/common/shoescard.sass';
import { Grid,Flex} from 'antd-mobile';
// const {Grid} = antDesign;
class ShoesCards extends React.Component {
    render() {
        return (
            <div id="shoes-card" ref="shoescard">
                {this.props.productList.map((dataItem, index) => (
                    //TODO
                        <div className="shoes-card" onClick={((productId)=>{
                                return ()=>{
                                    window.location.hash = "productdetail?id="+productId;
                                }
                            })(dataItem.productId)} key={dataItem.productId+new Date()}>
                            <div><img src={dataItem.imgSrc} alt="" /></div>
                            <div>{dataItem.title}</div>
                            <div><span>¥</span><span style={{ color: "#ff4b49" }}>{dataItem.price}</span></div>
                        </div>
                ))}
            </div>
        )
    }

}
ShoesCards.defaultProps = {
            productList: [{
                productId: '',
                imgSrc: '',
                title: '',
                price: ''
            }]
}
export default ShoesCards;