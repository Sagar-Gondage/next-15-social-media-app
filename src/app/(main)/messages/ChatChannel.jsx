import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
    Channel,
    ChannelHeader,
    MessageInput,
    MessageList,
    Window,
} from "stream-chat-react";

export default function ChatChannel({ open, openSidebar }) {
    return (
        <div className={cn("w-full md:block", !open && "hidden")}>
            <Channel>
                <Window>
                    <CustomChannelHeader openSidebar={openSidebar} />
                    <MessageList />
                    <MessageInput />
                </Window>
            </Channel>
        </div>
    );
}

function CustomChannelHeader({ openSidebar, ...props }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-full p-2 md:hidden">
                <Button size="icon" variant="ghost" onClick={openSidebar}>
                    <Menu className="size-5" />
                </Button>
            </div>
            <ChannelHeader {...props} />
        </div>
    );
}
