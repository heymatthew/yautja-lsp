// Taken from
// https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/

// The current protocol specification defines that the lifecycle of a server is
// managed by the client. It is up to the client to decide when to start
// (process-wise) and when to shutdown a server.
export interface InitializeParams extends WorkDoneProgressParams {
  processId: integer | null;
  clientInfo?: {
    name: string;
    version?: string;
  };
  locale?: string;
  rootPath?: string | null;
  rootUri: DocumentUri | null;
  initializationOptions?: LSPAny;
  capabilities: ClientCapabilities;
  trace?: TraceValue;
  workspaceFolders?: WorkspaceFolder[] | null;
}

export interface InitializedParams {
}

interface ResponseMessage extends Message {
	id: integer | string | null;
	result?: LSPAny;
	error?: ResponseError;
}

interface Message {
	jsonrpc: string;
}

interface ResponseError {
	code: integer;
	message: string;
	data?: LSPAny;
}

export type decimal = number;
export type integer = number;
export type LSPAny = LSPObject | LSPArray | string | integer | uinteger | decimal | boolean | null;
export type LSPArray = LSPAny[];
export type LSPObject = { [key: string]: LSPAny };
export type ResourceOperationKind = 'create' | 'rename' | 'delete';
export type TraceValue = 'off' | 'messages' | 'verbose';
export type uinteger = number;

type DocumentUri = string;
type ProgressToken = integer | string;
type URI = string;

export interface WorkDoneProgressParams {
	workDoneToken?: ProgressToken;
}

interface ClientCapabilities {
	workspace?: {
		applyEdit?: boolean;
		workspaceEdit?: WorkspaceEditClientCapabilities;
		didChangeConfiguration?: DidChangeConfigurationClientCapabilities;
		didChangeWatchedFiles?: DidChangeWatchedFilesClientCapabilities;
		symbol?: WorkspaceSymbolClientCapabilities;
		executeCommand?: ExecuteCommandClientCapabilities;
		workspaceFolders?: boolean;
		configuration?: boolean;
		 semanticTokens?: SemanticTokensWorkspaceClientCapabilities;
		codeLens?: CodeLensWorkspaceClientCapabilities;
		fileOperations?: {
			dynamicRegistration?: boolean;
			didCreate?: boolean;
			willCreate?: boolean;
			didRename?: boolean;
			willRename?: boolean;
			didDelete?: boolean;
			willDelete?: boolean;
		};
		inlineValue?: InlineValueWorkspaceClientCapabilities;
		inlayHint?: InlayHintWorkspaceClientCapabilities;
		diagnostics?: DiagnosticWorkspaceClientCapabilities;
	};
	textDocument?: TextDocumentClientCapabilities;
	notebookDocument?: NotebookDocumentClientCapabilities;
	window?: {
		workDoneProgress?: boolean;
		showMessage?: ShowMessageRequestClientCapabilities;
		showDocument?: ShowDocumentClientCapabilities;
	};
	general?: {
		staleRequestSupport?: {
			cancel: boolean;
			 retryOnContentModified: string[];
		}
		regularExpressions?: RegularExpressionsClientCapabilities;
		markdown?: MarkdownClientCapabilities;
		positionEncodings?: PositionEncodingKind[];
	};
	experimental?: LSPAny;
}

export interface WorkspaceFolder {
	uri: URI;
	name: string;
}

export interface WorkspaceEditClientCapabilities {
	documentChanges?: boolean;
	resourceOperations?: ResourceOperationKind[];
	failureHandling?: FailureHandlingKind;
	normalizesLineEndings?: boolean;
	changeAnnotationSupport?: {
		groupsOnLabel?: boolean;
	};
}

export type FailureHandlingKind = 'abort' | 'transactional' | 'undo' | 'textOnlyTransactional';
export namespace FailureHandlingKind {
	export const Abort: FailureHandlingKind = 'abort';
	export const Transactional: FailureHandlingKind = 'transactional';
	export const TextOnlyTransactional: FailureHandlingKind = 'textOnlyTransactional';
	export const Undo: FailureHandlingKind = 'undo';
}

