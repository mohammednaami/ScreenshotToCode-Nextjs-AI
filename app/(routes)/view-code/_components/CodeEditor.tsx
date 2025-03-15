import Constants from "@/data/Constants";
import { Sandpack } from "@codesandbox/sandpack-react";
import { aquaBlue } from "@codesandbox/sandpack-themes";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

function CodeEditor({ codeRes, isReady }: any) {
  return (
    <div>
      {isReady ? (
        <Sandpack
          template="react"
          theme={aquaBlue}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showTabs: true,
            editorHeight: "80vh",
          }}
          files={{
            "/App.js": `${codeRes}`,
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          theme={aquaBlue}
          files={{
            "/app.js": {
              code: `${codeRes}`,
              active: true,
            },
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}>
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: "80vh" }} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
}

export default CodeEditor;
