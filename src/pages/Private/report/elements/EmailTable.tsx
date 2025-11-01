"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowRight, Clock, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { EmailRecord } from "@/types";

interface EmailTableProps {
  emails: EmailRecord[];
}

const EmailTable = ({ emails }: EmailTableProps) => {
  const [selectedEmail, setSelectedEmail] = useState<EmailRecord | null>(null);

  const getStatusBadge = (status: EmailRecord["status"]) => {
    const variants = {
      answered: {
        label: "Respondido",
        variant: "default" as const,
        className: "bg-green-500 text-white",
      },
      forwarded: {
        label: "Derivado",
        variant: "secondary" as const,
        className: "bg-accent text-accent-foreground",
      },
      pending: {
        label: "Pendiente",
        variant: "outline" as const,
        className: "border-yellow-500 text-yellow-600",
      },
      closed: {
        label: "Cerrado",
        variant: "outline" as const,
        className: "border-muted-foreground text-muted-foreground",
      },
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asunto</TableHead>
              <TableHead>De</TableHead>
              <TableHead>Respondido por</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Etiquetas</TableHead>
              <TableHead className="text-right">Tiempo</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  No se encontraron correos con los filtros seleccionados
                </TableCell>
              </TableRow>
            ) : (
              emails.map((email) => (
                <TableRow key={email.id} className="group">
                  <TableCell className="font-medium max-w-xs truncate">
                    {email.subject}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {email.from}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={email.answeredBy.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {email.answeredBy.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {email.answeredBy.name}
                        </span>
                        {email.forwardedTo && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <ArrowRight className="h-3 w-3" />
                                  <span>{email.forwardedTo.name}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">
                                  {email.forwardedReason}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(email.answeredAt, "dd MMM yyyy 'a las' HH:mm", {
                      locale: es,
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(email.status)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {email.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className="text-xs gap-1"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${tag.color}`}
                          />
                          {tag.name}
                        </Badge>
                      ))}
                      {email.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{email.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {email.responseTime}m
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setSelectedEmail(email)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedEmail}
        onOpenChange={() => setSelectedEmail(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEmail?.subject}</DialogTitle>
            <DialogDescription>
              Detalles completos del correo electrónico
            </DialogDescription>
          </DialogHeader>
          {selectedEmail && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-muted-foreground">De:</span>
                  <p className="mt-1">{selectedEmail.from}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Para:
                  </span>
                  <p className="mt-1">{selectedEmail.to}</p>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Respondido por:
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={
                          selectedEmail.answeredBy.avatar || "/placeholder.svg"
                        }
                      />
                      <AvatarFallback>
                        {selectedEmail.answeredBy.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedEmail.answeredBy.name}</span>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">
                    Fecha:
                  </span>
                  <p className="mt-1">
                    {format(
                      selectedEmail.answeredAt,
                      "dd 'de' MMMM 'de' yyyy 'a las' HH:mm",
                      { locale: es }
                    )}
                  </p>
                </div>
              </div>

              {selectedEmail.forwardedTo && (
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start gap-3">
                    <ArrowRight className="h-5 w-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">
                        Correo derivado
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={
                              selectedEmail.forwardedTo.avatar ||
                              "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {selectedEmail.forwardedTo.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {selectedEmail.forwardedTo.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {selectedEmail.forwardedAt &&
                            format(
                              selectedEmail.forwardedAt,
                              "dd MMM 'a las' HH:mm",
                              { locale: es }
                            )}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedEmail.forwardedReason}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <span className="font-medium text-muted-foreground text-sm">
                  Etiquetas:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEmail.tags.map((tag) => (
                    <Badge key={tag.id} variant="outline" className="gap-1">
                      <span className={`w-2 h-2 rounded-full ${tag.color}`} />
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-medium text-muted-foreground text-sm">
                  Contenido:
                </span>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg text-sm">
                  {selectedEmail.content}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedEmail.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Tiempo de respuesta: {selectedEmail.responseTime} minutos
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailTable;
