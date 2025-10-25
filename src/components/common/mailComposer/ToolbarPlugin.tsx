import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  type HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  Link,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { useEffect, useState } from "react";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    code: false,
  });
  const [blockType, setBlockType] = useState<string>("paragraph");

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
      <Select value={blockType} onValueChange={formatBlockType}>
        <SelectTrigger className="w-[130px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Párrafo</SelectItem>
          <SelectItem value="h1">Encabezado 1</SelectItem>
          <SelectItem value="h2">Encabezado 2</SelectItem>
          <SelectItem value="h3">Encabezado 3</SelectItem>
          <SelectItem value="quote">Cita</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Historial */}
      <ToolbarButton
        icon={Undo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        title="Deshacer (Ctrl+Z)"
      />

      <ToolbarButton
        icon={Redo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        title="Rehacer (Ctrl+Y)"
      />

      <Separator orientation="vertical" className="h-6 mx-1" />

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

      {/* Enlaces */}
      <ToolbarButton icon={Link} onClick={insertLink} title="Insertar enlace" />
    </div>
  );
};

export default ToolbarPlugin;
