import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditarServicio({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-sm bg-black/50">
          <DialogHeader>
            <DialogTitle className="text-white">Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1" className="text-white">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" className="text-white"/>
            </Field>
            <Field>
              <Label htmlFor="username-1" className="text-white">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" className="text-white"/>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
