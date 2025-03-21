'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { commentNormalize } from '@/utils/commentNormalizer';
import { Comment } from '@/types/Comment';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { ChevronRight } from 'lucide-react';
import { UserRoundIcon } from 'lucide-react';

export default function ResultItemCard({
  comment: { postId, email, name, body },
  query,
}: {
  comment: Comment;
  query: string;
}) {
  return (
    <Card className="flex items-center">
      <div>
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-md text-teal-600 first-letter:uppercase">{name}</CardTitle>
          <CardDescription className="text-xs flex items-center gap-2 ">
            <Avatar className="w-[30px] h-[30px] text-xs">
              <AvatarImage
                src={`https://mighty.tools/mockmind-api/content/human/${postId}.jpg`}
                alt={`${email}-avatar-image`}
                loading="lazy"
              />
              <AvatarFallback className="bg-gray-300 text-white">
                <UserRoundIcon />
              </AvatarFallback>
            </Avatar>
            {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-2 text-sm">
          <p>{commentNormalize(body, query)}</p>
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
