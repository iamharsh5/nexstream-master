import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

import { RadioTower, Info } from "lucide-react";
import { ToggleCard } from "./_components/toggle-card";

const LivePage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);
  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <RadioTower className="text-red-600" />
        <h1 className="text-2xl font-bold">Live Status</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isLive"
          label="Go Live"
          value={stream.isLive}
          disabled={!stream.ingressId}
        />
      </div>

      <div className="max-w-xxl p-6 mt-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-transparent dark:border-gray-700">
        <div className="flex items-center gap-2 ">
          <Info />
          <h5 className="mb-2 mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Must be read!
          </h5>
        </div>
        <ul className="list-disc ml-5 mb-3">
          <li className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            Before going live, you must generate your <b>stream key</b>.
          </li>
          <li className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            If you don't generate your stream key, you won't be able to start
            your live stream.
          </li>
          <li className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            For streaming platform, select either <b>RTMP</b> or <b>WHIP</b> based on your
            specific needs and platform compatibility.
          </li>
          <li className="mb-3 font-normal text-gray-500 dark:text-gray-400">
            You can generate a stream key for RTMP applications like <b>OBS</b> by
            using a combination of random characters or a unique identifier.
            This key is used to authenticate your stream with the streaming
            platform.
          </li>
          <li className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          To start streaming on any platform, set up your stream settings in your streaming software, such as OBS, and then click <b>"Go Live"</b> to begin broadcasting.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LivePage;
