import { Button } from "@/components/ui/button";
import UnresolvedEmailsViewModel from "./UnresolvedEmails.viewmodel";
import { ArchiveIcon, ChevronLeft, Star, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";

const UnresolvedEmails = () => {
  const {
    selectedEmails,
    emails,
    currentView,
    selectedEmail,
    hoveredRow,
    toggleEmailSelection,
    toggleStar,
    openEmail,
    goBackToList,
    getLabelColor,
    setSelectedEmails,
    setHoveredRow,
  } = UnresolvedEmailsViewModel();

  if (currentView === "detail" && selectedEmail) {
    return (
      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white shadow-sm">
          {/* Header del correo */}
          <div className="border-b p-4 flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goBackToList}>
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <h1 className="text-xl font-semibold flex-1">
              {selectedEmail.subject}
            </h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-secondaryColor cursor-pointer"
                  >
                    <ArchiveIcon className="h-4 w-4 mr-2" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-blue-600 text-white px-2 py-1 rounded-lg font-semibold text-sm shadow-sm">
                  <p>Archivar correo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-red-800 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-red-600 text-white px-2 py-1 rounded-lg font-semibold text-sm shadow-sm">
                  <p>Eliminar correo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Contenido del correo */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {selectedEmail.sender[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedEmail.sender}</p>
                    <p className="text-sm text-gray-500">to me</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {selectedEmail.date}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                {selectedEmail.labels.map((label) => (
                  <Badge
                    key={label}
                    variant="secondary"
                    className={getLabelColor(label)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {selectedEmail.fullContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-sm">
        {/* Toolbar superior */}
        <div className="border-b px-4 py-2 flex items-center gap-2">
          <Checkbox
            checked={selectedEmails.length === emails.length}
            onCheckedChange={(checked) => {
              setSelectedEmails(checked ? emails.map((e) => e.id) : []);
            }}
          />
          {selectedEmails.length > 0 && (
            <>
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <ArchiveIcon className="h-4 w-4 mr-2" />
                Archivar
              </Button>
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
              <span className="text-sm text-gray-500 ml-2">
                {selectedEmails.length} selected
              </span>
            </>
          )}
        </div>

        {/* Lista de correos */}
        <div className="divide-y">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:shadow-md transition-all ${
                !email.isRead ? "bg-white" : "bg-gray-50"
              } ${hoveredRow === email.id ? "bg-gray-100" : ""}`}
              onClick={() => openEmail(email)}
              onMouseEnter={() => setHoveredRow(email.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Checkbox */}
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedEmails.includes(email.id)}
                  onCheckedChange={() => toggleEmailSelection(email.id)}
                />
              </div>

              {/* Star */}
              <button
                onClick={(e) => toggleStar(email.id, e)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-5 w-5 ${
                    email.isStarred
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                />
              </button>

              {/* Remitente */}
              <div
                className={`w-48 truncate ${
                  !email.isRead ? "font-semibold" : ""
                }`}
              >
                {email.sender}
              </div>

              {/* Asunto y Preview */}
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span
                  className={`truncate ${!email.isRead ? "font-semibold" : ""}`}
                >
                  {email.subject}
                </span>
                <span className="text-gray-500 text-sm truncate">
                  - {email.preview}
                </span>
              </div>

              {/* Labels */}
              <div className="flex gap-1">
                {email.labels.map((label) => (
                  <Badge
                    key={label}
                    variant="secondary"
                    className={`text-xs ${getLabelColor(label)}`}
                  >
                    {label}
                  </Badge>
                ))}
              </div>

              {/* Fecha */}
              <div className="text-sm text-gray-500 w-20 text-right">
                {email.date}
              </div>

              {/* Acciones al hover */}
              {hoveredRow === email.id && (
                <div
                  className="flex gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-secondaryColor cursor-pointer"
                        >
                          <ArchiveIcon className="h-4 w-4 mr-2" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-blue-600 text-white px-2 py-1 rounded-lg font-semibold text-sm shadow-sm">
                        <p>Archivar correo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-red-800 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-red-600 text-white px-2 py-1 rounded-lg font-semibold text-sm shadow-sm">
                        <p>Eliminar correo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnresolvedEmails;
