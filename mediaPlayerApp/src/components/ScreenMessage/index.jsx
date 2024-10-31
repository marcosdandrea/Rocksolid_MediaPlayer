import useGetDisplayID from "../../hooks/useGetDisplayID";
import useGetSystemVersion from "../../hooks/useGetSystemVersion";
import Logo from "../Logo";
import Text, { fontFamilies } from "../Text";
import "./style.css"

const ScreenMessage = ({ text }) => {
    const {displayID} = useGetDisplayID()

    const { systemVersion } = useGetSystemVersion()
    const year = new Date().getFullYear()

    return (
        <div className="screenMessage">
            <Logo />
            {
                text ?
                    <>
                        <div className="line" />
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
                    {`Proyecciones Digitales ${year} | v${systemVersion}`}
                </Text>
            </div>
        </div>);
}

export default ScreenMessage;