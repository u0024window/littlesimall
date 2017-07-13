import '../../sass/common/shoescard.sass';
import NoResult from './noresult.jsx';

class ShoesCards extends React.Component {
    render() {
        const prols = this.props.productList;
        return (
            <div id="shoes-card" ref="shoescard">
                {prols.length !=0 ? prols.map((dataItem, index) => (
                        <div className="shoes-card" 
                            onClick={((productId)=>{
                                return ()=>{
                                    this.props.history.push("/productdetail/"+productId)
                                }
                            })(dataItem.productId)}
                            key={dataItem.productId+new Date()}>
                            <div><img src={dataItem.imgSrc} alt="" /></div>
                            <div>{dataItem.title}</div>
                            <div><span style={{ color: "#454545" }}>¥</span><span style={{ color: "#ff4b49" }}>{dataItem.price}</span></div>
                        </div>
                )) : <NoResult />}
            </div>
        )
    }

}
export default ShoesCards;