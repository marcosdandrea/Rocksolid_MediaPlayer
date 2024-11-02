import "./style.css"

export const fontFamilies = Object.freeze({
    regular: "Roboto-Regular",
    bold: "Roboto-Bold",
    italic: "Roboto-Italic",
    medium: "Roboto-Medium",
    light: "Roboto-Light",
    thin: "Roboto-Thin",
})

const Text = ({children, fontFamily, color, size}) => {
    return ( 
    <div 
        style={{
            fontFamily,
            color,
            fontSize: size
        }}
        className="text">
        {children}
    </div> );
}
 
export default Text;