export interface DidChangeConfigurationClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface DidChangeWatchedFilesClientCapabilities {
	dynamicRegistration?: boolean;
	relativePatternSupport?: boolean;
}

interface WorkspaceSymbolClientCapabilities {
	dynamicRegistration?: boolean;
	symbolKind?: {
		valueSet?: SymbolKind[];
	};
	tagSupport?: {
		valueSet: SymbolTag[];
	};
	resolveSupport?: {
		properties: string[];
	};
}

export namespace SymbolKind {
	export const File = 1;
	export const Module = 2;
	export const Namespace = 3;
	export const Package = 4;
	export const Class = 5;
	export const Method = 6;
	export const Property = 7;
	export const Field = 8;
	export const Constructor = 9;
	export const Enum = 10;
	export const Interface = 11;
	export const Function = 12;
	export const Variable = 13;
	export const Constant = 14;
	export const String = 15;
	export const Number = 16;
	export const Boolean = 17;
	export const Array = 18;
	export const Object = 19;
	export const Key = 20;
	export const Null = 21;
	export const EnumMember = 22;
	export const Struct = 23;
	export const Event = 24;
	export const Operator = 25;
	export const TypeParameter = 26;
}

export type SymbolKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26;

export interface ExecuteCommandClientCapabilities {
	dynamicRegistration?: boolean;
}

interface SemanticTokensClientCapabilities {
	dynamicRegistration?: boolean;
	requests: {
		range?: boolean | {};
		full?: boolean | { delta?: boolean; };
	};
	tokenTypes: string[];
	tokenModifiers: string[];
	formats: TokenFormat[];
	overlappingTokenSupport?: boolean;
	multilineTokenSupport?: boolean;
	serverCancelSupport?: boolean;
	augmentsSyntaxTokens?: boolean;
}

export namespace TokenFormat {
	export const Relative: 'relative' = 'relative';
}

export type TokenFormat = 'relative';

export interface SemanticTokensWorkspaceClientCapabilities {
	refreshSupport?: boolean;
}

export interface CodeLensWorkspaceClientCapabilities {
	refreshSupport?: boolean;
}

export interface InlineValueWorkspaceClientCapabilities {
	refreshSupport?: boolean;
}

export interface InlayHintWorkspaceClientCapabilities {
	refreshSupport?: boolean;
}

export interface DiagnosticWorkspaceClientCapabilities {
	refreshSupport?: boolean;
}

export interface TextDocumentClientCapabilities {
	synchronization?: TextDocumentSyncClientCapabilities;
	completion?: CompletionClientCapabilities;
	hover?: HoverClientCapabilities;
	signatureHelp?: SignatureHelpClientCapabilities;
	declaration?: DeclarationClientCapabilities;
	definition?: DefinitionClientCapabilities;
	typeDefinition?: TypeDefinitionClientCapabilities;
	implementation?: ImplementationClientCapabilities;
	references?: ReferenceClientCapabilities;
	documentHighlight?: DocumentHighlightClientCapabilities;
	documentSymbol?: DocumentSymbolClientCapabilities;
	codeAction?: CodeActionClientCapabilities;
	codeLens?: CodeLensClientCapabilities;
	documentLink?: DocumentLinkClientCapabilities;
	colorProvider?: DocumentColorClientCapabilities;
	formatting?: DocumentFormattingClientCapabilities;
	rangeFormatting?: DocumentRangeFormattingClientCapabilities;
	onTypeFormatting?: DocumentOnTypeFormattingClientCapabilities;
	rename?: RenameClientCapabilities;
	publishDiagnostics?: PublishDiagnosticsClientCapabilities;
	foldingRange?: FoldingRangeClientCapabilities;
	selectionRange?: SelectionRangeClientCapabilities;
	linkedEditingRange?: LinkedEditingRangeClientCapabilities;
	callHierarchy?: CallHierarchyClientCapabilities;
	semanticTokens?: SemanticTokensClientCapabilities;
	moniker?: MonikerClientCapabilities;
	typeHierarchy?: TypeHierarchyClientCapabilities;
	inlineValue?: InlineValueClientCapabilities;
	inlayHint?: InlayHintClientCapabilities;
	diagnostic?: DiagnosticClientCapabilities;
}

