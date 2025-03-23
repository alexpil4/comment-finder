'use client';

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Skeleton } from '../ui/skeleton';

export default function LoaderItemCard() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="min-w-[630px] p-2">
          <CardHeader className="p-3 pb-2">
            <CardDescription className=" flex items-center gap-2">
              <Avatar className="w-[30px] h-[30px]">
                <AvatarFallback className="bg-gray-300 text-white">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <Skeleton className="h-4 w-[250px]" />
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-2 ">
            <Skeleton className="h-4 w-full sm:w-[460px]" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
