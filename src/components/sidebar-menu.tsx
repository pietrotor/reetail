import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  NotepadTextDashed,
  ReceiptCent,
  ShoppingBagIcon,
  Timer,
} from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import ContractClipIcon from "@/assets/icons/contract-clip-icon";
import GridIcon from "@/assets/icons/grid-icon";
import IntegrationIcon from "@/assets/icons/integration-icon";
import InvoiceIcon from "@/assets/icons/invoice-icon";
import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/store/use-current-user";

type sidebarOption = "Dashboard" | "Pedidos" | "Productos" | "Integrations";

const AppSidebarMenu = () => {
  const { isClient } = useCurrentUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const items: {
    title: sidebarOption;
    url?: string;
    icon: React.ElementType;
    options?: {
      title: string;
      url: string;
      icon: React.ElementType;
    }[];
  }[] = useMemo(
    () => [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: GridIcon,
      },
      {
        title: "Pedidos",
        url: "/pedidos",
        icon: ContractClipIcon,
      },
      {
        title: "Productos",
        url: "/productos",
        icon: ShoppingBagIcon,
      },
    ],
    []
  );

  return (
    <div className="flex flex-col w-full gap-4 hide-scroll-bar overflow-y-auto">
      {items.map((item, i) => (
        <div key={item.title} onClick={() => {}}>
          {item.options ? (
            <Collapsible className="group/collapsible">
              <CollapsibleTrigger asChild>
                <div
                  className={`flex p-2.5 rounded-lg cursor-pointer gap-2 ${
                    i === 0 ? "bg-white" : "opacity-50"
                  }`}
                >
                  <item.icon className="sidebar-icon" />
                  <span>{item.title}</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-2 ps-6 py-2">
                {item.options.map((option) => (
                  <div
                    key={option.title}
                    className={cn("flex gap-2 opacity-50")}
                  >
                    <option.icon className="sidebar-icon" />
                    {option.title}
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <div
              className={`flex p-2.5 rounded-lg cursor-pointer gap-2 ${
                item.url?.startsWith(currentPath) ? "bg-white" : "opacity-50"
              }`}
              onClick={() => (item.url ? navigate(item.url) : null)}
            >
              <item.icon className="sidebar-icon" />
              <span>{item.title}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppSidebarMenu;