export interface NotebookDocumentClientCapabilities {
	synchronization: NotebookDocumentSyncClientCapabilities;
}

export interface ShowMessageRequestClientCapabilities {
	messageActionItem?: { additionalPropertiesSupport?: boolean; };
}

export interface ShowDocumentClientCapabilities {
	support: boolean;
}

export interface RegularExpressionsClientCapabilities {
	engine: string;
	version?: string;
}

export interface MarkdownClientCapabilities {
	parser: string;
	version?: string;
	allowedTags?: string[];
}

export type PositionEncodingKind = string;
export namespace PositionEncodingKind {
	export const UTF8: PositionEncodingKind = 'utf-8';
	export const UTF16: PositionEncodingKind = 'utf-16';
	export const UTF32: PositionEncodingKind = 'utf-32';
}

export namespace SymbolTag {
	export const Deprecated: 1 = 1;
}

export type SymbolTag = 1;

export interface TextDocumentSyncClientCapabilities {
	dynamicRegistration?: boolean;
	willSave?: boolean;
	willSaveWaitUntil?: boolean;
	didSave?: boolean;
}

export interface CompletionClientCapabilities {
	dynamicRegistration?: boolean;
	completionItem?: {
		snippetSupport?: boolean;
		commitCharactersSupport?: boolean;
		documentationFormat?: MarkupKind[];
		deprecatedSupport?: boolean;
		preselectSupport?: boolean;
		tagSupport?: {
			valueSet: CompletionItemTag[];
		};
		insertReplaceSupport?: boolean;
		resolveSupport?: {
			properties: string[];
		};
		insertTextModeSupport?: {
			valueSet: InsertTextMode[];
		};
		labelDetailsSupport?: boolean;
	};
	completionItemKind?: {
		valueSet?: CompletionItemKind[];
	};
	contextSupport?: boolean;
	insertTextMode?: InsertTextMode;
	completionList?: {
		itemDefaults?: string[];
	}
}

export interface HoverClientCapabilities {
	dynamicRegistration?: boolean;
	contentFormat?: MarkupKind[];
}

export interface SignatureHelpClientCapabilities {
	dynamicRegistration?: boolean;
	signatureInformation?: {
		documentationFormat?: MarkupKind[];
		parameterInformation?: {
			labelOffsetSupport?: boolean;
		};
		activeParameterSupport?: boolean;
	};
	contextSupport?: boolean;
}

export interface DeclarationClientCapabilities {
	dynamicRegistration?: boolean;
	linkSupport?: boolean;
}

export interface DefinitionClientCapabilities {
	dynamicRegistration?: boolean;
	linkSupport?: boolean;
}

export interface TypeDefinitionClientCapabilities {
	dynamicRegistration?: boolean;
	linkSupport?: boolean;
}

export interface ImplementationClientCapabilities {
	dynamicRegistration?: boolean;
	linkSupport?: boolean;
}

export interface ReferenceClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface DocumentHighlightClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface DocumentSymbolClientCapabilities {
	dynamicRegistration?: boolean;
	symbolKind?: {
		valueSet?: SymbolKind[];
	};
	hierarchicalDocumentSymbolSupport?: boolean;
	tagSupport?: {
		valueSet: SymbolTag[];
	};
	labelSupport?: boolean;
}

export interface CodeActionClientCapabilities {
	dynamicRegistration?: boolean;
	codeActionLiteralSupport?: {
		codeActionKind: {
			valueSet: CodeActionKind[];
		};
	};
	isPreferredSupport?: boolean;
	disabledSupport?: boolean;
	dataSupport?: boolean;
	resolveSupport?: {
		properties: string[];
	};
	honorsChangeAnnotations?: boolean;
}

export interface CodeLensClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface DocumentLinkClientCapabilities {
	dynamicRegistration?: boolean;
	tooltipSupport?: boolean;
}

