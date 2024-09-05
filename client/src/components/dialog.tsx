import { Button, Dialog, DialogFooter, DialogHeader } from "@material-tailwind/react"

function DialogModal({ onClickButton, size, handleOpen }) {
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
      <DialogHeader placeholder>Tem certeza que deseja excluir esse usuário</DialogHeader>
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