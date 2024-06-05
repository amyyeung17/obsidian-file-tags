import { getLine, goToLine } from "../utils"
import { App, Pos } from "obsidian"
export const TextResult = ({ app, tag, pos }: {app: App, tag: string, pos: Pos})  => {
  const tagText = "#" + tag;
  
  const splitText = getLine(app, pos).split(" ");
  const tagIndex = splitText.indexOf(tagText);
  const preTagText = splitText.slice(0, tagIndex).join(" ");
  const afterTagText = splitText.slice(tagIndex + 1).join(" ");

  
  return (
    <>
      <div onClick={() => goToLine(app, pos)}>
        <p>
          {preTagText}
          <strong> {tagText} </strong>
          {afterTagText}
          <span className="text-light">({pos.start.line})</span>
        </p>
      </div>
    </>
  )
}