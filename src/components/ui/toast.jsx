import React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export const Toast = ({ toast, onDismiss }) => {
  const { id, title, description, variant } = toast

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 max-w-md rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out",
        variant === "default" && "bg-background border",
        variant === "destructive" && "bg-destructive text-destructive-foreground",
        variant === "success" && "bg-green-500 text-white"
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          {title && <h4 className="font-medium text-sm">{title}</h4>}
          {description && <p className="text-xs mt-1 opacity-90">{description}</p>}
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="ml-4 p-1 rounded-full hover:bg-primary/10"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
  )
}

export const ToastContainer = ({ toasts, dismissToast }) => {
  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  )
} 