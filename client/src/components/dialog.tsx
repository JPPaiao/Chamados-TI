import { Button, Dialog, DialogFooter, DialogHeader } from "@material-tailwind/react"

interface DialogProps {
  onClickButton: () => void, 
  handleOpen: (size: string | undefined) => void, 
  size: string | undefined, 
  menssage?: string | null
}

function DialogModal({ onClickButton, size, handleOpen, menssage }: DialogProps) {
  return (
    <Dialog
      placeholder
      open={
        !!size ||
        size === "xs" ||
        size === "sm" ||
        size === "md"
      }
      size={size || "sm"}
      handler={handleOpen}
      >
      <DialogHeader placeholder>
        {
          menssage
        }
      </DialogHeader>
      <DialogFooter placeholder>
        <form  >
          <Button
            placeholder
            variant="text"
            color="red"
            onClick={() => handleOpen(undefined)}
            className="mr-1"
            >
            <span>Cancelar</span>
          </Button>
          <Button
            placeholder
            variant="gradient"
            color="green"
            onClick={() => {
                handleOpen(undefined)
                onClickButton()
              }
            }
            >
            <span>Confirmar</span>
          </Button>
        </form>
      </DialogFooter>
    </Dialog>
  )
}

export { DialogModal }