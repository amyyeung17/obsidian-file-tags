import { Root, createRoot } from "react-dom/client";
import { ItemView, MarkdownView, TFile, WorkspaceLeaf } from "obsidian";
import FileTagsPlugin from "../../main";
import { getFileTags } from "../utils";
import { TabView } from "./tab-view"
import { Tag } from "../types"
export const FILE_TAGS_VIEW = "all-tags-view";
export class FileTagsView extends ItemView {
	root: Root;
	plugin: FileTagsPlugin;
	allTags: Tag[] = [];
	/**
	 * TODO:
	 * - Handle click outside (after delete and new tag)
	 * - useContext for app
	 */
	constructor(leaf: WorkspaceLeaf, plugin: FileTagsPlugin) {
		super(leaf);
		this.plugin = plugin;

		plugin.registerEvent(
			this.app.workspace.on("active-leaf-change",
				(leaf: WorkspaceLeaf) => {
					//leaf.setViewState({ type: "markdown", active: true });
				}
			)
		)

		plugin.registerEvent(
			this.app.workspace.on(
				"file-open",
				(file: TFile) => {
					if (!file) {
						this.allTags = [];
					} else {
						this.allTags = getFileTags(this.app, file);
					}
					this.render();
				}
			)
		)

		plugin.registerEvent(
			this.app.workspace.on(
				"editor-change",
				(_, info: MarkdownView) => {
					this.allTags = getFileTags(this.app, info.file!);
					this.render();
				}
			)
		)
		this.render();
	}

	refresh() {
		this.render();
	}

	getViewType() {
		return FILE_TAGS_VIEW;
	}

	getDisplayText() {
		return "File tags";
	}

	render() {
		if (this.root) {
			this.root.render(
				<>
					<TabView app={this.app} allTags={this.allTags || []} />
				</>
			)
		}
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.render();
	}

	async onClose() {
		this.root.unmount();
	}
}