export interface DocumentColorClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface DocumentFormattingClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface DocumentRangeFormattingClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface DocumentOnTypeFormattingClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface RenameClientCapabilities {
	dynamicRegistration?: boolean;
	prepareSupport?: boolean;
	prepareSupportDefaultBehavior?: PrepareSupportDefaultBehavior;
	honorsChangeAnnotations?: boolean;
}

export interface PublishDiagnosticsClientCapabilities {
	relatedInformation?: boolean;
	tagSupport?: {
		valueSet: DiagnosticTag[];
	};
	versionSupport?: boolean;
	codeDescriptionSupport?: boolean;
	dataSupport?: boolean;
}

export interface FoldingRangeClientCapabilities {
	dynamicRegistration?: boolean;
	rangeLimit?: uinteger;
	lineFoldingOnly?: boolean;
	foldingRangeKind? : {
		valueSet?: FoldingRangeKind[];
	};
	foldingRange?: {
		collapsedText?: boolean;
	};
}

export interface SelectionRangeClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface LinkedEditingRangeClientCapabilities {
	dynamicRegistration?: boolean;
}

interface CallHierarchyClientCapabilities {
	dynamicRegistration?: boolean;
}

interface MonikerClientCapabilities {
	dynamicRegistration?: boolean;
}

type TypeHierarchyClientCapabilities = {
	dynamicRegistration?: boolean;
};

export interface InlineValueClientCapabilities {
	dynamicRegistration?: boolean;
}

export interface InlayHintClientCapabilities {
	dynamicRegistration?: boolean;
	resolveSupport?: {
		properties: string[];
	};
}

export interface DiagnosticClientCapabilities {
	dynamicRegistration?: boolean;
	relatedDocumentSupport?: boolean;
}

export interface NotebookDocumentSyncClientCapabilities {
	dynamicRegistration?: boolean;
	executionSummarySupport?: boolean;
}

export namespace MarkupKind {
	export const PlainText: 'plaintext' = 'plaintext';
	export const Markdown: 'markdown' = 'markdown';
}
export type MarkupKind = 'plaintext' | 'markdown';

export namespace CompletionItemTag {
	export const Deprecated = 1;
}
export type CompletionItemTag = 1;

export namespace InsertTextMode {
	export const asIs: 1 = 1;
	export const adjustIndentation: 2 = 2;
}
export type InsertTextMode = 1 | 2;

export namespace CompletionItemKind {
	export const Text = 1;
	export const Method = 2;
	export const Function = 3;
	export const Constructor = 4;
	export const Field = 5;
	export const Variable = 6;
	export const Class = 7;
	export const Interface = 8;
	export const Module = 9;
	export const Property = 10;
	export const Unit = 11;
	export const Value = 12;
	export const Enum = 13;
	export const Keyword = 14;
	export const Snippet = 15;
	export const Color = 16;
	export const File = 17;
	export const Reference = 18;
	export const Folder = 19;
	export const EnumMember = 20;
	export const Constant = 21;
	export const Struct = 22;
	export const Event = 23;
	export const Operator = 24;
	export const TypeParameter = 25;
}

export type CompletionItemKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;

export type CodeActionKind = string;
export namespace CodeActionKind {
	export const Empty: CodeActionKind = '';
	export const QuickFix: CodeActionKind = 'quickfix';
	export const Refactor: CodeActionKind = 'refactor';
	export const RefactorExtract: CodeActionKind = 'refactor.extract';
	export const RefactorInline: CodeActionKind = 'refactor.inline';
	export const RefactorRewrite: CodeActionKind = 'refactor.rewrite';
	export const Source: CodeActionKind = 'source';
	export const SourceOrganizeImports: CodeActionKind = 'source.organizeImports';
	export const SourceFixAll: CodeActionKind = 'source.fixAll';
}

export namespace PrepareSupportDefaultBehavior {
	 export const Identifier: 1 = 1;
}

export type PrepareSupportDefaultBehavior = 1;

export namespace DiagnosticTag {
	export const Unnecessary: 1 = 1;
	export const Deprecated: 2 = 2;
}

export type DiagnosticTag = 1 | 2;

export namespace FoldingRangeKind {
	export const Comment = 'comment';
	export const Imports = 'imports';
	export const Region = 'region';
}

export type FoldingRangeKind = string;
