import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Emoji } from "react-apple-emojis";

export const AnimatedAvatar = () => {
  return (
    <div className="cursor-pointer relative w-16 h-16 rounded-full p-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 animated-gradient">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        <Avatar>
            <AvatarFallback>
                <Emoji name={"clown-face"}/>
            </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
