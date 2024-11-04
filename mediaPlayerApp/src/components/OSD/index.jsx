import Text from "../Text";
import "./style.css"

const OSD = ({text}) => {
    return ( 
    <div className="osd">
        <div className="messsage">
            <Text>
                {text}
            </Text>
        </div>
    </div> 
    );
}
 
export default OSD;