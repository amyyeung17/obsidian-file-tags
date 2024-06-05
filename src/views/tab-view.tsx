import * as React from "react";
import { App } from "obsidian"
import { Tag } from "../types"
import { TagView } from "./tag-view"
export const TabView = ({ app, allTags } : {app: App, allTags: Tag[]}) => {
  return (
    <>
      {allTags.length !== 0 ?
        allTags.map((tagDetails) => {
          return (
            <React.Fragment key={tagDetails.tag}>
              <TagView app={app} tagDetails={tagDetails} />
            </React.Fragment>
          )
        })
        :
        <h3> No tags </h3>
      }
    </>
  )
}