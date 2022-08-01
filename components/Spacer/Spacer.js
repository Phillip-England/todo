export default function Spacer({
  height,
}) {

  const cssInJs = {
    height: height,
  }

  return(
    <div style={cssInJs}></div>
  )
}