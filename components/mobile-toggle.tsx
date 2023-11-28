import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { NavigationSidebar } from "./navigation/navigation-sidebar"
import ServerSidebar from "./server/server-sidebar"

const MobileToggle = ({serverId} : {serverId : string}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden cursor-pointer">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ServerSidebar ServerId={serverId}/>
      </SheetContent>
    </Sheet>
  )
}

export default MobileToggle