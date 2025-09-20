import { InitializeParams, InitializedParams } from './protocal/initalize_request';
import fs from 'node:fs';
import util from 'node:util';

function formatMessage(message) {
  const json = JSON.stringify(message);
  return util.format(`Content-Length: %s\r\n\r\n%s`, json.length, json);
}

// Helper functions to enforce type
const assertEditorInit = (params: InitializeParams) => params;
const assertLspResponse = (params: InitializedParams) => params;

fs.writeFileSync('../testdata/msg_01_editor.json', formatMessage({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: assertEditorInit({
    processId: 1,
    rootUri: "file://STUB", // Field deprecated, but required in spec
    capabilities: {
      workspace: {
        semanticTokens: {
          refreshSupport: true,
        }
      },
    },
  })
}));

fs.writeFileSync('../testdata/msg_01_lsp.json', formatMessage({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: assertLspResponse({
    processId: 1,
    rootUri: "file://STUB", // Field deprecated, but required in spec
    capabilities: {
      workspace: {
        semanticTokens: {
          refreshSupport: true,
        }
      },
    },
  })
}));
