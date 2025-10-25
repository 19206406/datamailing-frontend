import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

const MailComposerViewModel = () => {
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


  const initialConfig = {
    namespace: "RichTextEditor",
    theme,
    onError: (error: Error) => console.error(error),
    nodes: [
      HeadingNode, 
      QuoteNode, 
      ListNode, 
      ListItemNode, 
      LinkNode
    ]
  };

  return {
    initialConfig, 
  };
};

export default MailComposerViewModel;
