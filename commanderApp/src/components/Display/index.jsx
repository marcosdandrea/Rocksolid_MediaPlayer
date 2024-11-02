import DisplayMediaContainer from "../DisplayMediaContainer";
import Text from "../Text";
import "./style.css"

const Display = ({ data }) => {
    return (
        <div className="display">
            <div className="displayHeader">
                <Text>
                    {data.id}
                </Text>
            </div>
            <DisplayMediaContainer displayID={data.id} />
        </div>);
}

export default Display;