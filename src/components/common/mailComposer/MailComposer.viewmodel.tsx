import { $getSelection, $isRangeSelection } from "lexical";
import { Icon, Italic, ListIcon, Strikethrough, Underline } from "lucide-react";
import React, { useEffect } from "react";
import { SelectionState } from "react-day-picker";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";

import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createParagraphNode,
  $getRoot,
} from "lexical";

import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
} from "@lexical/list";

import {
  $isHeadingNode,
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";

import { $setBlocksType } from "@lexical/selection";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";

const MailComposerViewModel = () => {
  const theme = {
    paragraph: "mb-2",
    qoute: "border-l-4 border-gray-300 pl-4 italic my-4",
    heading: {
      h1: "text-3xl font-bold mb-4",
      h2: "text-2xl font-bold mb-3",
      h3: "text-xl font-bold mb-2",
    },
    list: {
      ul: "list-disc list-inside ml-4 mb-2",
      ol: "list-decimal list-inside ml-4 mb-2",
      listitem: "mb-1",
    },
    link: "text-blue-600 underline hover:text-blue-800",
    text: {
      bold: "font-bold",
      italic: "italic",
      Underline: "underline",
      strikethrough: "line-through",
      code: "bg-gray-100 px-1 py-0.5 rounded font-mono text-sm",
    },
  };

  function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [activeFormats, setActiveFormats] = useState({
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      code: false,
    });

    const [blockType, setBlockType] = useState("paragraph");

    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            setActiveFormats({
              bold: selection.hasFormat("bold"),
              italic: selection.hasFormat("italic"),
              underline: selection.hasFormat("underline"),
              strikethrough: selection.hasFormat("strikethrough"),
              code: selection.hasFormat("code"),
            });

            const anchorNode = selection.anchor.getNode();
            const element =
              anchorNode.getKey() === "root"
                ? anchorNode
                : anchorNode.getTopLevelElementOrThrow();

            if ($isHeadingNode(element)) {
              setBlockType(element.getTag());
            } else if ($isListNode(element)) {
              setBlockType(element.getListType());
            } else {
              setBlockType(element.getType());
            }
          }
        });
      });
    }, [editor]);

    const formatText = (format: any) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    };

    const formatAlignment = (alignment: any) => {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
    };

    const formatList = (type: "ul" | "ol") => {
      if (blockType === "ul" || blockType === "ol") {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(
          type === "ul"
            ? INSERT_UNORDERED_LIST_COMMAND
            : INSERT_ORDERED_LIST_COMMAND,
          undefined
        );
      }
    };

    const formatBlockType = (type: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          if (type === "paragraph") {
            $setBlocksType(selection, () => $createParagraphNode());
          } else if (type === "quote") {
            $setBlocksType(selection, () => $createQuoteNode());
          } else if (["h1", "h2", "h3"].includes(type)) {
            $setBlocksType(selection, () =>
              $createHeadingNode(type as HeadingTagType)
            );
          }
        }
      });
    };

    const insertLink = () => {
      const url = prompt("Enter the URL:");
      if (url) {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      }
    };

    const ToolbarButton = ({
      icon: Icon,
      onclick,
      isActive = false,
      title,
    }) => {
      return (
        <button
          onClick={onclick}
          className={`flex items-center p-2 rounded-md ${
            isActive ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
          title={title}
        >
          <Icon className="h-5 w-5" />
        </button>
      );
    };
  }

  const initialConfig = {
    namespace: "RichTextEditor",
    theme,
    onerror: (error: Error) => console.error(error),
  };

  return {
    initialConfig, 
  };
};

export default MailComposerViewModel;
