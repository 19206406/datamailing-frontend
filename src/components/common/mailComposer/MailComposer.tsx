import { $getRoot, $getSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import MailComposerViewModel from "./MailComposer.viewmodel";
import { useState } from "react";

const MailComposer = () => {
  const { initialConfig } = MailComposerViewModel();
  const [content, setContent] = useState<string>("");
  console.log(content); 

  const onChange = (editorState: any) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
      setContent(text);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="boder rounded-lg overflow-hidden shadow-sm">
          <ToolbarPlugin />

          <div className="relative">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none" />
              }
              placeholder={
                <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                  Empieza a escribir aquí...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>

          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <OnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
};

export default MailComposer;
