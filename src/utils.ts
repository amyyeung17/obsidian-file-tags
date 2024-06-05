import {
	App,
	TFile,
	getAllTags,
	Pos,
	MarkdownView,
	WorkspaceLeaf,
} from "obsidian";
import { Tag } from "./types";

export function getFileTags(app: App, file: TFile) {
	return getPositions(app, file!);
}

function getPositions(app: App, file: TFile): Tag[] {
	const cache = app.metadataCache.getFileCache(file!);
	const allTags = cache!.tags ?? [];
	const uniqueTags = new Set();
	const positions: { [key: string]: Pos[] } = {};

	for (let i = 0; i < allTags.length; i++) {
		let currentTag = allTags[i].tag.substring(1);
		if (!uniqueTags.has(currentTag)) {
			uniqueTags.add(currentTag);
			positions[currentTag] = [allTags[i].position];
		} else {
			positions[currentTag].push(allTags[i].position);
		}
	}

	return Object.keys(positions).map((key) => ({
		tag: key,
		positions: positions[key],
	}));
}

export function getLine(app: App, pos: Pos): string {
	if (getCurrentFiles(app).length !== 0 && !getCurrentView(app)) {
		setMarkdownFile(app);
	}
	return getCurrentView(app)!.editor.getLine(pos.start.line);
}

export function goToLine(app: App, pos: Pos): void {
	setMarkdownFile(app);

	const editor = getCurrentView(app)!.editor;
	const startPos = editor.offsetToPos(pos.start.offset);
	const endPos = editor.offsetToPos(pos.start.offset);

	editor.getLine(pos.start.line);
	editor.scrollIntoView({ from: startPos, to: endPos }, true);
}

function getCurrentFiles(app: App): WorkspaceLeaf[] {
	return app!.workspace!.getLeavesOfType("markdown");
}

function getCurrentView(app: App): MarkdownView | null {
	return app!.workspace!.getActiveViewOfType(MarkdownView);
}

function setMarkdownFile(app: App): void {
	app!.workspace!.setActiveLeaf(getCurrentFiles(app)[0]);
}
