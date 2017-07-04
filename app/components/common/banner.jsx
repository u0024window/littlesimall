import '../../sass/sibanner.jsx';
const Sibanner = (props)=>(
                    <div className="sibanner">
                        <img src={props.bgUrl} alt="" className="bg"/>
                        <img src={prop.logoUrl} alt="" className="logo"/>
                        <span>{props.name}</span>
                    </div>
                )

export default Sibanner;
