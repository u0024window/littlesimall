import { introductInfo as introductInfoApi,webRoot } from '../assets/api.json';
import { Tabs, WhiteSpace } from "antd-mobile";
import '../sass/changeantdstyle/tabs.sass';
import '../sass/aboutlittlesi.sass';
import { ajaxSuccess, ajaxFail,_$$} from '../js/publicmethod.js';

const TabPane = Tabs.TabPane;

class AboutLittleSi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType:1,
            content: "",
            types:["buy","about"]
        }
        this.getContent = () => {
            $.ajax({
                type: _$$.env == "product" ? "post" : "get",
                url: _$$.env == "product" ? webRoot + introductInfoApi.url : introductInfoApi.mockUrl ,
                dataType: 'json',
                data: {
                    type: this.props.match.params.type
                }
            }).done((res) => {
                if (!ajaxSuccess(res)) return;
                this.setState({
                    content: res.body.content
                })
            }).fail((xhr, text, errorThrow) => {
                ajaxFail(xhr, text, errorThrow);
            });

        }
    }
    componentWillMount() {
        this.setState({
            currentType:this.props.match.params.type
        })
        this.getContent(this.state.currentType);
        this.handleTabClick = (key) => {
            switch (key){
                case 1:
                    this.getContent(1);
                    break;
                case 2:
                    this.getContent(2);
                    break;
            }
        }
    }
    render() {
        return (<div id="aboutlittlesi">
            <section><img src={require("../assets/images/littlesi.png")} alt="" /></section>
            <Tabs defaultActiveKey={this.props.match.params.type} animated={true} onTabClick={this.handleTabClick}>
                <TabPane tab="如何购买" key="1">
                    <div ref="buy" dangerouslySetInnerHTML={{__html: this.state.content}} style={{  backgroundColor: '#fff' }}>
                    </div>
                </TabPane>
                <TabPane tab="关于小思" key="2">
                    <div ref="about" dangerouslySetInnerHTML={{__html: this.state.content}} style={{ backgroundColor: '#fff' }}>
                    </div>
                </TabPane>
            </Tabs>
        </div>)
    }
}

AboutLittleSi.defaultProps = {
    type:"1"
}

export default AboutLittleSi;