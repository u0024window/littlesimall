// const {Carousel} = antDesign;
import { Carousel } from 'antd-mobile';
import '../sass/changeantdstyle/carousel.sass';
import {indexBanner as indexBannerApi,webRoot} from '../assets/api.json';
import {ajaxSuccess, ajaxFail,_$$} from '../js/publicmethod.js';

class CarouselShoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            initialHeight: 324,
        };
    }
    componentDidMount() {
        // simulate img loading
        $.ajax({
            type:_$$.env == "product" ? "post" : "get",
            url: _$$.env == "product" ? webRoot + indexBannerApi.url : indexBannerApi.mockUrl ,
            dataType:'json',
            data:indexBannerApi.data

        }).done((res)=>{
            if (!ajaxSuccess(res)) return;
            const data = res.body.list.map(function(val,index){
                return {
                    imgSrc:val.banner_path,
                    resource:val.resource_link,
                    id:val.banner_id
                }
                    
            })
            this.setState({
                data:data
            })
        }).fail((xhr,text,errorThrow)=>{
            ajaxFail(xhr,text,errorThrow);
        });

    }
    render() {
        // const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        return (
            <Carousel
                autoplay={true}
                infinite={true}
                className="carousel-shoes"
            >
                {this.state.data.map((ii,index)=> (
                    <a href="javascript:void(0)" key={index+'CarouselShoes'} onClick={((id)=>{
                            return ()=>window.location.hash = "productdetail?id="+id
                        })(ii.id)} style={{height:this.state.initialHeight}}>
                        <img
                            src={ii.imgSrc}
                            alt="icon"
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({
                                    initialHeight: null,
                                });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        )
    }
}

export default CarouselShoes;