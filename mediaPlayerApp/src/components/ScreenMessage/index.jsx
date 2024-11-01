import useGetDisplayID from "../../hooks/useGetDisplayID";
import useGetSystemInformation from "../../hooks/useGetSystemInformation";
import Logo from "../Logo";
import Text, { fontFamilies } from "../Text";
import "./style.css"

const ScreenMessage = ({ text }) => {
    const {displayID} = useGetDisplayID()

    const { systemVersion, mediaFilePath, ip } = useGetSystemInformation()
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
            <div className="footer">
                <Text
                    fontFamily={fontFamilies.medium}
                    size={"1rem"}>
                    {displayID}
                </Text>
                <Text
                    color={"var(--disabled)"}
                    size={"0.8rem"}
                    fontFamily={fontFamilies.medium}>
                    {`Prodigi ${year} | ${mediaFilePath} | ${ip} | v${systemVersion}`}
                </Text>
            </div>
        </div>);
}

export default ScreenMessage;