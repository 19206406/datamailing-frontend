import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Link,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Configuración del tema
const theme = {
  paragraph: "mb-2",
  quote: "border-l-4 border-gray-300 pl-4 italic my-4",
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
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-gray-100 px-1 py-0.5 rounded font-mono text-sm",
  },
};

// Plugin de la toolbar
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

  // Actualizar estado de la toolbar
  React.useEffect(() => {
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
    const url = prompt("Ingresa la URL:");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  const ToolbarButton = ({
    icon: Icon,
    onClick,
    isActive = false,
    title,
  }: any) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className="h-8 w-8 p-0"
      onClick={onClick}
      title={title}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center">
      {/* Selector de estilo de bloque */}
      <Select value={blockType} onValueChange={formatBlockType}>
        <SelectTrigger className="w-[130px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Párrafo</SelectItem>
          <SelectItem value="h1">Título 1</SelectItem>
          <SelectItem value="h2">Título 2</SelectItem>
          <SelectItem value="h3">Título 3</SelectItem>
          <SelectItem value="quote">Cita</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Historial */}
      <ToolbarButton
        icon={Undo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        title="Deshacer"
      />
      <ToolbarButton
        icon={Redo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        title="Rehacer"
      />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Formato de texto */}
      <ToolbarButton
        icon={Bold}
        onClick={() => formatText("bold")}
        isActive={activeFormats.bold}
        title="Negrita (Ctrl+B)"
      />
      <ToolbarButton
        icon={Italic}
        onClick={() => formatText("italic")}
        isActive={activeFormats.italic}
        title="Cursiva (Ctrl+I)"
      />
      <ToolbarButton
        icon={Underline}
        onClick={() => formatText("underline")}
        isActive={activeFormats.underline}
        title="Subrayado (Ctrl+U)"
      />
      <ToolbarButton
        icon={Strikethrough}
        onClick={() => formatText("strikethrough")}
        isActive={activeFormats.strikethrough}
        title="Tachado"
      />
      <ToolbarButton
        icon={Code}
        onClick={() => formatText("code")}
        isActive={activeFormats.code}
        title="Código"
      />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Alineación */}
      <ToolbarButton
        icon={AlignLeft}
        onClick={() => formatAlignment("left")}
        title="Alinear izquierda"
      />
      <ToolbarButton
        icon={AlignCenter}
        onClick={() => formatAlignment("center")}
        title="Centrar"
      />
      <ToolbarButton
        icon={AlignRight}
        onClick={() => formatAlignment("right")}
        title="Alinear derecha"
      />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Listas */}
      <ToolbarButton
        icon={List}
        onClick={() => formatList("ul")}
        isActive={blockType === "ul"}
        title="Lista con viñetas"
      />
      <ToolbarButton
        icon={ListOrdered}
        onClick={() => formatList("ol")}
        isActive={blockType === "ol"}
        title="Lista numerada"
      />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Enlaces */}
      <ToolbarButton icon={Link} onClick={insertLink} title="Insertar enlace" />
    </div>
  );
}

// Configuración inicial de Lexical
const initialConfig = {
  namespace: "RichTextEditor",
  theme,
  onError: (error: Error) => console.error(error),
};

function LexicalRichTextEditor() {
  const [content, setContent] = useState("");

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
        <div className="border rounded-lg overflow-hidden shadow-sm">
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
}

export default LexicalRichTextEditor;
