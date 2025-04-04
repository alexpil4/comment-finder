'use client';
import { useMemo } from 'react';

import { getAvatarRandomID } from '@/utils/randomAvatarIDGenerator';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import CommentPreview from '@/components/customUI/commentPreview';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { ChevronRight } from 'lucide-react';
import { UserRoundIcon } from 'lucide-react';

import { Comment } from '@/Types/Comment';

export default function ResultItemCard({
  comment: { email, name, body, id },
  query,
}: {
  comment: Comment;
  query: string;
}) {
  // Cache the value of a function that return id numbers to get avatar from mighty.tools
  // so that it doesn't have to be recalculated every time the component rerender
  const randomID = useMemo(() => getAvatarRandomID(), []);

  return (
    <Card
      className="flex items-center w-full"
      role="article"
      aria-label={`Result card ${id}`}
    >
      <div>
        <CardHeader className="p-3 pb-2">
          <CardDescription className="text-sm flex items-center gap-2">
            <Avatar className="w-[30px] h-[30px] text-sm">
              <AvatarImage
                src={`https://mighty.tools/mockmind-api/content/human/${randomID}.jpg`}
                alt={`${email}-avatar-image`}
                loading="lazy"
              />
              <AvatarFallback className="bg-gray-300 text-white">
                <UserRoundIcon />
              </AvatarFallback>
            </Avatar>
            <div className="text-md text-teal-600 first-letter:uppercase">
              {name}
            </div>
            <Button className="p-0" variant="link">
              {email}
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0 text-sm">
          <CommentPreview body={body} query={query} />
        </CardContent>
      </div>
      <div className="ml-auto pr-3">
        <Button
          aria-label="Open post"
          className="text-emerald-900 border-none hover:bg-teal-50"
          variant="outline"
          size="icon"
        >
          <ChevronRight />
        </Button>
      </div>
    </Card>
  );
}
