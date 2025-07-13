import { Settings,LogOut,Wallet,HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function SideBarFooter() {
    const options=[{
        name: "Settings",
        icon: Settings
    },{
        name: "Help Center",
        icon: HelpCircle
    },
    {
        name: "My Subscription",
        icon: Wallet
    },{
        name: "Sign Out",
        icon: LogOut
    }]
  return (
    <div>
        {options.map((option, index) => (
          <Button variant="ghost" key={index} className="w-full justify-start text-left mt-2">
            <option.icon className="h-5 w-5" />
            <span>{option.name}</span>
          </Button>
        ))}
    </div>
  );
}