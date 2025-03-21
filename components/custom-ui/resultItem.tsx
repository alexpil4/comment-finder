'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { commentNormalize } from '@/utils/commentNormalizer';
import { Comment } from '@/types/Comment';

import { UserRoundIcon } from 'lucide-react';

export default function ResultItem({
  comment: { postId, email, name, body },
  query,
}: {
  comment: Comment;
  query: string;
}) {
  return (
    <Card>
      <CardHeader className="p-3">
        <CardDescription className="text-sm flex items-center gap-3">
          <Avatar className="w-[30px] h-[30px] text-xs">
            <AvatarImage
              src={`https://mighty.tools/mockmind-api/content/human/${postId}.jpg`}
              alt={`${email}-avatar-image`}
            />
            <AvatarFallback className="bg-cyan-300 text-white">
              <UserRoundIcon />
            </AvatarFallback>
          </Avatar>
          {email}
        </CardDescription>
        <CardTitle className="text-md">{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-sm">
        <p>{commentNormalize(body, query)}</p>
      </CardContent>
    </Card>
  );
}
