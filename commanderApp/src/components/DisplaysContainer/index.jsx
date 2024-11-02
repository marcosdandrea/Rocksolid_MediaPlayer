import "./style.css"
import useGetSystemDisplays from "../../hooks/useGetSystemDisplays";
import Display from "../Display";

const DisplaysContainer = () => {

    const { systemDisplays } = useGetSystemDisplays()

    return (
        <div className="displayContainer">
            {
                systemDisplays.map(displaydata =>
                    <Display 
                        key={displaydata.id}
                        data={displaydata}/>)
            }
        </div>
    );
}

export default DisplaysContainer;