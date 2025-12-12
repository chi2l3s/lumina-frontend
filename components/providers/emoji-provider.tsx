"use client";

import { PropsWithChildren } from "react";
import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";

export const EmojiProviders = ({ children }: PropsWithChildren) => {
  return <EmojiProvider data={emojiData}>{children}</EmojiProvider>;
};
