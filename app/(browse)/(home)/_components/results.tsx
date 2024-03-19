import { getStreams } from "@/lib/feed-service";
import { Skeleton } from "@/components/ui/skeleton";

import {ScreenShareOff} from "lucide-react"
import { ResultCard, ResultCardSkeleton } from "./result-card";

export const Results = async () => {
  const data = await getStreams();

  return (
    <div>
     
      {data.some(stream => stream.isLive) && (
         <h2 className="text-lg font-semibold mb-4">
         Streams we think you&apos;ll like
       </h2>
      )}
      {data.every(stream => !stream.isLive) && (
     <div className="flex items-center justify-center h-96 mt-20">
     <div className="flex flex-col items-center text-muted-foreground text-xl">
       <ScreenShareOff className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"/> No streams available now.
     </div>
   </div>
   
    
    
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result) => (
          <ResultCard
            key={result.id}
            data={result}
          />
        ))}
      </div>
    </div>
  )
}

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
