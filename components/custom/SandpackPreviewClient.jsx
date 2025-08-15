import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ActionContext } from "@/context/ActionContext";
import { WarningProvider } from "@radix-ui/react-dialog";
export default function SandpackPreviewClient() {
    const previewRef = React.useRef();
    const { sandpack } = useSandpack();
    const { action, setAction } = useContext(ActionContext);
    useEffect(() => {
        GetSandPackClient()
    }, [sandpack,action]);
    const GetSandPackClient = async () => {
        const client = previewRef.current?.getClient()
        if (client) {
            const res = await client.getCodeSandboxURL()
            if (action?.actionType === 'deploy') {
                const result = await client.getCodeSandboxURL();
                window.open(`https://${res?.sandboxId}.csb.app/`);

            }

            else if (action?.actionType === 'export') {
                window.open(res.editorUrl);

            }
        };
    }
    return (
        <SandpackPreview ref={previewRef} style={{ height: '80vh' }} showNavigator={true} />
    );
}