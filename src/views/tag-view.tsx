import * as React from "react"
import { App } from "obsidian"
import { TextResult } from "../components/text-result"
import { Tag } from "../types"

/**
 * TODO
 * - Expand and collapse tags
 * - Nested tags
 * - Highlight line of text when clicked on 
 */
export const TagView = ({ app, tagDetails } : { app: App, tagDetails: Tag }) => {
	const [display, setDisplay] = React.useState<boolean>(true);
	return (
		<>
			<div>
				<h3 className="tag__title">
					{tagDetails.tag}
					<span className="tag__title--light"> ({tagDetails.positions.length}) </span>
				</h3>
				{display && tagDetails.positions.map((pos, index) => {
					return (
						<React.Fragment key={tagDetails.tag + index} >
							<div className={"tag__content--bottom " + (index === 0 ? "tag__content--top" : "")}> 
								<TextResult app={app} tag={tagDetails.tag} pos={pos} />
							</div>
						</React.Fragment>
					)
				})

				}
			</div>
		</>
	)
}