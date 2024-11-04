import useGetDisplayID from "../../hooks/useGetDisplayID";
import useGetSystemInformation from "../../hooks/useGetSystemInformation";
import Logo from "../Logo";
import ShowIPOSD from "../ShowIPOSD";
import Text, { fontFamilies } from "../Text";
import "./style.css"

const ScreenMessage = ({ text }) => {
    const {displayID} = useGetDisplayID()

    const { systemVersion, ip } = useGetSystemInformation()
    const year = new Date().getFullYear()

    return (
        <div className="screenMessage">
            <Logo />
            {
                text ?
                    <>
                        <div className="textBlocks">
                            <Text
                                fontFamily={fontFamilies.medium}
                                size={"1rem"}>
                                {text}
                            </Text>
                        </div>
                    </>
                    : <></>
            }
            <ShowIPOSD />
           {/*  <div className="footer">
                <Text
                    fontFamily={fontFamilies.medium}
                    size={"1rem"}>
                    ID {displayID}
                </Text>
                <Text
                    color={"var(--disabled)"}
                    size={"0.8rem"}
                    fontFamily={fontFamilies.medium}>
                    {`Prodigi ${year} | ${ip} | v${systemVersion}`}
                </Text>
            </div> */}
        </div>);
}

export default ScreenMessage;